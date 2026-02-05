/**
 * Admin Dashboard Home
 * 
 * Overview page with key metrics and quick actions.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users,
    Mic,
    Video,
    Eye,
    TrendingUp,
    Plus,
    ArrowRight,
    Calendar,
    RefreshCw,
    LucideIcon,
} from 'lucide-react';
import { getDashboardSummary, getRegistrationStats, getDailyVideoStats } from '../../lib/adminApi';
import { DashboardSummary, RegistrationStats, DailyVideoStats } from '../../types/admin';
import { useRequiredAdminAuth } from '../../contexts/AdminAuthContext';

// ============================================
// Stat Card Component
// ============================================

interface StatCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: LucideIcon;
    trend?: number;
    color?: 'red' | 'blue' | 'green' | 'purple';
}

function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'red' }: StatCardProps) {
    const colorClasses = {
        red: 'bg-[#E62B1E]/10 text-[#E62B1E]',
        blue: 'bg-blue-500/10 text-blue-400',
        green: 'bg-green-500/10 text-green-400',
        purple: 'bg-purple-500/10 text-purple-400',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 hover:border-white/[0.15] transition-colors"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`} />
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-white/40 text-sm">{title}</p>
            {subtitle && <p className="text-white/30 text-xs mt-1">{subtitle}</p>}
        </motion.div>
    );
}

// ============================================
// Quick Action Card
// ============================================

interface QuickActionProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color?: string;
}

function QuickAction({ title, description, icon: Icon, href, color = '#E62B1E' }: QuickActionProps) {
    return (
        <Link
            to={href}
            className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:border-white/[0.15] hover:bg-white/[0.03] transition-all"
        >
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}20` }}
            >
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div className="flex-1">
                <h4 className="text-white font-medium">{title}</h4>
                <p className="text-white/40 text-sm">{description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
        </Link>
    );
}

// ============================================
// Main Dashboard Component
// ============================================

export default function AdminDashboard() {
    const { adminUser, canManageContent } = useRequiredAdminAuth();
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [recentRegistrations, setRecentRegistrations] = useState<RegistrationStats[]>([]);
    const [recentViews, setRecentViews] = useState<DailyVideoStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const [summaryData, regStats, viewStats] = await Promise.all([
                getDashboardSummary(),
                getRegistrationStats(),
                getDailyVideoStats(),
            ]);
            
            setSummary(summaryData);
            setRecentRegistrations(regStats.slice(0, 7));
            setRecentViews(viewStats.slice(0, 7));
        } catch (err) {
            console.error('Dashboard fetch error:', err);
            setError('Failed to load dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E62B1E]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                    onClick={fetchData}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] text-white rounded-lg hover:bg-white/[0.1] transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Welcome back, {adminUser?.name?.split(' ')[0] || 'Admin'}
                    </h1>
                    <p className="text-white/50">
                        Here's what's happening with TEDxSRKR 2026
                    </p>
                </div>
                <button
                    onClick={fetchData}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] text-white/70 rounded-lg hover:bg-white/[0.1] hover:text-white transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Registrations"
                    value={summary?.totalRegistrations || 0}
                    subtitle={`+${summary?.registrationsToday || 0} today`}
                    icon={Users}
                    color="red"
                />
                <StatCard
                    title="Published Speakers"
                    value={summary?.publishedSpeakers || 0}
                    subtitle={`${summary?.totalSpeakers || 0} total`}
                    icon={Mic}
                    color="blue"
                />
                <StatCard
                    title="Published Talks"
                    value={summary?.publishedTalks || 0}
                    subtitle={`${summary?.totalTalks || 0} total`}
                    icon={Video}
                    color="green"
                />
                <StatCard
                    title="Video Views"
                    value={summary?.totalVideoViews || 0}
                    subtitle={`+${summary?.viewsToday || 0} today`}
                    icon={Eye}
                    color="purple"
                />
            </div>

            {/* Quick Actions */}
            {canManageContent() && (
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <QuickAction
                            title="Add Speaker"
                            description="Create a new speaker profile"
                            icon={Plus}
                            href="/admin/speakers/new"
                            color="#E62B1E"
                        />
                        <QuickAction
                            title="Add Talk"
                            description="Upload a new talk or video"
                            icon={Video}
                            href="/admin/talks/new"
                            color="#10B981"
                        />
                        <QuickAction
                            title="View Analytics"
                            description="Detailed metrics and reports"
                            icon={TrendingUp}
                            href="/admin/analytics"
                            color="#8B5CF6"
                        />
                    </div>
                </div>
            )}

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Registrations */}
                <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Recent Registrations</h2>
                        <Link to="/admin/registrations" className="text-[#E62B1E] text-sm hover:underline">
                            View all →
                        </Link>
                    </div>
                    {recentRegistrations.length > 0 ? (
                        <div className="space-y-3">
                            {recentRegistrations.map((stat) => (
                                <div
                                    key={stat.date}
                                    className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-white/40" />
                                        <span className="text-white/70 text-sm">
                                            {new Date(stat.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-medium">{stat.count}</span>
                                        <div className="flex gap-2 text-xs">
                                            {stat.standard_count > 0 && (
                                                <span className="px-2 py-0.5 bg-white/[0.05] rounded text-white/50">
                                                    {stat.standard_count} std
                                                </span>
                                            )}
                                            {stat.vip_count > 0 && (
                                                <span className="px-2 py-0.5 bg-[#E62B1E]/20 rounded text-[#E62B1E]">
                                                    {stat.vip_count} VIP
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/40 text-center py-8">No registrations yet</p>
                    )}
                </div>

                {/* Video Views */}
                <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Video Views</h2>
                        <Link to="/admin/analytics" className="text-[#E62B1E] text-sm hover:underline">
                            View analytics →
                        </Link>
                    </div>
                    {recentViews.length > 0 ? (
                        <div className="space-y-3">
                            {recentViews.map((stat) => (
                                <div
                                    key={stat.date}
                                    className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-white/40" />
                                        <span className="text-white/70 text-sm">
                                            {new Date(stat.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-medium">{stat.total_views} views</span>
                                        <span className="text-white/40 text-sm">{stat.unique_viewers} unique</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/40 text-center py-8">No video views yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
