
import React from 'react';
import { motion } from 'framer-motion';
import { TEAM } from '../constants';

const Team: React.FC = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="team" className="py-20 md:py-32">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-bold text-ted-red uppercase tracking-widest">The People Behind</h2>
                    <h3 className="font-heading mt-2 text-4xl md:text-5xl font-extrabold tracking-tighter">
                        Our Team
                    </h3>
                    <div className="mt-4 w-16 h-1 bg-ted-red mx-auto"></div>
                    <p className="mt-6 max-w-3xl mx-auto text-gray-400">
                        Meet the passionate individuals working behind the scenes to make TEDxSRKR a reality.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {TEAM.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-dark-charcoal p-6 rounded-2xl border border-gray-800 transition-all duration-300 hover:border-ted-red/50 hover:shadow-[0_0_20px_rgba(235,0,40,0.1)]"
                            whileHover={{ y: -10, scale: 1.05 }}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700"
                            />
                            <h4 className="font-heading text-xl font-bold text-white">{member.name}</h4>
                            <p className="text-ted-red">{member.role}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Team;
