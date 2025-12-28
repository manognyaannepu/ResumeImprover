import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

import Footer from '../components/Footer';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#000000] to-black text-white relative overflow-x-hidden">
            <div className="fixed inset-0 -z-10 h-full w-full">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 px-4 relative z-10 pt-20 pb-32">

                {/* Left Side - Hero Text */}
                <div className="flex-1 space-y-8 lg:pr-10 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">AI-Powered Resume Enhancement</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                        Transform Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Career Story</span>
                    </h1>

                    <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                        Leverage advanced AI to craft job-winning resumes. Optimize content, enhance readability, and stand out from the competition instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button
                            className="relative w-full sm:w-auto text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                            onClick={() => {
                                localStorage.setItem('resume_auth', 'true');
                                navigate('/hub');
                            }}
                        >
                            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <p className="text-sm text-slate-500 flex items-center">
                            No credit card required
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle2 className="text-blue-500 h-5 w-5" /> ATS Friendly
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle2 className="text-purple-500 h-5 w-5" /> AI Feedback
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle2 className="text-pink-500 h-5 w-5" /> Instant Edit
                        </div>
                    </div>
                </div>

                {/* Right Side - Hero Image */}
                <div className="flex-1 w-full max-w-md lg:max-w-xl relative">
                    <div className="relative z-10 animate-in fade-in zoom-in duration-1000 delay-200">
                        <img
                            src="/resume_ai_hero_v2_1766886362657.png"
                            alt="AI Resume Builder"
                            className="w-full h-auto drop-shadow-[0_0_50px_rgba(59,130,246,0.2)] rounded-2xl"
                        />
                        {/* Floating elements overlay */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-24 relative z-10">
                {/* Tech Background Pattern */}
                <div className="absolute inset-0 -z-10 h-full w-full">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full point-events-none" />
                </div>
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                        AI-Powered Tools
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Choose the perfect tool to enhance your resume
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tool Card 1 */}
                    <Card
                        className="bg-slate-950/50 border-slate-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1 overflow-hidden"
                        onClick={() => {
                            localStorage.setItem('resume_auth', 'true'); // Auto-login for demo flow
                            navigate('/templates');
                        }}
                    >
                        <CardHeader className="relative">
                            <div className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <img src="/tool-resume.png" alt="Resume Improver" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                            </div>
                            <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">Resume Improver</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-400 mb-6">
                                Get comprehensive feedback and suggestions to improve your entire resume structure and content.
                            </p>
                            <div className="flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform bg-blue-600/20 py-2 px-3 rounded-full w-fit group-hover:bg-blue-600/40 border border-blue-500/30">
                                Try now <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tool Card 2 */}
                    <Card
                        className="bg-slate-950/50 border-slate-800 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1 overflow-hidden"
                        onClick={() => navigate('/text-enhancer')}
                    >
                        <CardHeader>
                            <div className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <img src="/tool-text.png" alt="Text Enhancer" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                            </div>
                            <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">Text Enhancer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-400 mb-6">
                                Polish your descriptions with AI-powered suggestions for stronger, more impactful language.
                            </p>
                            <div className="flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform bg-purple-600/20 py-2 px-3 rounded-full w-fit group-hover:bg-purple-600/40 border border-purple-500/30">
                                Try now <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tool Card 3 */}
                    <Card
                        className="bg-slate-950/50 border-slate-800 hover:border-teal-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1 overflow-hidden"
                        onClick={() => navigate('/job-tailor')}
                    >
                        <CardHeader>
                            <div className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <img src="/tool-job.png" alt="Job Tailor" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
                            </div>
                            <CardTitle className="text-xl text-white group-hover:text-teal-400 transition-colors">Job-Ready Resume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-400 mb-6">
                                Tailor your resume to specific job descriptions with AI-powered keyword optimization.
                            </p>
                            <div className="flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform bg-teal-600/20 py-2 px-3 rounded-full w-fit group-hover:bg-teal-600/40 border border-teal-500/30">
                                Try now <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tool Card 4 */}
                    <Card
                        className="bg-slate-950/50 border-slate-800 hover:border-pink-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1 overflow-hidden"
                        onClick={() => navigate('/ats-optimizer')}
                    >
                        <CardHeader>
                            <div className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <img src="/tool-ats.png" alt="ATS Optimizer" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                            </div>
                            <CardTitle className="text-xl text-white group-hover:text-pink-400 transition-colors">ATS Optimizer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-400 mb-6">
                                Ensure your resume passes applicant tracking systems with optimized formatting and keywords.
                            </p>
                            <div className="flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform bg-pink-600/20 py-2 px-3 rounded-full w-fit group-hover:bg-pink-600/40 border border-pink-500/30">
                                Try now <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tool Card 5 */}
                    <Card
                        className="bg-slate-950/50 border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1 overflow-hidden"
                        onClick={() => navigate('/skills-analyzer')}
                    >
                        <CardHeader>
                            <div className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <img src="/tool-skills.png" alt="Skills Analyzer" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                            </div>
                            <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">Skills Analyzer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-400 mb-6">
                                Identify missing skills and get suggestions based on your target role and industry trends.
                            </p>
                            <div className="flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform bg-cyan-600/20 py-2 px-3 rounded-full w-fit group-hover:bg-cyan-600/40 border border-cyan-500/30">
                                Try now <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tool Card 6 */}
                    <Card className="bg-slate-950/50 border-slate-800 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1 overflow-hidden"
                        onClick={() => navigate('/impact-scorer')}>
                        <CardHeader>
                            <div className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <img src="/tool-impact.jpg" alt="Impact Scorer" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                            </div>
                            <CardTitle className="text-xl text-white group-hover:text-indigo-400 transition-colors">Impact Scorer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-400 mb-6">
                                Get an overall score for your resume with detailed insights on what to improve.
                            </p>
                            <div className="flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform bg-indigo-600/20 py-2 px-3 rounded-full w-fit group-hover:bg-indigo-600/40 border border-indigo-500/30">
                                Try now <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default Login;
