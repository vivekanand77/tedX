import React from 'react';
import { motion } from 'framer-motion';
import Register from '../components/Register';

const RegisterPage: React.FC = () => {
    return (
        <div className="bg-[#0A0A0A] min-h-screen pt-24">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Register />
            </motion.div>
        </div>
    );
};

export default RegisterPage;
