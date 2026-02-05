/**
 * Speakers Component - Premium TEDxSRKR 2026 Design
 * 
 * Design Philosophy:
 * ─────────────────
 * - Cinematic hero section with gradient background
 * - Featured speaker spotlight with dynamic content
 * - Responsive grid that adapts to speaker count
 * - Accessibility-first (keyboard focus, screen readers)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SPEAKERS } from '../constants';
import { Mic, Quote, ChevronRight, Sparkles, Users, Clock, Layers } from 'lucide-react';

// ════════════════════════════════════════════════════════════════════════════
// Speaker Card Component
// ════════════════════════════════════════════════════════════════════════════

interface SpeakerCardProps {
    speaker: typeof SPEAKERS[0];
    index: number;
    isFeatured?: boolean;
    totalCount: number;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, index, isFeatured, totalCount }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Extract topic without quotes
    const topicText = speaker.topic.replace(/"/g, '');

    if (isFeatured) {
        return (
            <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label={`Featured speaker: ${speaker.name}`}
            >
                <div className="grid md:grid-cols-2 gap-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl overflow-hidden border border-white/[0.08]">
                    {/* Image side */}
                    <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden">
                        <motion.img
                            src={speaker.image}
                            alt={`Portrait of ${speaker.name}`}
                            className="w-full h-full object-cover"
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {/* Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A] hidden md:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:hidden" />

                        {/* Featured badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#E62B1E] rounded-full">
                            <Sparkles className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                            <span className="text-white text-xs font-semibold uppercase tracking-wider">Featured</span>
                        </div>
                    </div>

                    {/* Content side */}
                    <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                        <motion.div
                            animate={{ x: isHovered ? 4 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Topic badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E62B1E]/10 border border-[#E62B1E]/20 rounded-full mb-5">
                                <Mic className="w-3.5 h-3.5 text-[#E62B1E] flex-shrink-0" aria-hidden="true" />
                                <span className="text-[#E62B1E] text-xs font-medium truncate max-w-[200px]">{topicText}</span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                                {speaker.name}
                            </h3>
                            <p className="text-white/60 text-base md:text-lg mb-6">{speaker.title}</p>

                            {/* Dynamic quote based on topic */}
                            <blockquote className="relative pl-4 border-l-2 border-[#E62B1E]/40 mb-6">
                                <Quote className="absolute -left-3 -top-2 w-5 h-5 text-[#E62B1E]/30" aria-hidden="true" />
                                <p className="text-white/70 italic text-sm md:text-base">
                                    "{topicText}" — An exploration of ideas that will reshape our understanding.
                                </p>
                            </blockquote>

                            {/* Talk info */}
                            <div className="flex items-center gap-4 text-white/40 text-sm mb-6">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" aria-hidden="true" />
                                    18 min talk
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.article>
        );
    }

    // Regular speaker card
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={`Speaker: ${speaker.name}`}
        >
            <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#E62B1E] focus-within:ring-offset-2 focus-within:ring-offset-[#0A0A0A]">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.img
                        src={speaker.image}
                        alt={`Portrait of ${speaker.name}`}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />

                    {/* Topic badge - visible on hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-4 left-4 right-4"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full max-w-full">
                                    <Mic className="w-3 h-3 text-[#E62B1E] flex-shrink-0" aria-hidden="true" />
                                    <span className="text-white/90 text-xs truncate">{topicText}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                            {speaker.name}
                        </h3>
                        <p className="text-white/60 text-sm">{speaker.title}</p>
                    </div>
                </div>

                {/* Red accent line on hover */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E62B1E] to-[#ff4d4d]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: 'left' }}
                />
            </div>
        </motion.article>
    );
};

// ════════════════════════════════════════════════════════════════════════════
// Main Speakers Component
// ════════════════════════════════════════════════════════════════════════════

const Speakers: React.FC = () => {
    const featuredSpeaker = SPEAKERS[0];
    const otherSpeakers = SPEAKERS.slice(1);
    const totalSpeakers = SPEAKERS.length;

    // Dynamic grid columns based on speaker count
    const getGridCols = () => {
        if (otherSpeakers.length === 1) return 'grid-cols-1 max-w-md';
        if (otherSpeakers.length === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-2xl';
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    };

    return (
        <section id="speakers" className="relative bg-[#0A0A0A] overflow-hidden">
            {/* Hero Section */}
            <div className="relative py-24 md:py-32">
                {/* Background effects */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(230, 43, 30, 0.08) 0%, transparent 50%)'
                    }}
                    aria-hidden="true"
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full mb-6">
                            <span className="text-[#E62B1E] font-bold" aria-hidden="true">●</span>
                            <span className="text-white/60 text-sm font-medium tracking-wide">TEDxSRKR 2026</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
                            Meet Our{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E62B1E] to-[#ff4d4d]">
                                Speakers
                            </span>
                        </h1>

                        <p className="text-white/50 text-lg md:text-xl leading-relaxed">
                            Visionaries, innovators, and thought leaders sharing ideas that will change the way you see the world.
                        </p>
                    </motion.div>

                    {/* Stats - based on real data */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 md:mb-20"
                    >
                        <div className="text-center flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#E62B1E]/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-[#E62B1E]" aria-hidden="true" />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl md:text-3xl font-bold text-white">{totalSpeakers}</div>
                                <div className="text-white/40 text-xs uppercase tracking-wider">Speakers</div>
                            </div>
                        </div>
                        <div className="text-center flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#E62B1E]/10 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-[#E62B1E]" aria-hidden="true" />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl md:text-3xl font-bold text-white">{totalSpeakers * 18}</div>
                                <div className="text-white/40 text-xs uppercase tracking-wider">Min of Talks</div>
                            </div>
                        </div>
                        <div className="text-center flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#E62B1E]/10 flex items-center justify-center">
                                <Layers className="w-5 h-5 text-[#E62B1E]" aria-hidden="true" />
                            </div>
                            <div className="text-left">
                                <div className="text-2xl md:text-3xl font-bold text-white">{totalSpeakers}</div>
                                <div className="text-white/40 text-xs uppercase tracking-wider">Topics</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Speaker */}
                    <SpeakerCard speaker={featuredSpeaker} index={0} isFeatured totalCount={totalSpeakers} />
                </div>
            </div>

            {/* Other Speakers Grid */}
            {otherSpeakers.length > 0 && (
                <div className="py-16 md:py-24 border-t border-white/[0.05]">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-between mb-12"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                All Speakers
                            </h2>
                            <div className="hidden md:block h-px flex-1 mx-8 bg-gradient-to-r from-white/10 to-transparent" aria-hidden="true" />
                        </motion.div>

                        <div className={`grid ${getGridCols()} gap-6 md:gap-8 mx-auto`}>
                            {otherSpeakers.map((speaker, index) => (
                                <SpeakerCard key={speaker.name} speaker={speaker} index={index + 1} totalCount={totalSpeakers} />
                            ))}
                        </div>

                        {/* Coming soon - only show if we have fewer than 6 speakers */}
                        {totalSpeakers < 6 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="mt-16 text-center"
                            >
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.02] border border-dashed border-white/10 rounded-full">
                                    <div className="w-2 h-2 bg-[#E62B1E] rounded-full animate-pulse" aria-hidden="true" />
                                    <span className="text-white/50 text-sm">More speakers to be announced</span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}

        </section>
    );
};

export default Speakers;
