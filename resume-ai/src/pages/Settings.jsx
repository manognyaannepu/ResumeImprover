import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Trash2, Moon, Smartphone, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

const Settings = () => {
    const navigate = useNavigate();

    // State for settings
    const [notifications, setNotifications] = useState(true);
    const [publicProfile, setPublicProfile] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    // Load actual potential settings from localStorage if we had them, 
    // for now we stick to component state for the session

    const handleClearData = () => {
        if (window.confirm("Are you sure? This will delete all your saved resumes and reset the app.")) {
            localStorage.clear();
            localStorage.setItem('resume_auth', 'true'); // Keep logged in
            alert("All data cleared!");
            navigate('/hub');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('resume_auth');
        navigate('/');
    };

    const Toggle = ({ checked, onChange }) => (
        <div
            onClick={() => onChange(!checked)}
            className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ease-in-out ${checked ? 'bg-blue-600' : 'bg-slate-700'}`}
        >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${checked ? 'left-6' : 'left-1'}`} />
        </div>
    );

    return (
        <div className="min-h-screen container mx-auto px-4 py-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        Settings
                    </h1>
                    <p className="text-slate-400">Configure your workspace preferences.</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">

                {/* Preferences */}
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Smartphone className="h-5 w-5 text-blue-500" /> App Preferences
                        </CardTitle>
                        <CardDescription>Customize your editing experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Auto-Save Projects</h3>
                                <p className="text-sm text-slate-500">Automatically save your work while editing.</p>
                            </div>
                            <Toggle checked={autoSave} onChange={setAutoSave} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Dark Mode</h3>
                                <p className="text-sm text-slate-500">Always on (System Default)</p>
                            </div>
                            <div className="opacity-50 cursor-not-allowed">
                                <Toggle checked={true} onChange={() => { }} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications & Privacy */}
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Bell className="h-5 w-5 text-purple-500" /> Notifications & Privacy
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Email Notifications</h3>
                                <p className="text-sm text-slate-500">Receive tips and feature updates.</p>
                            </div>
                            <Toggle checked={notifications} onChange={setNotifications} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Public Profile</h3>
                                <p className="text-sm text-slate-500">Allow others to see your basic stats.</p>
                            </div>
                            <Toggle checked={publicProfile} onChange={setPublicProfile} />
                        </div>
                    </CardContent>
                </Card>

                {/* Data Zone */}
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Shield className="h-5 w-5 text-red-500" /> Data & Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-800 bg-slate-950/30">
                            <div>
                                <h3 className="text-red-400 font-medium">Clear User Data</h3>
                                <p className="text-xs text-slate-500">Removes all saved resumes and resets local storage.</p>
                            </div>
                            <Button variant="ghost" onClick={handleClearData} className="text-red-400 hover:text-red-300 hover:bg-red-950/20">
                                <Trash2 className="h-4 w-4 mr-2" /> Clear Data
                            </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-800 bg-slate-950/30">
                            <div>
                                <h3 className="text-slate-300 font-medium">Log Out</h3>
                                <p className="text-xs text-slate-500">Sign out of your account on this device.</p>
                            </div>
                            <Button variant="secondary" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" /> Sign Out
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center text-xs text-slate-600 pt-4">
                    ResumeAI v1.0.2 • Build 2024.12
                </div>
            </div>
        </div>
    );
};

export default Settings;
