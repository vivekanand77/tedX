import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SpeakersPage from './pages/SpeakersPage';
import SchedulePage from './pages/SchedulePage';
import TeamPage from './pages/TeamPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="speakers" element={<SpeakersPage />} />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
};

export default App;
