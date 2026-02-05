import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, AlertTriangle } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    college: string;
    year: string;
    department: string;
    ticketType: 'standard' | 'vip' | 'student';
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    college?: string;
    year?: string;
    department?: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        college: 'SRKR Engineering College',
        year: '',
        department: '',
        ticketType: 'standard'
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [registrationId, setRegistrationId] = useState<string | null>(null);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Validation rules (synced with backend validators.ts)
    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.length < 2) return 'Name must be at least 2 characters';
                if (value.length > 100) return 'Name cannot exceed 100 characters';
                if (!/^[a-zA-Z\s.'"-]+$/.test(value)) return 'Name contains invalid characters';
                return undefined;

            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
                if (value.length > 254) return 'Email address too long';
                return undefined;

            case 'phone':
                // Phone is optional in backend, but we keep frontend validation
                if (value && !/^[+]?[\d\s()-]*$/.test(value)) {
                    return 'Please enter a valid phone number';
                }
                if (value && value.length > 20) return 'Phone number too long';
                return undefined;

            case 'college':
                if (value && value.length > 200) return 'College name too long';
                return undefined;

            case 'year':
                // Optional field
                return undefined;

            case 'department':
                if (value && value.length > 100) return 'Department name too long';
                return undefined;

            default:
                return undefined;
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        // Only name and email are strictly required
        const requiredFields: (keyof FormData)[] = ['name', 'email'];

        requiredFields.forEach((key) => {
            const error = validateField(key, formData[key] as string);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
                isValid = false;
            }
        });

        // Validate optional fields if they have values
        const optionalFields: (keyof FormData)[] = ['phone', 'college', 'year', 'department'];
        optionalFields.forEach((key) => {
            if (formData[key]) {
                const error = validateField(key, formData[key] as string);
                if (error) {
                    newErrors[key as keyof FormErrors] = error;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setSubmitError(null); // Clear submit error on change

        // Clear error on change if field was touched
        if (touched[id]) {
            const error = validateField(id, value);
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setTouched(prev => ({ ...prev, [id]: true }));
        const error = validateField(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark required fields as touched
        const allTouched: Record<string, boolean> = {};
        Object.keys(formData).forEach(key => { allTouched[key] = true; });
        setTouched(allTouched);

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    phone: formData.phone?.trim() || undefined,
                    college: formData.college?.trim() || undefined,
                    year: formData.year || undefined,
                    department: formData.department?.trim() || undefined,
                    ticketType: formData.ticketType,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                // Handle specific error codes
                if (response.status === 429) {
                    throw new Error('Too many requests. Please wait a moment and try again.');
                }
                if (response.status === 409) {
                    throw new Error('This email is already registered for the event.');
                }
                throw new Error(result.error || 'Registration failed. Please try again.');
            }

            // Success!
            setRegistrationId(result.registrationId);
            setIsSuccess(true);

        } catch (err) {
            console.error('Registration error:', err);
            setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = (fieldName: keyof FormErrors) => `
        w-full bg-[#1a1a1a] border rounded-xl px-4 py-3.5 text-white 
        placeholder:text-gray-500 transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[#E62B1E] focus:border-transparent
        ${errors[fieldName] && touched[fieldName]
            ? 'border-red-500 bg-red-500/5'
            : 'border-gray-700 hover:border-gray-600'
        }
    `;

    // Success State
    if (isSuccess) {
        return (
            <section id="register" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#E62B1E]/10 rounded-full blur-[150px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="max-w-xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 
                                       flex items-center justify-center border border-green-500/30"
                        >
                            <CheckCircle2 size={48} className="text-green-500" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            You're In!
                        </h2>
                        <p className="text-gray-400 text-lg mb-4">
                            Thank you for registering for TEDxSRKR 2026.
                        </p>
                        {registrationId && (
                            <p className="text-gray-500 text-sm mb-8">
                                Registration ID: <code className="text-[#E62B1E]">{registrationId}</code>
                            </p>
                        )}

                        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 mb-8">
                            <h3 className="text-lg font-semibold text-white mb-3">What's Next?</h3>
                            <ul className="text-gray-400 text-sm text-left space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#E62B1E]">•</span>
                                    Save your registration ID for check-in
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#E62B1E]">•</span>
                                    Add the event to your calendar (March 15, 2026)
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#E62B1E]">•</span>
                                    Follow us on social media for updates
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-8 py-4 bg-[#E62B1E] text-white font-bold rounded-full 
                                       hover:bg-[#ff4436] transition-all shadow-[0_8px_30px_rgba(230,43,30,0.4)]"
                        >
                            Back to Home
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="register" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E62B1E]/8 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E62B1E]/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-2 mb-6 text-xs font-bold uppercase tracking-[0.2em]
                                     text-[#E62B1E] bg-[#E62B1E]/10 rounded-full border border-[#E62B1E]/20">
                        Join Us
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
                        Secure Your <span className="text-[#E62B1E]">Spot</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-400 text-lg">
                        Be part of TEDxSRKR 2026. Limited seats available for an unforgettable experience.
                    </p>
                </motion.div>

                <motion.div
                    className="mt-12 max-w-2xl mx-auto rounded-3xl overflow-hidden"
                    style={{
                        background: 'rgba(18, 18, 18, 0.6)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="p-8 md:p-12">
                        {/* Submit Error Banner */}
                        <AnimatePresence>
                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                                >
                                    <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-left">
                                        <p className="text-red-400 text-sm font-medium">Registration Failed</p>
                                        <p className="text-red-300/80 text-sm mt-1">{submitError}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                        Full Name <span className="text-[#E62B1E]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClasses('name')}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                        aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                                    />
                                    <AnimatePresence>
                                        {errors.name && touched.name && (
                                            <motion.p
                                                id="name-error"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                        Email Address <span className="text-[#E62B1E]">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClasses('email')}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                                    />
                                    <AnimatePresence>
                                        {errors.email && touched.email && (
                                            <motion.p
                                                id="email-error"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClasses('phone')}
                                    />
                                    <AnimatePresence>
                                        {errors.phone && touched.phone && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.phone}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* College Field - Fixed */}
                                <div>
                                    <label htmlFor="college" className="block text-sm font-medium text-gray-400 mb-2">
                                        College / Institution
                                    </label>
                                    <input
                                        type="text"
                                        id="college"
                                        value="SRKR Engineering College"
                                        readOnly
                                        disabled
                                        className="w-full bg-[#1a1a1a]/50 border border-gray-700 rounded-xl px-4 py-3.5 text-gray-400 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Year Field */}
                                <div>
                                    <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-2">
                                        Year
                                    </label>
                                    <select
                                        id="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`${inputClasses('year')} appearance-none cursor-pointer`}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                        <option value="Faculty">Faculty</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Department/Branch Field */}
                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-2">
                                        Branch
                                    </label>
                                    <select
                                        id="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`${inputClasses('department')} appearance-none cursor-pointer`}
                                    >
                                        <option value="">Select Branch</option>
                                        <option value="CSE">CSE - Computer Science & Engineering</option>
                                        <option value="AIDS">AIDS - AI & Data Science</option>
                                        <option value="AIML">AIML - AI & Machine Learning</option>
                                        <option value="CSIT">CSIT - CS & Information Technology</option>
                                        <option value="CSBS">CSBS - CS & Business Systems</option>
                                        <option value="CSD">CSD - CS & Design</option>
                                        <option value="IT">IT - Information Technology</option>
                                        <option value="CIC">CIC - Computer Science (Cyber Security)</option>
                                        <option value="MECH">MECH - Mechanical Engineering</option>
                                        <option value="CIVIL">CIVIL - Civil Engineering</option>
                                        <option value="EEE">EEE - Electrical & Electronics</option>
                                        <option value="ECE">ECE - Electronics & Communication</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Ticket Type Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-3">
                                    Ticket Type
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'student', label: 'Student', price: '₹199' },
                                        { value: 'standard', label: 'Standard', price: '₹499' },
                                        { value: 'vip', label: 'VIP', price: '₹999' },
                                    ].map((ticket) => (
                                        <button
                                            key={ticket.value}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, ticketType: ticket.value as FormData['ticketType'] }))}
                                            className={`p-4 rounded-xl border transition-all duration-200 text-center ${formData.ticketType === ticket.value
                                                ? 'bg-[#E62B1E]/10 border-[#E62B1E] text-white'
                                                : 'bg-[#1a1a1a] border-gray-700 text-gray-400 hover:border-gray-500'
                                                }`}
                                        >
                                            <div className="text-sm font-medium">{ticket.label}</div>
                                            <div className={`text-lg font-bold mt-1 ${formData.ticketType === ticket.value ? 'text-[#E62B1E]' : 'text-white'
                                                }`}>{ticket.price}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                className={`w-full font-bold py-4 px-6 rounded-xl text-lg mt-8
                                           transition-all duration-300 flex items-center justify-center gap-3
                                           ${isSubmitting
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-[#E62B1E] text-white hover:bg-[#ff4436] shadow-[0_8px_30px_rgba(230,43,30,0.4)]'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Register for TEDxSRKR 2026'
                                )}
                            </motion.button>

                            <p className="text-center text-xs text-gray-500 pt-2">
                                By registering, you agree to our{' '}
                                <a href="#" className="text-[#E62B1E] hover:underline">terms and conditions</a>.
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Register;
