import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, Plus, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { tips } from '../data/tips';

const UserHub = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen container mx-auto px-4 py-8 animate-in fade-in duration-500">
            {/* Top Left Options */}
            <div className="flex gap-4 mb-12">
                <Button variant="ghost" className="text-slate-400 hover:text-white flex items-center gap-2"
                    onClick={() => navigate('/profile')}>
                    <User className="h-5 w-5" /> Profile
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white flex items-center gap-2"
                    onClick={() => navigate('/settings')}>
                    <Settings className="h-5 w-5" /> Settings
                </Button>
            </div>

            {/* Center Content - Create New Resume */}
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-8 text-center">
                <div className="space-y-4 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                        Ready to Build Your Future?
                    </h1>
                    <p className="text-xl text-slate-400">
                        Create a professional resume in minutes with our AI-powered templates.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        size="lg"
                        className="h-16 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:scale-105"
                        onClick={() => navigate('/templates')}
                    >
                        <Plus className="mr-2 h-6 w-6" /> Create New Resume
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="h-16 px-8 text-lg rounded-full border border-slate-700 hover:bg-slate-800 transition-all duration-300"
                        onClick={() => navigate('/dashboard')}
                    >
                        View My Resumes
                    </Button>
                </div>
            </div>

            {/* Bottom Content - Scrollable Tips */}
            <div className="mt-20">
                <div className="flex items-center gap-2 mb-6 text-yellow-400">
                    <Lightbulb className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">Resume Fun Facts & Tips</h2>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide mask-linear-fade">
                    {tips.map((tip) => (
                        <Card
                            key={tip.id}
                            className="min-w-[300px] max-w-[300px] bg-slate-900/50 border-slate-800 snap-center hover:bg-slate-800/50 transition-colors"
                        >
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg text-blue-400">{tip.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {tip.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserHub;
