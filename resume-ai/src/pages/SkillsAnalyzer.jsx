import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Trophy, ListChecks, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { simulateSkillGapAnalysis } from '../services/aiMock';

const SkillsAnalyzer = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ role: '', skills: '' });
    const [result, setResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        if (!inputs.role.trim() || !inputs.skills.trim()) return;

        setIsAnalyzing(true);
        // Force re-analysis simulation by passing fresh inputs
        const data = await simulateSkillGapAnalysis(inputs.role, inputs.skills);
        setResult(data);
        setIsAnalyzing(false);
    };

    return (
        <div className="min-h-screen container mx-auto px-4 py-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-cyan-500" />
                        Skills Analyzer & Coach
                    </h1>
                    <p className="text-slate-400">Deep dive into your skill set and generate a learning roadmap.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
                {/* Input Section */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Your Profile</CardTitle>
                            <CardDescription>Update details and click Analyze to refresh the plan.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-1 block">Target Job Role</label>
                                <input
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                    placeholder="e.g. Backend Engineer"
                                    value={inputs.role}
                                    onChange={(e) => setInputs(p => ({ ...p, role: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-300 mb-1 block">Current Skill Set</label>
                                <textarea
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 h-40 resize-none"
                                    placeholder="List your skills (comma separated)..."
                                    value={inputs.skills}
                                    onChange={(e) => setInputs(p => ({ ...p, skills: e.target.value }))}
                                />
                            </div>
                            <Button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="w-full bg-cyan-600 hover:bg-cyan-700 py-6"
                            >
                                {isAnalyzing ? 'Analyzing Gap...' : 'Analyze Skills'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-8">
                    {!result ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-xl p-12 text-center min-h-[400px]">
                            <ListChecks className="h-16 w-16 opacity-20 mb-4" />
                            <p className="text-lg">Enter your role and skills to see the breakdown</p>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            {/* Overview Card */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="bg-slate-900/50 border-slate-800 p-6 flex flex-col items-center justify-center text-center">
                                    <div className="text-sm text-slate-400 uppercase font-semibold mb-2">Role Fit Score</div>
                                    <div className={`text-5xl font-bold mb-2 ${result.score > 70 ? 'text-green-400' : 'text-amber-400'}`}>
                                        {result.score}%
                                    </div>
                                    <p className="text-xs text-slate-500">Based on industry standards for {result.role}</p>
                                </Card>
                                <Card className="bg-slate-900/50 border-slate-800 p-6">
                                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-cyan-400" /> Recommended Action
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {result.score > 80
                                            ? "You're well-positioned! Focus on advanced system design and soft skills."
                                            : "Focus on bridging the technical gaps listed below to improve your candidacy."}
                                    </p>
                                </Card>
                            </div>

                            {/* Detailed Breakdown */}
                            <Card className="bg-slate-900/50 border-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">Skill Requirement Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {result.breakdown.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/30 border border-slate-800/50">
                                                <div className="flex items-center gap-3">
                                                    {item.status === 'acquired'
                                                        ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                                        : <Circle className="h-5 w-5 text-slate-600 shrink-0" />
                                                    }
                                                    <div>
                                                        <div className="text-white font-medium">{item.skill}</div>
                                                        <div className="text-xs text-slate-500">{item.reason}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${item.level === 'Advanced' ? 'bg-purple-500/10 text-purple-400' :
                                                            item.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' :
                                                                'bg-slate-500/10 text-slate-400'
                                                        }`}>
                                                        {item.level}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Learning Plan */}
                            {result.plan.length > 0 && (
                                <Card className="bg-slate-900/50 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white text-lg text-cyan-400">Personalized Learning Roadmap</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative border-l-2 border-slate-800 ml-3 space-y-8 py-2">
                                            {result.plan.map((step, idx) => (
                                                <div key={idx} className="relative pl-8">
                                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-cyan-950 border-2 border-cyan-500" />
                                                    <h4 className="text-white font-medium text-lg mb-1">{step.action}</h4>
                                                    <p className="text-slate-400 text-sm mb-2">{step.resource}</p>
                                                    <span className="text-xs font-mono text-cyan-500 bg-cyan-950/30 px-2 py-1 rounded">
                                                        Est. {step.timeframe}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillsAnalyzer;
