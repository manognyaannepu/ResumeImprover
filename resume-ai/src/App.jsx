import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Templates from './pages/Templates';
import UserHub from './pages/UserHub';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TextEnhancer from './pages/TextEnhancer';
import JobTailor from './pages/JobTailor';
import ATSOptimizer from './pages/ATSOptimizer';
import SkillsAnalyzer from './pages/SkillsAnalyzer';
import ImpactScorer from './pages/ImpactScorer';
import Workspace from './pages/Workspace';
import Layout from './components/Layout';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Navigate to="/" replace />} />

                <Route element={<Layout />}>
                    {/* Protected Routes */}
                    <Route path="/hub" element={<UserHub />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/text-enhancer" element={<TextEnhancer />} />
                    <Route path="/job-tailor" element={<JobTailor />} />
                    <Route path="/ats-optimizer" element={<ATSOptimizer />} />
                    <Route path="/skills-analyzer" element={<SkillsAnalyzer />} />
                    <Route path="/impact-scorer" element={<ImpactScorer />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/workspace/:id?" element={<Workspace />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
