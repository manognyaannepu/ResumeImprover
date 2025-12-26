import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Templates from './pages/Templates';
import UserHub from './pages/UserHub';
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
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/workspace/:id?" element={<Workspace />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
