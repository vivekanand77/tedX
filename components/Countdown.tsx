import React, { useState, useEffect } from 'react';
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
    const [isLoaded, setIsLoaded] = useState(false);

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
        // Prevent flicker - mark as loaded immediately
        setIsLoaded(true);

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeUnit: React.FC<{ value: number; label: string; index: number }> = React.memo(({ value, label, index }) => {
        const percentage = label === 'Days' ? (value / 365) * 100 : (value / (label === 'Hours' ? 24 : 60)) * 100;
        const circumference = 2 * Math.PI * 58;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                        {/* Background track circle - always visible */}
                        <circle
                            cx="70"
                            cy="70"
                            r="58"
                            stroke="rgba(255, 255, 255, 0.08)"
                            strokeWidth="6"
                            fill="none"
                        />
                        {/* Secondary background for better definition */}
                        <circle
                            cx="70"
                            cy="70"
                            r="58"
                            stroke="rgba(230, 43, 30, 0.15)"
                            strokeWidth="6"
                            fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="70"
                            cy="70"
                            r="58"
                            stroke="url(#countdownGradient)"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{
                                filter: 'drop-shadow(0 0 12px rgba(230, 43, 30, 0.6))',
                                transition: 'stroke-dashoffset 0.5s ease-out'
                            }}
                        />
                        <defs>
                            <linearGradient id="countdownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#E62B1E" />
                                <stop offset="100%" stopColor="#ff4d6d" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Number display */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                            style={{
                                textShadow: '0 0 20px rgba(230, 43, 30, 0.4)',
                                opacity: isLoaded ? 1 : 0,
                                transition: 'opacity 0.3s ease'
                            }}
                        >
                            {String(value).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* Label */}
                <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base font-semibold text-gray-400 uppercase tracking-[0.15em]">
                    {label}
                </p>
            </div>
        );
    });

    return (
        <section className="py-16 md:py-24 bg-[#0A0A0A] relative overflow-hidden">
            {/* Background glow effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(230, 43, 30, 0.08) 0%, transparent 60%)'
                }}
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 uppercase tracking-tight">
                        Count<span className="text-[#E62B1E]">down</span>
                    </h2>
                    <div className="w-20 md:w-24 h-1 bg-[#E62B1E] mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-4xl mx-auto"
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
