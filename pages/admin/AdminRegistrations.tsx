/**
 * Admin Registrations Page
 * 
 * View and export event registrations.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    Download,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Mail,
    Phone,
    GraduationCap,
    Filter,
    X,
} from 'lucide-react';
import { getSupabase } from '../../lib/supabase-browser';
import { downloadCSV, generateCSV } from '../../lib/adminApi';
import { RequireAuth } from '../../contexts/AdminAuthContext';

// ============================================
// Types
// ============================================

interface Registration {
    id: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    year_of_study: string;
    created_at: string;
}

// ============================================
// Main Component
// ============================================

function RegistrationsContent() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    
    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [yearFilter, setYearFilter] = useState<string>('');
    const [showFilters, setShowFilters] = useState(false);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    // Fetch registrations
    const fetchRegistrations = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabase();
            let query = supabase
                .from('registrations')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false });

            // Apply search filter
            if (searchQuery) {
                query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);
            }

            // Apply year filter
            if (yearFilter) {
                query = query.eq('year_of_study', yearFilter);
            }

            // Pagination
            const from = (currentPage - 1) * pageSize;
            const to = from + pageSize - 1;
            query = query.range(from, to);

            const { data, error, count } = await query;

            if (error) throw error;

            setRegistrations(data || []);
            setTotalCount(count || 0);
        } catch (err) {
            console.error('Failed to fetch registrations:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, [currentPage, searchQuery, yearFilter]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, yearFilter]);

    // Export all registrations
    const handleExport = async () => {
        try {
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from('registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const csv = generateCSV(data || [], ['name', 'email', 'phone', 'college', 'year_of_study', 'created_at']);
            downloadCSV(csv, `registrations_${new Date().toISOString().split('T')[0]}.csv`);
        } catch (err) {
            console.error('Export failed:', err);
            alert('Failed to export registrations');
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);
    const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty', 'Other'];

    const clearFilters = () => {
        setSearchQuery('');
        setYearFilter('');
        setShowFilters(false);
    };

    const hasActiveFilters = searchQuery || yearFilter;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="w-7 h-7 text-[#E62B1E]" />
                        Registrations
                    </h1>
                    <p className="text-white/50 mt-1">
                        {totalCount} total registrations
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={fetchRegistrations}
                        disabled={isLoading}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors"
                    >
                        <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={handleExport}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#E62B1E] text-white rounded-xl hover:bg-[#E62B1E]/90 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="flex-1 min-w-[200px] relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, or phone..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#E62B1E]/50 transition-colors"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors ${
                            showFilters || hasActiveFilters
                                ? 'bg-[#E62B1E]/10 text-[#E62B1E] border border-[#E62B1E]/30'
                                : 'bg-white/[0.03] text-white/60 border border-white/[0.08] hover:text-white'
                        }`}
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        {hasActiveFilters && (
                            <span className="w-2 h-2 bg-[#E62B1E] rounded-full" />
                        )}
                    </button>
                </div>

                {/* Filter Options */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                                <div>
                                    <label className="block text-white/50 text-xs mb-1">Year of Study</label>
                                    <select
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                        className="px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none cursor-pointer"
                                    >
                                        <option value="">All Years</option>
                                        {yearOptions.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-1 px-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E62B1E]"></div>
                    </div>
                ) : registrations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <Users className="w-12 h-12 text-white/20 mb-4" />
                        <h3 className="text-lg font-medium text-white/70">No registrations found</h3>
                        <p className="text-white/40 text-sm mt-1">
                            {hasActiveFilters ? 'Try adjusting your filters' : 'Registrations will appear here'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/[0.02]">
                                <tr className="text-left text-white/50 text-sm">
                                    <th className="px-6 py-4 font-medium">Name</th>
                                    <th className="px-6 py-4 font-medium">Email</th>
                                    <th className="px-6 py-4 font-medium">Phone</th>
                                    <th className="px-6 py-4 font-medium">Year</th>
                                    <th className="px-6 py-4 font-medium">Registered</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.05]">
                                {registrations.map((reg, index) => (
                                    <motion.tr
                                        key={reg.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.02 }}
                                        className="text-white/70 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-white font-medium">{reg.name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={`mailto:${reg.email}`}
                                                className="inline-flex items-center gap-2 text-white/60 hover:text-[#E62B1E] transition-colors"
                                            >
                                                <Mail className="w-4 h-4" />
                                                {reg.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={`tel:${reg.phone}`}
                                                className="inline-flex items-center gap-2 text-white/60 hover:text-[#E62B1E] transition-colors"
                                            >
                                                <Phone className="w-4 h-4" />
                                                {reg.phone}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-2 px-2 py-1 bg-white/[0.05] rounded-lg text-sm">
                                                <GraduationCap className="w-3.5 h-3.5" />
                                                {reg.year_of_study}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-2 text-white/50 text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(reg.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08]">
                        <p className="text-white/50 text-sm">
                            Showing {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalCount)} of {totalCount}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-white/60 text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 text-white/60 hover:text-white hover:bg-white/[0.05] rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default function AdminRegistrations() {
    return (
        <RequireAuth requiredPermission="view_dashboard">
            <RegistrationsContent />
        </RequireAuth>
    );
}
