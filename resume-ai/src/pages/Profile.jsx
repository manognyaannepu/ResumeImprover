import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Briefcase, Award, GraduationCap, MapPin, Edit2, Save as SaveIcon, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // Mock User Data (In a real app, this would come from a Context/Auth provider)
    const [user, setUser] = useState({
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Software Engineer",
        level: "Mid-Level",
        location: "San Francisco, CA",
        education: "B.S. Computer Science",
        university: "Tech University",
        stats: {
            resumesCreated: 12,
            optimizationsRun: 45,
            avgImpactScore: 88
        }
    });

    // Temp state for editing
    const [editForm, setEditForm] = useState(user);

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel edit
            setEditForm(user);
        } else {
            // Start edit
            setEditForm(user);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setUser(editForm);
        setIsEditing(false);
        // Here you would typically save to backend/localStorage
    };

    const handleChange = (field, value) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This will erase all your resumes and profile data. This action cannot be undone.")) {
            localStorage.clear();
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen container mx-auto px-4 py-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        My Profile
                    </h1>
                    <p className="text-slate-400">Manage your personal information and preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">

                {/* Left Column: Avatar & Basic Info */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-slate-900/50 border-slate-800 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20" />
                        <CardContent className="pt-12 pb-8">
                            <div className="relative inline-block mb-4">
                                <div className="h-24 w-24 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-4xl mx-auto text-slate-400">
                                    <User className="h-12 w-12" />
                                </div>
                                <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                            </div>

                            {isEditing ? (
                                <div className="space-y-3 mb-4">
                                    <Input
                                        value={editForm.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="text-center font-bold text-lg"
                                        placeholder="Full Name"
                                    />
                                    <Input
                                        value={editForm.role}
                                        onChange={(e) => handleChange('role', e.target.value)}
                                        className="text-center text-blue-400"
                                        placeholder="Role"
                                    />
                                    <Input
                                        value={editForm.location}
                                        onChange={(e) => handleChange('location', e.target.value)}
                                        className="text-center text-xs"
                                        placeholder="Location"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                                    <p className="text-blue-400 font-medium mb-4">{user.role}</p>
                                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
                                        <MapPin className="h-4 w-4" /> {user.location}
                                    </div>
                                </>
                            )}

                            {isEditing ? (
                                <div className="flex gap-2">
                                    <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                                        <SaveIcon className="h-4 w-4 mr-2" /> Save
                                    </Button>
                                    <Button onClick={handleEditToggle} variant="outline" className="flex-1 border-slate-700 hover:bg-slate-800">
                                        <X className="h-4 w-4 mr-2" /> Cancel
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={handleEditToggle} variant="outline" className="w-full border-slate-700 hover:text-white">
                                    <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white text-base">Activity Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/50">
                                <span className="text-slate-400 text-sm">Resumes Built</span>
                                <span className="text-white font-bold">{user.stats.resumesCreated}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/50">
                                <span className="text-slate-400 text-sm">Optimizations</span>
                                <span className="text-white font-bold">{user.stats.optimizationsRun}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/50">
                                <span className="text-slate-400 text-sm">Avg. Impact Score</span>
                                <span className="text-green-400 font-bold">{user.stats.avgImpactScore}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Personal Information</CardTitle>
                            <CardDescription>Details used to pre-fill your resume templates.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
                                    {isEditing ? (
                                        <Input
                                            value={editForm.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-300">
                                            <User className="h-4 w-4 text-blue-500" />
                                            {user.name}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
                                    {isEditing ? (
                                        <Input
                                            value={editForm.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-300">
                                            <Mail className="h-4 w-4 text-purple-500" />
                                            {user.email}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current Role</label>
                                    {isEditing ? (
                                        <Input
                                            value={editForm.role}
                                            onChange={(e) => handleChange('role', e.target.value)}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-300">
                                            <Briefcase className="h-4 w-4 text-pink-500" />
                                            {user.role}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Experience Level</label>
                                    {isEditing ? (
                                        <Input
                                            value={editForm.level}
                                            onChange={(e) => handleChange('level', e.target.value)}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-300">
                                            <Award className="h-4 w-4 text-amber-500" />
                                            {user.level}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-indigo-500" /> Education
                                </h3>
                                <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800">
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <Input
                                                value={editForm.education}
                                                onChange={(e) => handleChange('education', e.target.value)}
                                                placeholder="Degree"
                                            />
                                            <Input
                                                value={editForm.university}
                                                onChange={(e) => handleChange('university', e.target.value)}
                                                placeholder="University"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-white font-medium">{user.education}</h4>
                                                <p className="text-slate-400 text-sm">{user.university}</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white h-8" onClick={handleEditToggle}>
                                                Edit
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-white font-medium">Email Notifications</p>
                                    <p className="text-slate-500 text-sm">Receive updates about new templates</p>
                                </div>
                                <div className="h-6 w-11 bg-blue-600 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full transition-transform" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-4 border-t border-slate-800 mt-4">
                                <div>
                                    <p className="text-red-400 font-medium">Delete Account</p>
                                    <p className="text-slate-500 text-sm">Permanently remove all data</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={handleDeleteAccount}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
