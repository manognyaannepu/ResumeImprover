import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Save, Download, RefreshCw, ArrowLeft, Wand2, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import UploadZone from '../components/UploadZone';
import { simulateAIImprovement } from '../services/aiMock';
import { templates } from '../data/templates';

const Workspace = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [project, setProject] = useState({
        id: Date.now().toString(),
        title: 'Untitled Resume',
        originalContent: '',
        improvedContent: '',
        feedback: [],
        lastModified: Date.now()
    });

    const [isImproving, setIsImproving] = useState(false);
    const [activeTab, setActiveTab] = useState('both'); // 'original', 'improved', 'both'

    useEffect(() => {
        // Load from ID if present (Saved project)
        if (id) {
            const saved = JSON.parse(localStorage.getItem('resume_projects') || '[]');
            const found = saved.find(p => p.id === id);
            if (found) {
                setProject(found);
                return;
            }
        }

        // Load from Template if query param exists (New project)
        const templateId = searchParams.get('template');
        if (templateId && templates[templateId]) {
            setProject(prev => ({
                ...prev,
                title: templates[templateId].title,
                originalContent: templates[templateId].content
            }));
        }
    }, [id, searchParams]);

    const handleFileSelect = (file) => {
        // Mock file reading
        const reader = new FileReader();
        reader.onload = (e) => {
            setProject(prev => ({
                ...prev,
                title: file.name.replace(/\.[^/.]+$/, ""),
                originalContent: e.target.result || "Sample resume content extracted from file..."
            }));
        };
        reader.readAsText(file);
    };

    const handleImprove = async () => {
        if (!project.originalContent) return;

        setIsImproving(true);
        const result = await simulateAIImprovement(project.originalContent);

        setProject(prev => ({
            ...prev,
            improvedContent: result.improvedText,
            feedback: result.feedback
        }));
        setIsImproving(false);
    };

    const handleSave = () => {
        const saved = JSON.parse(localStorage.getItem('resume_projects') || '[]');
        const existingIndex = saved.findIndex(p => p.id === project.id);

        const updatedProject = { ...project, lastModified: Date.now() };

        if (existingIndex >= 0) {
            saved[existingIndex] = updatedProject;
        } else {
            saved.push(updatedProject);
        }

        localStorage.setItem('resume_projects', JSON.stringify(saved));
        alert('Project saved successfully!');
        if (!id) navigate(`/workspace/${project.id}`);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([project.improvedContent || project.originalContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${project.title}_improved.txt`;
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <input
                            value={project.title}
                            onChange={(e) => setProject(p => ({ ...p, title: e.target.value }))}
                            className="bg-transparent text-lg font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-2"
                        />
                        <p className="text-xs text-slate-400 px-2">Last saved: {new Date(project.lastModified).toLocaleTimeString()}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {project.improvedContent && (
                        <Button variant="outline" onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                    )}
                    <Button onClick={handleSave} variant="secondary">
                        <Save className="mr-2 h-4 w-4" /> Save
                    </Button>
                    <Button
                        onClick={handleImprove}
                        disabled={!project.originalContent || isImproving}
                        variant="premium"
                        className="min-w-[140px]"
                    >
                        {isImproving ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Wand2 className="mr-2 h-4 w-4" />
                        )}
                        {project.improvedContent ? 'Regenerate' : 'AI Improve'}
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">

                {/* Editor Zone */}
                <div className={`col-span-12 ${project.feedback.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'} flex flex-col gap-4 min-h-0`}>
                    {!project.originalContent ? (
                        <div className="flex-1 flex items-center justify-center bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
                            <UploadZone onFileSelect={handleFileSelect} className="w-full max-w-xl mx-auto border-0 bg-transparent hover:bg-transparent" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 h-full min-h-0">
                            {/* Original */}
                            <Card className="flex flex-col h-full overflow-hidden bg-slate-950/50 border-slate-800">
                                <div className="p-3 border-b border-slate-800 bg-slate-900/50 font-medium text-slate-400 flex justify-between">
                                    <span>Original Content</span>
                                </div>
                                <textarea
                                    className="flex-1 w-full bg-transparent p-4 resize-none focus:outline-none text-slate-300 font-mono text-sm leading-relaxed"
                                    value={project.originalContent}
                                    onChange={(e) => setProject(p => ({ ...p, originalContent: e.target.value }))}
                                    placeholder="Paste your resume content here..."
                                />
                            </Card>

                            {/* Improved */}
                            <Card className={`flex flex-col h-full overflow-hidden border-slate-800 ${project.improvedContent ? 'bg-indigo-950/10 border-indigo-500/20' : 'bg-slate-950/50'}`}>
                                <div className="p-3 border-b border-slate-800 bg-slate-900/50 font-medium text-indigo-400 flex justify-between items-center">
                                    <span>AI Enhanced Version</span>
                                    {project.improvedContent && <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">Optimized</span>}
                                </div>
                                {isImproving ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                                        <Wand2 className="h-8 w-8 animate-bounce mb-4 text-indigo-500" />
                                        <p>Analyzing and enhancing...</p>
                                    </div>
                                ) : (
                                    <textarea
                                        className="flex-1 w-full bg-transparent p-4 resize-none focus:outline-none text-indigo-100 font-mono text-sm leading-relaxed"
                                        value={project.improvedContent}
                                        readOnly
                                        placeholder="AI improvements will appear here..."
                                    />
                                )}
                            </Card>
                        </div>
                    )}
                </div>

                {/* Feedback Panel */}
                {project.feedback.length > 0 && (
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 animate-in slide-in-from-right-10 duration-500">
                        <Card className="h-full bg-slate-900/50 border-slate-800 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-slate-800 bg-slate-900/80 font-semibold text-white">
                                AI Analysis
                            </div>
                            <div className="p-4 space-y-4 overflow-y-auto flex-1">
                                {project.feedback.map((item, idx) => (
                                    <div key={idx} className={`p-3 rounded-lg text-sm border ${item.type === 'strength' ? 'bg-green-500/10 border-green-500/20 text-green-200' :
                                        item.type === 'improvement' ? 'bg-blue-500/10 border-blue-500/20 text-blue-200' :
                                            'bg-yellow-500/10 border-yellow-500/20 text-yellow-200'
                                        }`}>
                                        <div className="font-semibold mb-1 capitalize text-xs opacity-70">{item.type}</div>
                                        {item.message}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Workspace;
