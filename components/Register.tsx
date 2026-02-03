import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    college: string;
    year: string;
    department: string;
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
        department: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Validation rules
    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.length < 2) return 'Name must be at least 2 characters';
                if (!/^[a-zA-Z\s.]+$/.test(value)) return 'Name can only contain letters';
                return undefined;

            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
                return undefined;

            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value.replace(/\s/g, ''))) {
                    return 'Please enter a valid phone number';
                }
                return undefined;

            case 'college':
                if (!value.trim()) return 'College/Institution is required';
                return undefined;

            case 'year':
                if (!value || value === 'Select Year') return 'Please select your year';
                return undefined;

            case 'department':
                if (!value.trim()) return 'Department is required';
                return undefined;

            default:
                return undefined;
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));

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

        // Mark all fields as touched
        const allTouched: Record<string, boolean> = {};
        Object.keys(formData).forEach(key => { allTouched[key] = true; });
        setTouched(allTouched);

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);
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
                        <p className="text-gray-400 text-lg mb-8">
                            Thank you for registering for TEDxSRKR 2026.
                            We've sent a confirmation email to <strong className="text-white">{formData.email}</strong>
                        </p>

                        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 mb-8">
                            <h3 className="text-lg font-semibold text-white mb-3">What's Next?</h3>
                            <ul className="text-gray-400 text-sm text-left space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#E62B1E]">•</span>
                                    Check your email for confirmation and ticket details
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
                                    />
                                    <AnimatePresence>
                                        {errors.name && touched.name && (
                                            <motion.p
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
                                    />
                                    <AnimatePresence>
                                        {errors.email && touched.email && (
                                            <motion.p
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
                                        Phone Number <span className="text-[#E62B1E]">*</span>
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

                                {/* College Field */}
                                <div>
                                    <label htmlFor="college" className="block text-sm font-medium text-gray-400 mb-2">
                                        College / Institution <span className="text-[#E62B1E]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="college"
                                        value={formData.college}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClasses('college')}
                                    />
                                    <AnimatePresence>
                                        {errors.college && touched.college && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.college}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Year Field */}
                                <div>
                                    <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-2">
                                        Year <span className="text-[#E62B1E]">*</span>
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
                                        <option value="Alumni">Alumni</option>
                                    </select>
                                    <AnimatePresence>
                                        {errors.year && touched.year && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.year}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Department Field */}
                                <div>
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-2">
                                        Department <span className="text-[#E62B1E]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="department"
                                        placeholder="Computer Science"
                                        value={formData.department}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={inputClasses('department')}
                                    />
                                    <AnimatePresence>
                                        {errors.department && touched.department && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.department}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
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
