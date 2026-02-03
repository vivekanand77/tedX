import React from 'react';
import { motion } from 'framer-motion';
import Team from '../components/Team';

const TeamPage: React.FC = () => {
    return (
        <div className="bg-[#0A0A0A] min-h-screen pt-24">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Team />
            </motion.div>
        </div>
    );
};

export default TeamPage;
