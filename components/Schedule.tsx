
import React from 'react';
import { motion } from 'framer-motion';
import { SCHEDULE } from '../constants';

const Schedule: React.FC = () => {
    return (
        <section id="schedule" className="py-20 md:py-32">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-bold text-ted-red uppercase tracking-widest">Event Day</h2>
                    <h3 className="font-heading mt-2 text-4xl md:text-5xl font-extrabold tracking-tighter">
                       The Schedule
                    </h3>
                    <div className="mt-4 w-16 h-1 bg-ted-red mx-auto"></div>
                    <p className="mt-6 max-w-3xl mx-auto text-gray-400">
                        A day packed with inspiring talks, meaningful connections, and transformative ideas.
                    </p>
                </motion.div>

                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="relative">
                        <motion.div 
                            className="absolute left-1/2 -ml-[2px] h-full w-1 bg-gray-800"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            style={{transformOrigin: 'top'}}
                        />
                        {SCHEDULE.map((item, index) => (
                            <div key={index} className="relative mb-8 flex justify-between items-center w-full">
                                <motion.div 
                                    className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'order-2 text-left'}`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6 }}
                                >
                                </motion.div>
                                <motion.div 
                                    className="z-10 bg-ted-red w-4 h-4 rounded-full border-4 border-black"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                     <div className="w-full h-full bg-ted-red rounded-full animate-ping"></div>
                                </motion.div>
                                <motion.div 
                                    className={`w-5/12 ${index % 2 === 0 ? 'text-left' : 'order-1 text-right'}`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="bg-dark-charcoal p-6 rounded-lg border border-gray-800">
                                        <p className="text-ted-red font-bold">{item.time}</p>
                                        <div className="flex items-center mt-2" style={{justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'}}>
                                            <item.icon className={`w-5 h-5 text-gray-400 ${index % 2 === 0 ? 'mr-2' : 'ml-2 order-2'}`} />
                                            <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
