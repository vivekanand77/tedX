import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SpeakersPage from './pages/SpeakersPage';
import SpeakerDetailPage from './pages/SpeakerDetailPage';
import SchedulePage from './pages/SchedulePage';
import TeamPage from './pages/TeamPage';
import TeamProfilePage from './pages/TeamProfilePage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';

// Admin imports
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSpeakers from './pages/admin/AdminSpeakers';
import AdminSpeakerForm from './pages/admin/AdminSpeakerForm';
import AdminTalks from './pages/admin/AdminTalks';
import AdminTalkForm from './pages/admin/AdminTalkForm';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminUsers from './pages/admin/AdminUsers';

const App: React.FC = () => {
    return (
        <AdminAuthProvider>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="speakers" element={<SpeakersPage />} />
                    <Route path="speakers/:id" element={<SpeakerDetailPage />} />
                    <Route path="schedule" element={<SchedulePage />} />
                    <Route path="team" element={<TeamPage />} />
                    <Route path="team/:slug" element={<TeamProfilePage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="speakers" element={<AdminSpeakers />} />
                    <Route path="speakers/new" element={<AdminSpeakerForm />} />
                    <Route path="speakers/:id/edit" element={<AdminSpeakerForm />} />
                    <Route path="talks" element={<AdminTalks />} />
                    <Route path="talks/new" element={<AdminTalkForm />} />
                    <Route path="talks/:id/edit" element={<AdminTalkForm />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="registrations" element={<AdminRegistrations />} />
                    <Route path="users" element={<AdminUsers />} />
                </Route>

                {/* Catch-all 404 route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AdminAuthProvider>
    );
};

export default App;

