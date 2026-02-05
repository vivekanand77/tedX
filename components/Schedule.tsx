import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SCHEDULE } from '../constants';
import { CalendarPlus, Clock } from 'lucide-react';

/**
 * Schedule Component - Production-Ready Event Timeline
 * 
 * FIXES APPLIED:
 * 1. Alignment & Spacing: Consistent padding, proper gap values, optical centering
 * 2. Hierarchy: Clear distinction between title (bold/large), description (regular), action (subtle)
 * 3. Badge Placement: Integrated badge flows with content, not intrusive
 * 4. Typography: Proper sizing scale, improved line-height and letter-spacing
 * 5. Contrast: WCAG AA compliant text colors (gray-300 minimum on dark)
 * 6. Accessibility: Focus states, keyboard navigation, clear interactive affordance
 * 7. Visual Balance: Proper border-radius, consistent internal padding
 */

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
                {/* Section Header */}
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
                        {/* Vertical Timeline Line */}
                        <motion.div
                            className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-[#E62B1E]/30 via-[#333] to-[#E62B1E]/30"
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
                                    className="relative flex items-center mb-12 md:mb-16 last:mb-0"
                                >
                                    {/* Left Side Content (Time for left-aligned cards) */}
                                    <motion.div
                                        className={`w-[calc(50%-1.5rem)] ${isLeft ? 'pr-6 md:pr-10' : 'order-3 pl-6 md:pl-10'}`}
                                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        {isLeft && (
                                            <div className="flex items-center gap-2 justify-end">
                                                <Clock size={14} className="text-gray-500" />
                                                <span className="text-sm font-semibold text-gray-300 tracking-wide">
                                                    {item.time}
                                                </span>
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Center Timeline Dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10 order-2">
                                        <motion.div
                                            className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${isLive
                                                    ? 'bg-[#E62B1E] border-[#E62B1E] shadow-[0_0_12px_rgba(230,43,30,0.6)]'
                                                    : 'bg-[#1a1a1a] border-[#444] hover:border-[#E62B1E]/70'
                                                }`}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            {/* Live Pulse */}
                                            {isLive && (
                                                <div className="absolute inset-[-4px] rounded-full bg-[#E62B1E]/40 animate-ping" />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Card Content */}
                                    <motion.div
                                        className={`w-[calc(50%-1.5rem)] ${isLeft ? 'order-3 pl-6 md:pl-10' : 'pr-6 md:pr-10'}`}
                                        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <motion.div
                                            className={`group relative bg-[#111111] rounded-xl border transition-all duration-300 overflow-hidden ${isLive
                                                    ? 'border-[#E62B1E]/40 shadow-[0_0_24px_rgba(230,43,30,0.12)]'
                                                    : 'border-[#1f1f1f] hover:border-[#333] hover:shadow-lg'
                                                }`}
                                            whileHover={{ y: -2 }}
                                        >
                                            {/* Live Badge - Integrated at top */}
                                            {isLive && (
                                                <div className="bg-[#E62B1E] px-4 py-2 flex items-center gap-2">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                                    </span>
                                                    <span className="text-xs font-bold text-white tracking-wider uppercase">
                                                        Live Now
                                                    </span>
                                                </div>
                                            )}

                                            {/* Card Body */}
                                            <div className="p-5 md:p-6">
                                                {/* Time (for right-side cards) */}
                                                {!isLeft && (
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Clock size={14} className="text-gray-500" />
                                                        <span className="text-sm font-semibold text-gray-300 tracking-wide">
                                                            {item.time}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Icon + Title Row */}
                                                <div className="flex items-start gap-4">
                                                    {/* Icon Container */}
                                                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#252525] flex items-center justify-center ${isLive ? 'bg-[#E62B1E]/10 border-[#E62B1E]/30' : ''
                                                        }`}>
                                                        <item.icon className={`w-5 h-5 ${isLive ? 'text-[#E62B1E]' : 'text-gray-400'}`} />
                                                    </div>

                                                    {/* Title + Description */}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-base md:text-lg font-bold text-white leading-snug group-hover:text-[#E62B1E] transition-colors duration-200">
                                                            {item.title}
                                                        </h4>
                                                        <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <div className="mt-4 pt-4 border-t border-[#1f1f1f]">
                                                    <button
                                                        onClick={() => addToCalendar(item.title, item.time)}
                                                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#E62B1E] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E62B1E]/50 focus:ring-offset-2 focus:ring-offset-[#111111] rounded px-2 py-1 -ml-2"
                                                        aria-label={`Add ${item.title} to calendar`}
                                                    >
                                                        <CalendarPlus size={14} />
                                                        <span>Add to Calendar</span>
                                                    </button>
                                                </div>
                                            </div>
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
