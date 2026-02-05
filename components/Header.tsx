import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Speakers', path: '/speakers' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'Team', path: '/team' },
        { name: 'About', path: '/about' }
    ];

    return (
        <>
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
                    {/* TEDx Logo - Official TEDxSRKR Typography */}
                    <Link
                        to="/"
                        className="z-10 group flex flex-col"
                        aria-label="TEDxSRKR - Home"
                    >
                        <div className="flex items-baseline leading-none">
                            <span className="text-[#E62B1E] font-black text-2xl md:text-[28px] tracking-tight" style={{ letterSpacing: '-1.5px' }}>
                                TED
                            </span>
                            <span className="text-[#E62B1E] font-bold text-sm md:text-base" style={{ position: 'relative', top: '-6px', marginLeft: '1px' }}>
                                x
                            </span>
                            <span className="text-white font-black text-2xl md:text-[28px] tracking-tight" style={{ letterSpacing: '-1px', marginLeft: '2px' }}>
                                SRKR
                            </span>
                        </div>
                        <span className="text-[11px] md:text-[12.5px] text-white/60 italic tracking-tight mt-0.5" style={{ letterSpacing: '0.3px' }}>
                            <span className="text-[#E62B1E] not-italic font-bold">x</span>= independently organized TED event
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
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

                    {/* Desktop CTA Button */}
                    <motion.div
                        className="hidden md:block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center gap-2 h-10 px-6 bg-[#E62B1E] text-white font-bold text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,43,30,0.5)] hover:bg-[#cc2020]"
                        >
                            Get Tickets
                        </Link>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white p-2 hover:text-[#E62B1E] transition-colors z-10"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.nav
                            className="absolute top-0 right-0 h-full w-[280px] bg-[#0A0A0A] border-l border-white/10 pt-20 px-6"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="flex flex-col space-y-2">
                                {navLinks.map((link, index) => {
                                    const isActive = activeSection === (link.path === '/' ? 'home' : link.path.substring(1));
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${isActive
                                                    ? 'text-[#E62B1E] bg-[#E62B1E]/10'
                                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Mobile CTA */}
                            <motion.div
                                className="mt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link
                                    to="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full text-center py-4 bg-[#E62B1E] text-white font-bold rounded-xl transition-all hover:bg-[#cc2020]"
                                >
                                    Get Tickets
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
