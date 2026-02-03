import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Instagram, Twitter, ExternalLink } from 'lucide-react';
import { TEAM_CATEGORIES } from '../constants';
import { TeamMember, TeamCategory } from '../types';
import { GlareCard } from './ui/glare-card';

// Portrait Team Card Component (Reference Design)
const GlassTeamCard: React.FC<{ member: TeamMember; category: TeamCategory; index: number }> = ({
    member,
    category,
    index
}) => {
    // Open position card
    if (member.isOpenPosition) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                className="flex justify-center"
            >
                <GlareCard className="relative flex flex-col justify-between bg-black/90 backdrop-blur-md overflow-hidden min-h-[500px]">
                    {/* Top Bar: Branding */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-5 z-20">
                        {/* TEDx Branding */}
                        <div className="text-left">
                            <div className="text-[#E62B1E] font-black text-base tracking-tight">
                                TED<span className="text-white">x</span>
                            </div>
                            <div className="text-white/80 text-xs font-medium">SRKR</div>
                        </div>
                    </div>

                    {/* Center Content */}
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#E62B1E]/50 
                                            animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-2 rounded-full bg-[#1a1a1a]/80 flex items-center justify-center">
                                <span className="text-5xl text-[#E62B1E]/60">+</span>
                            </div>
                        </div>

                        <motion.a
                            href={`mailto:${member.email || 'careers@tedxsrkr.com'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E62B1E] text-white text-sm 
                                       font-bold rounded-full hover:bg-[#ff4436] transition-colors duration-300
                                       shadow-[0_4px_20px_rgba(230,43,30,0.4)]"
                        >
                            <Mail size={16} />
                            Apply Now
                        </motion.a>
                    </div>

                    {/* Bottom: Name & Role */}
                    <div className="text-center pb-8 px-6">
                        <h3 className="text-[#E62B1E] font-black text-xl uppercase tracking-wide mb-1">
                            {member.role}
                        </h3>
                        <p className="text-white/60 text-sm uppercase tracking-wider">Open Position</p>
                    </div>
                </GlareCard>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
        >
            <GlareCard className="relative flex flex-col justify-between bg-black/90 backdrop-blur-md overflow-hidden min-h-[500px]">
                {/* Top Bar: Branding + Social Icons */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-5 z-20">
                    {/* TEDx Branding */}
                    <div className="text-left">
                        <div className="text-[#E62B1E] font-black text-base tracking-tight">
                            TED<span className="text-white">x</span>
                        </div>
                        <div className="text-white/80 text-xs font-medium">SRKR</div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {member.email && (
                            <motion.a
                                href={`mailto:${member.email}`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-white/70 hover:text-white transition-colors"
                                aria-label={`Email ${member.name}`}
                            >
                                <Mail size={20} strokeWidth={2} />
                            </motion.a>
                        )}
                        {member.instagram && (
                            <motion.a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-white/70 hover:text-white transition-colors"
                                aria-label={`${member.name} on Instagram`}
                            >
                                <Instagram size={20} strokeWidth={2} />
                            </motion.a>
                        )}
                        {member.linkedin && (
                            <motion.a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-white/70 hover:text-white transition-colors"
                                aria-label={`${member.name} on LinkedIn`}
                            >
                                <Linkedin size={20} strokeWidth={2} />
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Photo with White Outline */}
                <div className="flex-1 flex items-center justify-center px-6 pt-20 pb-4">
                    <div className="relative w-full max-w-[240px]">
                        {/* White outline effect */}
                        <div
                            className="absolute inset-0 rounded-[2.5rem]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 100%)',
                                filter: 'blur(3px)',
                                transform: 'scale(1.03)',
                            }}
                        />

                        {/* Photo */}
                        <img
                            src={member.image}
                            alt={member.name}
                            loading="lazy"
                            className="relative w-full h-auto object-cover rounded-[2.5rem]
                                       shadow-[0_0_40px_rgba(255,255,255,0.25)]
                                       border-[3px] border-white/30"
                            style={{
                                aspectRatio: '3/4',
                                objectPosition: 'center 20%',
                            }}
                        />

                        {/* Lead badge */}
                        {member.isLead && (
                            <div className="absolute top-4 left-4 px-3 py-1.5 
                                            bg-[#E62B1E] text-white text-[10px] font-bold uppercase tracking-wider
                                            rounded-full shadow-lg z-10">
                                Lead
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom: Name & Role */}
                <div className="text-center pb-8 px-6">
                    <h3 className="text-[#E62B1E] font-black text-xl md:text-2xl uppercase tracking-wide mb-1.5">
                        {member.name}
                    </h3>
                    <p className="text-white/90 text-sm uppercase tracking-[0.15em] font-semibold">
                        {member.role}
                    </p>
                </div>
            </GlareCard>
        </motion.div>
    );
};

// Main Team Component
const Team: React.FC = () => {
    return (
        <section id="team" className="relative py-24 md:py-36 overflow-hidden bg-[#0A0A0A]">
            {/* Ambient background effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E62B1E]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#E62B1E]/8 rounded-full blur-[120px]" />

                {/* Dot grid pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20 md:mb-28"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-4 py-2 mb-6 text-xs font-bold uppercase tracking-[0.2em]
                                   text-[#E62B1E] bg-[#E62B1E]/10 rounded-full border border-[#E62B1E]/20"
                    >
                        The People Behind
                    </motion.span>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 
                                   tracking-tight leading-[1.1]">
                        Meet Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E62B1E] to-[#ff6b5e]">
                            Core Team
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Behind every great idea is a team that makes it happen.
                        <br className="hidden md:block" />
                        Meet the passionate minds driving TEDxSRKR 2026 forward.
                    </p>
                </motion.div>

                {/* Team Categories */}
                {TEAM_CATEGORIES.map((category, categoryIndex) => (
                    <div key={category.id} className="mb-24 md:mb-32 last:mb-0">
                        {/* Category Header */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 mb-12 md:mb-16"
                        >
                            {/* Category Icon */}
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                                            bg-gradient-to-br from-[#E62B1E] to-[#ff4436]
                                            shadow-[0_8px_30px_rgba(230,43,30,0.4)]">
                                {category.icon}
                            </div>

                            {/* Category Info */}
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-gray-500 text-sm md:text-base max-w-xl">
                                    {category.description}
                                </p>
                            </div>

                            {/* Decorative line */}
                            <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-[#E62B1E]/30 to-transparent" />
                        </motion.div>

                        {/* Team Grid */}
                        <div className={`grid gap-6 md:gap-8 ${category.featured
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            }`}>
                            {category.members.map((member, memberIndex) => (
                                <GlassTeamCard
                                    key={member.id}
                                    member={member}
                                    category={category}
                                    index={memberIndex}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Join the Team CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative mt-20 md:mt-32 text-center"
                >
                    {/* Glass card for CTA */}
                    <div
                        className="relative max-w-2xl mx-auto rounded-3xl p-10 md:p-14 overflow-hidden"
                        style={{
                            background: 'rgba(18, 18, 18, 0.5)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                    >
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E62B1E]/10 via-transparent to-[#E62B1E]/5" />

                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Want to Join <span className="text-[#E62B1E]">TEDxSRKR</span>?
                            </h3>
                            <p className="text-gray-400 mb-8 text-lg">
                                We're always looking for passionate individuals to help bring
                                ideas worth spreading to life.
                            </p>

                            <motion.a
                                href="mailto:team@tedxsrkr.com"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#E62B1E] text-white 
                                           font-bold text-lg rounded-full 
                                           shadow-[0_8px_40px_rgba(230,43,30,0.5)]
                                           hover:shadow-[0_12px_50px_rgba(230,43,30,0.6)]
                                           transition-shadow duration-300"
                            >
                                <Mail size={20} />
                                Get in Touch
                                <ExternalLink size={16} className="opacity-60" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Team;
