import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();
    const activeSection = location.pathname === '/' ? 'home' : location.pathname.substring(1);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
            const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Speakers', path: '/speakers' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'Team', path: '/team' },
        { name: 'About', path: '/about' }
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'py-3 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10'
                    : 'py-4 md:py-5 bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#E62B1E] to-[#ff4d4d] origin-left"
                style={{
                    scaleX: scrollProgress,
                    width: '100%'
                }}
            />

            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                {/* TEDx Logo */}
                <Link
                    to="/"
                    className="font-sans font-black text-xl md:text-2xl tracking-tight text-white"
                >
                    TED<span className="text-[#E62B1E]">x</span>
                    <span className="text-white/80 font-light">SRKR</span>
                </Link>

                {/* Navigation - Fixed: Better padding for underline */}
                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === (link.path === '/' ? 'home' : link.path.substring(1));
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-semibold tracking-wide transition-all duration-300 relative pb-2 ${isActive ? 'text-[#E62B1E]' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E62B1E]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA Button - Fixed: Consistent with hero buttons */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Link
                        to="/register"
                        className="hidden md:inline-flex items-center justify-center gap-2 h-10 px-6 bg-[#E62B1E] text-white font-bold text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,43,30,0.5)] hover:bg-[#cc2020]"
                    >
                        Get Tickets
                    </Link>
                </motion.div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white p-2 hover:text-[#E62B1E] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
