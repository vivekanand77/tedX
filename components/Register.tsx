
import React from 'react';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
    return (
        <section id="register" className="py-20 md:py-32 bg-dark-charcoal">
            <div className="container mx-auto px-6 text-center">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-bold text-ted-red uppercase tracking-widest">Join Us</h2>
                    <h3 className="font-heading mt-2 text-4xl md:text-5xl font-extrabold tracking-tighter">
                       Secure Your Spot
                    </h3>
                    <div className="mt-4 w-16 h-1 bg-ted-red mx-auto"></div>
                    <p className="mt-6 max-w-3xl mx-auto text-gray-400">
                        Secure your spot at TEDxSRKR 2025. Limited seats available.
                    </p>
                </motion.div>

                <motion.div 
                    className="mt-16 max-w-2xl mx-auto bg-[#1a1a1a] p-8 md:p-12 rounded-2xl border border-gray-800"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <form className="space-y-6 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                <input type="text" id="name" placeholder="John Doe" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ted-red" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input type="email" id="email" placeholder="john@example.com" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ted-red" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                                <input type="tel" id="phone" placeholder="+91 98765 43210" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ted-red" />
                            </div>
                            <div>
                                <label htmlFor="college" className="block text-sm font-medium text-gray-400 mb-2">College / Institution</label>
                                <input type="text" id="college" defaultValue="SRKR Engineering College" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ted-red" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-2">Year</label>
                                <select id="year" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ted-red appearance-none">
                                    <option>Select Year</option>
                                    <option>1st Year</option>
                                    <option>2nd Year</option>
                                    <option>3rd Year</option>
                                    <option>4th Year</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                                <input type="text" id="department" placeholder="Computer Science" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ted-red" />
                            </div>
                        </div>
                         <button type="submit" className="w-full bg-ted-red text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 mt-8 shadow-[0_0_20px_theme(colors.ted-red)]">
                           Register for TEDxSRKR 2025
                        </button>
                        <p className="text-center text-xs text-gray-500 pt-4">By registering, you agree to our terms and conditions.</p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Register;
