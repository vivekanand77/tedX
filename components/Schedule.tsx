import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SCHEDULE } from '../constants';
import { CalendarPlus, Clock } from 'lucide-react';

const Schedule: React.FC = () => {
    // Simulate current session for "Live" indicator (index 2 = third session)
    const [currentSession] = useState(2);

    // Add to calendar function
    const addToCalendar = (title: string, time: string) => {
        const eventDate = new Date('2026-03-15');
        const [hours, minutesPart] = time.split(':');
        const isPM = time.toLowerCase().includes('pm');
        let hour = parseInt(hours);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
        eventDate.setHours(hour, parseInt(minutesPart) || 0);

        const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000);

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('TEDxSRKR: ' + title)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent('TEDxSRKR 2026 Event Session')}&location=${encodeURIComponent('SRKR Engineering College')}`;

        window.open(googleCalendarUrl, '_blank');
    };

    return (
        <section id="schedule" className="py-20 md:py-32 bg-[#0A0A0A]">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-sm font-bold text-[#E62B1E] uppercase tracking-[0.2em]">
                        Event Day
                    </span>
                    <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                        The Schedule
                    </h2>
                    <div className="mt-4 w-20 h-1 bg-[#E62B1E] mx-auto rounded-full" />
                    <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
                        A day packed with inspiring talks, meaningful connections, and transformative ideas.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Vertical Timeline Line - Perfectly centered */}
                        <motion.div
                            className="absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-gradient-to-b from-[#E62B1E]/20 via-[#333] to-[#E62B1E]/20"
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            style={{ transformOrigin: 'top' }}
                        />

                        {/* Schedule Items */}
                        {SCHEDULE.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            const isLive = index === currentSession;

                            return (
                                <div
                                    key={index}
                                    className="relative flex items-center mb-16 last:mb-0"
                                >
                                    {/* Left Content */}
                                    <motion.div
                                        className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8 text-right' : 'order-3 pl-8 text-left'}`}
                                        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        {isLeft && (
                                            <div className={`flex items-center gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                                <Clock size={14} className="text-gray-500" />
                                                <span className="text-sm font-medium text-gray-400 tracking-wide">
                                                    {item.time}
                                                </span>
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Center Dot - Perfectly aligned */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10 order-2">
                                        <motion.div
                                            className={`relative w-5 h-5 rounded-full border-[3px] ${isLive
                                                    ? 'bg-[#E62B1E] border-[#E62B1E]'
                                                    : 'bg-[#1a1a1a] border-[#E62B1E]/60 hover:border-[#E62B1E]'
                                                } transition-colors duration-300`}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            {/* Live Pulse Animation */}
                                            {isLive && (
                                                <>
                                                    <div className="absolute inset-0 rounded-full bg-[#E62B1E] animate-ping opacity-75" />
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E62B1E] rounded-full flex items-center justify-center">
                                                        <span className="text-[6px] font-bold text-white">LIVE</span>
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Right Content - Card */}
                                    <motion.div
                                        className={`w-[calc(50%-2rem)] ${isLeft ? 'order-3 pl-8' : 'pr-8 text-right'}`}
                                        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <motion.div
                                            className={`group relative bg-[#111111] p-6 rounded-xl border transition-all duration-300 ${isLive
                                                    ? 'border-[#E62B1E]/50 shadow-[0_0_30px_rgba(230,43,30,0.15)]'
                                                    : 'border-[#222222] hover:border-[#E62B1E]/40'
                                                }`}
                                            whileHover={{ y: -4, scale: 1.01 }}
                                        >
                                            {/* Live Badge */}
                                            {isLive && (
                                                <div className={`absolute -top-3 ${isLeft ? 'left-4' : 'right-4'} px-3 py-1 bg-[#E62B1E] rounded-full`}>
                                                    <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                                        HAPPENING NOW
                                                    </span>
                                                </div>
                                            )}

                                            {/* Time (for right-side cards) */}
                                            {!isLeft && (
                                                <div className="flex items-center gap-2 justify-end mb-2">
                                                    <span className="text-sm font-medium text-gray-400 tracking-wide">
                                                        {item.time}
                                                    </span>
                                                    <Clock size={14} className="text-gray-500" />
                                                </div>
                                            )}

                                            {/* Icon + Title */}
                                            <div className={`flex items-center gap-3 ${isLeft ? '' : 'justify-end'}`}>
                                                <div className={`p-2 rounded-lg bg-[#1a1a1a] ${!isLeft && 'order-2'}`}>
                                                    <item.icon className="w-5 h-5 text-[#E62B1E]" />
                                                </div>
                                                <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-[#E62B1E] transition-colors">
                                                    {item.title}
                                                </h4>
                                            </div>

                                            {/* Description - WCAG Compliant contrast */}
                                            <p className={`text-sm md:text-base text-gray-300 mt-3 leading-relaxed ${isLeft ? 'text-left' : 'text-right'}`}>
                                                {item.description}
                                            </p>

                                            {/* Add to Calendar Button */}
                                            <motion.button
                                                onClick={() => addToCalendar(item.title, item.time)}
                                                className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#E62B1E] transition-colors ${isLeft ? '' : 'ml-auto'}`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <CalendarPlus size={14} />
                                                Add to Calendar
                                            </motion.button>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
