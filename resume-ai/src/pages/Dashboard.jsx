import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Trash2, Clock, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Dashboard = () => {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        // Load resumes from local storage
        const saved = JSON.parse(localStorage.getItem('resume_projects') || '[]');
        setResumes(saved);
    }, []);

    const deleteResume = (id, e) => {
        e.preventDefault(); // Prevent navigation
        if (confirm('Are you sure you want to delete this resume?')) {
            const updated = resumes.filter(r => r.id !== id);
            localStorage.setItem('resume_projects', JSON.stringify(updated));
            setResumes(updated);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Your Resumes</h1>
                    <p className="text-slate-400 mt-1">Manage and improve your resume versions.</p>
                </div>
                <Link to="/workspace">
                    <Button variant="premium">
                        <Plus className="mr-2 h-4 w-4" /> Create New
                    </Button>
                </Link>
            </div>

            {resumes.length === 0 ? (
                <Card className="border-dashed border-slate-800 bg-slate-900/20">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="h-16 w-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                            <FileText className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No resumes yet</h3>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            Upload your resume to get instant AI feedback and improvements.
                        </p>
                        <Link to="/workspace">
                            <Button>Start Improving</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <Link to={`/workspace/${resume.id}`} key={resume.id} className="group">
                            <Card className="h-full hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer overflow-hidden border-slate-800 bg-slate-900/50">
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 w-full" />
                                <CardContent className="pt-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                                            onClick={(e) => deleteResume(resume.id, e)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{resume.title || 'Untitled Resume'}</h3>
                                    <div className="text-sm text-slate-400 mb-4 line-clamp-2">
                                        {resume.originalContent ? resume.originalContent.substring(0, 100) + '...' : 'No content'}
                                    </div>

                                    <div className="flex items-center text-xs text-slate-500 pt-4 border-t border-slate-800 mt-auto">
                                        <Clock className="h-3 w-3 mr-1" />
                                        Last edited {new Date(resume.lastModified).toLocaleDateString()}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
