
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    id: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '' }) => {
    const titleParts = title.split(' ');
    
    return (
        <section id={id} className={`py-20 md:py-32 ${className}`}>
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-bold text-ted-red uppercase tracking-widest">{subtitle}</h2>
                    <h3 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tighter">
                       {titleParts.map((part, index) => 
                           index === titleParts.length - 2 ? <span key={index} className="text-ted-red">{part} </span> : `${part} `
                       )}
                    </h3>
                    <div className="mt-4 w-16 h-1 bg-ted-red mx-auto"></div>
                    <p className="mt-6 max-w-3xl mx-auto text-gray-400">{children}</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Section;
