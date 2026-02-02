import React from 'react';
import { motion } from 'framer-motion';
import Schedule from '../components/Schedule';

const SchedulePage: React.FC = () => {
    return (
        <div className="bg-black min-h-screen pt-24">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Schedule />
            </motion.div>
        </div>
    );
};

export default SchedulePage;
