
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black border-t border-gray-800 py-12">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center space-x-6 mb-8">
                    {[
                        { icon: Instagram, href: '#' },
                        { icon: Twitter, href: '#' },
                        { icon: Linkedin, href: '#' },
                        { icon: Github, href: '#' }
                    ].map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            className="text-gray-500 hover:text-ted-red transition-colors duration-300"
                            whileHover={{ scale: 1.2, y: -2 }}
                        >
                            <social.icon size={20} />
                        </motion.a>
                    ))}
                </div>

                <p className="text-gray-400 font-medium">&copy; {new Date().getFullYear()} <span className="text-white font-bold tracking-tight">TEDx<span className="text-ted-red">SRKR</span></span></p>
                <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
                    This independent TEDx event is operated under license from TED.
                </p>

            </div>
        </footer>
    );
};

export default Footer;
