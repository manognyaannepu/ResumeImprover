import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#000000] to-black text-white relative overflow-x-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 px-4 relative z-10 pt-20 pb-32">

                {/* Left Side - Hero Text */}
                <div className="flex-1 space-y-8 lg:pr-10">
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

                    <div className="flex gap-4 pt-4">
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

                {/* Right Side - Hero Image / CTA */}
                <div className="flex-1 w-full max-w-md lg:max-w-xl text-center lg:text-right">
                    <div className="relative inline-block group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <Button
                            className="relative w-full sm:w-auto text-lg px-8 py-6 bg-slate-900 border-slate-800 hover:bg-slate-800 text-blue-400 hover:text-blue-300 font-bold transition-all duration-300"
                            onClick={() => {
                                localStorage.setItem('resume_auth', 'true');
                                navigate('/hub');
                            }}
                        >
                            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">
                        No credit card required • Free forever for students
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-24 relative z-10">
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
                        className="bg-slate-950/50 border-slate-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                        onClick={() => {
                            localStorage.setItem('resume_auth', 'true'); // Auto-login for demo flow
                            navigate('/templates');
                        }}
                    >
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                                <FileText className="h-6 w-6 text-blue-500 group-hover:text-white" />
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
                    <Card className="bg-slate-950/50 border-slate-800 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors duration-300">
                                <CheckCircle2 className="h-6 w-6 text-purple-500 group-hover:text-white" />
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
                    <Card className="bg-slate-950/50 border-slate-800 hover:border-teal-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-colors duration-300">
                                <FileText className="h-6 w-6 text-teal-500 group-hover:text-white" />
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
                    <Card className="bg-slate-950/50 border-slate-800 hover:border-pink-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500 transition-colors duration-300">
                                <div className="h-6 w-6 text-pink-500 group-hover:text-white font-bold text-lg flex items-center justify-center">⚡</div>
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
                    <Card className="bg-slate-950/50 border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors duration-300">
                                <FileText className="h-6 w-6 text-cyan-500 group-hover:text-white" />
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
                    <Card className="bg-slate-950/50 border-slate-800 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                        <CardHeader>
                            <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-colors duration-300">
                                <div className="h-6 w-6 text-indigo-500 group-hover:text-white font-bold text-lg flex items-center justify-center">✨</div>
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
        </div >
    );
};

export default Login;
