
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const activeSection = location.pathname === '/' ? 'home' : location.pathname.substring(1);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Speakers', path: '/speakers' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'Team', path: '/team' }
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-black/50 backdrop-blur-lg border-b border-gray-800' : 'py-6'
                }`}
        >
            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-ted-red origin-left"
                style={{
                    scaleX: scrolled ? undefined : 0,
                    width: '100%'
                }}
                initial={{ scaleX: 0 }}
                animate={{
                    scaleX: typeof window !== 'undefined' ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) : 0
                }}
                transition={{ type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }}
            />
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="font-heading font-extrabold text-2xl tracking-tighter">
                    TEDx<span className="text-ted-red">SRKR</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === (link.path === '/' ? 'home' : link.path.substring(1));
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-semibold transition-all duration-300 relative ${isActive ? 'text-ted-red' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ted-red"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
                <Link to="/register" className="hidden md:block bg-ted-red text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                    Register Now
                </Link>
                <button className="md:hidden text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
