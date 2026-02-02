import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const Countdown: React.FC = () => {
    // Set your event date here (YYYY-MM-DD)
    const eventDate = new Date('2026-03-15T09:00:00').getTime();
    const [hasAnimated, setHasAnimated] = useState(false);

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date().getTime();
        const difference = eventDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeUnit: React.FC<{ value: number; label: string; index: number }> = React.memo(({ value, label, index }) => {
        const percentage = label === 'Days' ? (value / 365) * 100 : (value / (label === 'Hours' ? 24 : 60)) * 100;
        const circumference = 2 * Math.PI * 70;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                    {/* Background circle */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="70"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="8"
                            fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r="70"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{
                                filter: 'drop-shadow(0 0 10px rgba(235, 0, 40, 0.5))',
                                transition: 'stroke-dashoffset 0.5s ease-out'
                            }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#eb0028" />
                                <stop offset="100%" stopColor="#ff4d6d" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Number display */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span
                            className="text-4xl md:text-5xl font-bold text-white font-heading"
                            style={{
                                textShadow: '0 0 20px rgba(235, 0, 40, 0.5)'
                            }}
                        >
                            {String(value).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* Label */}
                <p className="mt-4 text-sm md:text-base font-semibold text-gray-400 uppercase tracking-wider">
                    {label}
                </p>
            </div>
        );
    });

    return (
        <section className="py-20 bg-black relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-ted-red/5 via-transparent to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 uppercase tracking-tight">
                        Count<span className="text-ted-red">down</span>
                    </h2>
                    <div className="w-24 h-1 bg-ted-red mx-auto"></div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <TimeUnit value={timeLeft.days} label="Days" index={0} />
                    <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
                </motion.div>
            </div>
        </section>
    );
};

export default Countdown;
