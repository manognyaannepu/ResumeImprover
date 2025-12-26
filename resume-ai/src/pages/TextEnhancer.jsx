import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wand2, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { simulateAIImprovement } from '../services/aiMock';

const TextEnhancer = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const [context, setContext] = useState('resume');
    const [improvedText, setImprovedText] = useState('');
    const [isImproving, setIsImproving] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleImprove = async () => {
        if (!inputText.trim()) return;

        setIsImproving(true);
        // We reuse the improved AI service here
        const result = await simulateAIImprovement(inputText, context);
        setImprovedText(result.improvedText);
        setIsImproving(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(improvedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                        <Sparkles className="h-6 w-6 text-purple-500" />
                        Text Enhancer
                    </h1>
                    <p className="text-slate-400">Polish your professional writing instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Input Section */}
                <Card className="bg-slate-900/50 border-slate-800 flex flex-col h-[600px]">
                    <CardHeader>
                        <CardTitle className="text-lg text-slate-300">Original Text</CardTitle>
                        <div className="flex gap-2 mt-2">
                            <span className="text-sm text-slate-500 self-center">Context:</span>
                            <select
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-sm text-slate-300 focus:outline-none focus:border-purple-500"
                            >
                                <option value="resume">Resume Bullet Point</option>
                                <option value="cover_letter">Cover Letter Paragraph</option>
                                <option value="email">Professional Email</option>
                                <option value="bio">LinkedIn Bio</option>
                            </select>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                        <textarea
                            className="flex-1 w-full bg-slate-950/50 p-4 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 text-slate-300 font-mono text-sm leading-relaxed"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={`Paste your text here... \n\nExample: "I helped the marketing team manage ads and got good reach."`}
                        />
                        <Button
                            onClick={handleImprove}
                            disabled={!inputText.trim() || isImproving}
                            className="bg-purple-600 hover:bg-purple-700 w-full py-6 text-lg font-semibold"
                        >
                            {isImproving ? (
                                <span className="flex items-center gap-2">
                                    <Wand2 className="h-5 w-5 animate-spin" /> Enhancing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5" /> Enhance Text
                                </span>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Output Section */}
                <Card className={`bg-slate-900/50 border-slate-800 flex flex-col h-[600px] transition-all duration-500 ${improvedText ? 'border-purple-500/30' : ''}`}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg text-purple-400">Polished Version</CardTitle>
                        {improvedText && (
                            <Button variant="ghost" size="sm" onClick={handleCopy} className={copied ? "text-green-400" : "text-slate-400"}>
                                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                {copied ? "Copied" : "Copy"}
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="flex-1 flex">
                        {improvedText ? (
                            <textarea
                                className="flex-1 w-full bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg resize-none focus:outline-none text-purple-100 font-mono text-base leading-relaxed animate-in fade-in zoom-in duration-300"
                                value={improvedText}
                                readOnly
                            />
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 gap-4 border-2 border-dashed border-slate-800/50 rounded-lg">
                                <Wand2 className="h-12 w-12 opacity-20" />
                                <p>Your enhanced text will appear here</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TextEnhancer;
