
import React from 'react';
import { motion } from 'framer-motion';
import { SPEAKERS } from '../constants';
import SpeakerCard from './SpeakerCard';

const Speakers: React.FC = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <section id="speakers" className="py-20 md:py-32 bg-dark-charcoal">
            <div className="container mx-auto px-6 text-center">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-bold text-ted-red uppercase tracking-widest">Meet Our</h2>
                    <h3 className="font-heading mt-2 text-4xl md:text-5xl font-extrabold tracking-tighter">
                       Speakers
                    </h3>
                    <div className="mt-4 w-16 h-1 bg-ted-red mx-auto"></div>
                    <p className="mt-6 max-w-3xl mx-auto text-gray-400">
                        Visionaries, innovators, and thought leaders sharing ideas that will change the way you see the world.
                    </p>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-6xl mx-auto"
                    style={{ perspective: '1000px' }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {SPEAKERS.map((speaker, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <SpeakerCard speaker={speaker} />
                        </motion.div>
                    ))}
                </motion.div>
                <motion.p 
                    className="mt-12 text-gray-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    More speakers to be announced soon...
                </motion.p>
            </div>
        </section>
    );
};

export default Speakers;
