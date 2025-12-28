import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Upload, CheckCircle2, AlertCircle, BarChart3, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { simulateImpactScore } from '../services/aiMock';
import UploadZone from '../components/UploadZone.jsx';

const ImpactScorer = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        // Simulate sending file content
        const result = await simulateImpactScore({ fileName: file.name });
        setAnalysis(result);
        setIsAnalyzing(false);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    const getScoreBg = (score) => {
        if (score >= 80) return "bg-green-500/10 border-green-500/20";
        if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
        return "bg-red-500/10 border-red-500/20";
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
                        <BarChart3 className="h-6 w-6 text-indigo-500" />
                        Resume Impact Scorer
                    </h1>
                    <p className="text-slate-400">Get a comprehensive score on your resume's effectiveness.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Upload Section */}
                {!analysis && (
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-white">Upload Resume</CardTitle>
                            <CardDescription>Upload your PDF or Word document to get started.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <UploadZone onFileSelect={setFile} selectedFile={file} />

                            <Button
                                onClick={handleAnalyze}
                                disabled={!file || isAnalyzing}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg"
                            >
                                {isAnalyzing ? (
                                    <span className="flex items-center gap-2"><Zap className="h-5 w-5 animate-spin" /> Analyzing 30+ metrics...</span>
                                ) : (
                                    <span className="flex items-center gap-2"><Zap className="h-5 w-5" /> Calculate Impact Score</span>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Analysis Results */}
                {analysis && (
                    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                        {/* Overall Score */}
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
                            <div className="relative z-10 text-center">
                                <h2 className="text-slate-400 uppercase tracking-widest text-sm font-semibold mb-4">Overall Impact Score</h2>
                                <div className={`text-8xl font-bold mb-2 ${getScoreColor(analysis.overallScore)}`}>
                                    {analysis.overallScore}
                                </div>
                                <p className="text-slate-500">out of 100</p>
                            </div>
                        </div>

                        {/* Detail Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Vocabulary */}
                            <Card className={`border ${getScoreBg(analysis.breakdown.vocabulary.score)} bg-transparent`}>
                                <CardHeader>
                                    <CardTitle className="text-white flex justify-between items-center">
                                        Vocabulary
                                        <span className={`text-xl font-bold ${getScoreColor(analysis.breakdown.vocabulary.score)}`}>
                                            {analysis.breakdown.vocabulary.score}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-300 text-sm mb-4">{analysis.breakdown.vocabulary.feedback}</p>
                                    <ul className="space-y-2">
                                        {analysis.breakdown.vocabulary.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Keywords */}
                            <Card className={`border ${getScoreBg(analysis.breakdown.keywords.score)} bg-transparent`}>
                                <CardHeader>
                                    <CardTitle className="text-white flex justify-between items-center">
                                        Keywords
                                        <span className={`text-xl font-bold ${getScoreColor(analysis.breakdown.keywords.score)}`}>
                                            {analysis.breakdown.keywords.score}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-300 text-sm mb-4">{analysis.breakdown.keywords.feedback}</p>
                                    <ul className="space-y-2">
                                        {analysis.breakdown.keywords.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                                                <AlertCircle className="h-3.5 w-3.5 text-slate-500 mt-0.5" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Formatting */}
                            <Card className={`border ${getScoreBg(analysis.breakdown.formatting.score)} bg-transparent`}>
                                <CardHeader>
                                    <CardTitle className="text-white flex justify-between items-center">
                                        Formatting
                                        <span className={`text-xl font-bold ${getScoreColor(analysis.breakdown.formatting.score)}`}>
                                            {analysis.breakdown.formatting.score}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-300 text-sm mb-4">{analysis.breakdown.formatting.feedback}</p>
                                    <ul className="space-y-2">
                                        {analysis.breakdown.formatting.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-slate-500 mt-0.5" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button variant="outline" onClick={() => setAnalysis(null)} className="text-slate-400 border-slate-700 hover:text-white">
                                Analyze Another Resume
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImpactScorer;
