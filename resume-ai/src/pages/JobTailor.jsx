import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Zap, CheckCircle2, TrendingUp, AlertCircle, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { simulateJobAnalysis } from '../services/aiMock';

const JobTailor = () => {
    const navigate = useNavigate();
    const [jobTitle, setJobTitle] = useState('');
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [education, setEducation] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        if (!jobTitle.trim() || !skills.trim()) return;

        setIsAnalyzing(true);
        const result = await simulateJobAnalysis(jobTitle, skills, experience, currentStatus, education);
        setAnalysis(result);
        setIsAnalyzing(false);
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
                        <Briefcase className="h-6 w-6 text-blue-500" />
                        Job Readiness Analyzer
                    </h1>
                    <p className="text-slate-400">Match your skills to your dream job.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

                {/* Input Panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Role Details</CardTitle>
                            <CardDescription>Tell us what you're aiming for.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-1 block">Target Job Title</label>
                                <input
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="e.g. Frontend Developer"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-1 block">Years of Exp</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="e.g. 2"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-1 block">Status</label>
                                    <select
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={currentStatus}
                                        onChange={(e) => setCurrentStatus(e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Student">Student</option>
                                        <option value="Employed">Employed</option>
                                        <option value="Unemployed">Unemployed</option>
                                        <option value="Freelancer">Freelancer</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-1 block">Education</label>
                                <input
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="e.g. B.Tech CS, MBA"
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-1 block">Your Current Skills</label>
                                <textarea
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-32 resize-none"
                                    placeholder="e.g. HTML, CSS, React, basic python"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                />
                                <p className="text-xs text-slate-500 mt-1">Separate skills with commas.</p>
                            </div>
                            <Button
                                onClick={handleAnalyze}
                                disabled={!jobTitle || !skills || isAnalyzing}
                                className="w-full bg-blue-600 hover:bg-blue-700 py-6"
                            >
                                {isAnalyzing ? (
                                    <span className="flex items-center gap-2"><Zap className="h-4 w-4 animate-spin" /> Analyzing Gap...</span>
                                ) : (
                                    <span className="flex items-center gap-2"><Zap className="h-4 w-4" /> Analyze Match</span>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-8 space-y-6">
                    {!analysis ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-xl p-12">
                            <Briefcase className="h-16 w-16 opacity-20 mb-4" />
                            <p className="text-lg">Enter your details to generate a learning path</p>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            {/* Score / Overview (Mocked) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-slate-900/50 border-slate-800 p-4 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xl">
                                        {analysis.matchScore}%
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">Match Score</p>
                                        <p className="text-sm text-white">Based on market data</p>
                                    </div>
                                </Card>
                                <Card className="bg-slate-900/50 border-slate-800 p-4 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">Detected Role</p>
                                        <p className="text-sm text-white">{analysis.roleDetected} Track</p>
                                    </div>
                                </Card>
                            </div>

                            {/* Skills Optimization */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="bg-slate-900/50 border-slate-800 h-full">
                                    <CardHeader>
                                        <CardTitle className="text-base text-green-400 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" /> Your Strengths (Optimized)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {analysis.optimizedSkills.map((skill, idx) => (
                                                <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900/50 border-slate-800 h-full">
                                    <CardHeader>
                                        <CardTitle className="text-base text-amber-400 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" /> Recommended to Learn
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {analysis.missingSkills.length === 0 ? (
                                            <p className="text-slate-500 text-sm">You have a strong skill set for this role!</p>
                                        ) : (
                                            <ul className="space-y-3">
                                                {analysis.missingSkills.map((skill, idx) => (
                                                    <li key={idx} className="text-slate-300 text-sm bg-amber-500/5 p-2 rounded border border-amber-500/10">
                                                        <div className="font-semibold text-amber-200 mb-1">{skill}</div>
                                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                                            <BookOpen className="h-3 w-3" /> {skill.resource || "Suggested: Check documentation or build a demo."}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobTailor;
