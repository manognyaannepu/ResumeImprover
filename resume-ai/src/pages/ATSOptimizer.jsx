import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, PlayCircle, BarChart3, FileText, Search, Upload, Keyboard } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { simulateATSCheck } from '../services/aiMock';
import UploadZone from '../components/UploadZone';

const ATSOptimizer = () => {
    const navigate = useNavigate();
    const [inputMode, setInputMode] = useState('upload'); // 'upload' or 'manual'
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        skills: '',
        experience: '',
        projects: ''
    });
    const [result, setResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        // Basic validation
        if (inputMode === 'manual' && !Object.values(formData).some(val => val.trim())) return;
        if (inputMode === 'upload' && !file) return;

        setIsScanning(true);
        // If file mode, we pass the file info to mock. In real app, we'd parse the PDF/DOC.
        const scanData = inputMode === 'upload' ? { ...formData, fileName: file.name, isFile: true } : formData;
        const data = await simulateATSCheck(scanData);
        setResult(data);
        setIsScanning(false);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
                        <Search className="h-6 w-6 text-pink-500" />
                        ATS Optimizer
                    </h1>
                    <p className="text-slate-400">Validate your resume against tracking systems.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

                {/* Inputs Grid */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                            <div>
                                <CardTitle className="text-white">Resume Input</CardTitle>
                                <CardDescription>Provide your resume content via file or manual entry.</CardDescription>
                            </div>
                            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                                <button
                                    onClick={() => setInputMode('upload')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${inputMode === 'upload' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    <Upload className="h-3.5 w-3.5" /> Upload
                                </button>
                                <button
                                    onClick={() => setInputMode('manual')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${inputMode === 'manual' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                                >
                                    <Keyboard className="h-3.5 w-3.5" /> Manual
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {inputMode === 'upload' ? (
                                <div className="py-4 animate-in fade-in zoom-in-95 duration-300">
                                    <UploadZone onFileSelect={setFile} selectedFile={file} />
                                    <div className="mt-4 p-4 rounded-lg bg-pink-500/5 border border-pink-500/10 text-xs text-slate-400 flex items-start gap-3">
                                        <AlertTriangle className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
                                        <p>Our AI will scan your PDF/DOC for structural integrity, keyword density, and formatting issues compatible with standard Applicant Tracking Systems.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                    <div>
                                        <label className="text-sm font-medium text-slate-300 mb-1 block">Professional Summary</label>
                                        <textarea
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-pink-500 h-24 resize-none"
                                            placeholder="Brief overview of your career..."
                                            value={formData.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-300 mb-1 block">Skills</label>
                                        <textarea
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-pink-500 h-24 resize-none"
                                            placeholder="List your technical and soft skills..."
                                            value={formData.skills}
                                            onChange={(e) => handleChange('skills', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-300 mb-1 block">Experience Details</label>
                                        <textarea
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-pink-500 h-32 resize-none"
                                            placeholder="Paste your work history bullet points..."
                                            value={formData.experience}
                                            onChange={(e) => handleChange('experience', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-300 mb-1 block">Projects / Internship</label>
                                        <textarea
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-pink-500 h-32 resize-none"
                                            placeholder="Details about key projects..."
                                            value={formData.projects}
                                            onChange={(e) => handleChange('projects', e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <Button
                                onClick={handleScan}
                                disabled={isScanning || (inputMode === 'upload' && !file) || (inputMode === 'manual' && !Object.values(formData).some(val => val.trim()))}
                                className="w-full bg-pink-600 hover:bg-pink-700 py-6 mt-4 transition-all"
                            >
                                {isScanning ? (
                                    <span className="flex items-center gap-2"><Search className="h-5 w-5 animate-spin" /> {inputMode === 'upload' ? 'Parsing File...' : 'Scanning Keywords...'}</span>
                                ) : (
                                    <span className="flex items-center gap-2"><PlayCircle className="h-5 w-5" /> Run ATS Scan</span>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Panel */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-8">
                        {!result ? (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-xl p-12 text-center">
                                <BarChart3 className="h-16 w-16 opacity-20 mb-4" />
                                <p className="text-lg">Fill in the sections to generate a compatibility report</p>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                {/* Score Card */}
                                <Card className="bg-slate-900/50 border-slate-800 overflow-hidden relative">
                                    <div className={`absolute top-0 left-0 h-1 transition-all duration-1000 ${result.score > 80 ? 'bg-green-500' : result.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${result.score}%` }} />
                                    <CardContent className="pt-6 text-center">
                                        <div className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-2">ATS Compatibility Score</div>
                                        <div className={`text-6xl font-bold mb-2 ${result.score > 80 ? 'text-green-400' : result.score > 50 ? 'text-amber-400' : 'text-red-400'}`}>
                                            {result.score}/100
                                        </div>
                                        <p className="text-slate-500 text-sm">
                                            {result.score > 80 ? 'Ready for submission!' : 'Needs optimization before applying.'}
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Findings List */}
                                <Card className="bg-slate-900/50 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white text-lg flex items-center gap-2">
                                            <FileText className="h-5 w-5" /> Detailed Analysis
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {result.feedback.map((item, idx) => (
                                            <div key={idx} className={`p-4 rounded-lg border flex items-start gap-4 ${item.status === 'pass' ? 'bg-green-950/20 border-green-500/20' : item.status === 'warning' ? 'bg-amber-950/20 border-amber-500/20' : 'bg-red-950/20 border-red-500/20'}`}>
                                                <div className={`mt-0.5 rounded-full p-1 ${item.status === 'pass' ? 'bg-green-500/20 text-green-400' : item.status === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {item.status === 'pass' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                                                </div>
                                                <div>
                                                    <h4 className={`text-sm font-semibold mb-1 ${item.status === 'pass' ? 'text-green-300' : item.status === 'warning' ? 'text-amber-300' : 'text-red-300'}`}>
                                                        {item.section}
                                                    </h4>
                                                    <p className="text-sm text-slate-400">
                                                        {item.message}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ATSOptimizer;
