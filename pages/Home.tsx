import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';

const Home: React.FC = () => {
    return (
        <div className="bg-black min-h-screen">
            <Hero />

            {/* Countdown Section */}
            <Countdown />

            {/* Quick Links Section */}
            <section className="py-20 bg-dark-charcoal">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                            Explore <span className="text-ted-red">TEDxSRKR</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Discover our speakers, schedule, and team behind this incredible event.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { title: 'Our Speakers', desc: 'Meet the visionaries', link: '/speakers' },
                            { title: 'Event Schedule', desc: 'Plan your day', link: '/schedule' },
                            { title: 'About TEDx', desc: 'Learn our story', link: '/about' }
                        ].map((item, i) => (
                            <Link
                                key={i}
                                to={item.link}
                            >
                                <motion.div
                                    className="bg-[#1a1a1a]/70 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-ted-red/50 transition-all duration-300 group cursor-pointer"
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)'
                                    }}
                                >
                                    <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-ted-red transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
