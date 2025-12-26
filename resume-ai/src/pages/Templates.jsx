import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, Award, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Templates = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 'student',
            title: 'First Year Student',
            description: 'Simple, clean formats focusing on education, coursework, and soft skills.',
            icon: <GraduationCap className="h-8 w-8 text-blue-400" />,
            color: 'from-blue-500/20 to-cyan-500/20',
            borderColor: 'group-hover:border-blue-500/50'
        },
        {
            id: 'intern',
            title: 'Internship Seeker',
            description: 'Highlighting projects, academic achievements, and eagerness to learn.',
            icon: <User className="h-8 w-8 text-green-400" />,
            color: 'from-green-500/20 to-emerald-500/20',
            borderColor: 'group-hover:border-green-500/50'
        },
        {
            id: 'fresher',
            title: 'Fresh Graduate',
            description: 'Balanced layout showcasing degree, projects, and relevant skills.',
            icon: <Award className="h-8 w-8 text-purple-400" />,
            color: 'from-purple-500/20 to-pink-500/20',
            borderColor: 'group-hover:border-purple-500/50'
        },
        {
            id: 'experienced',
            title: 'Experienced Professional',
            description: 'Detailed sections for work history, leadership, and specialized skills.',
            icon: <Briefcase className="h-8 w-8 text-orange-400" />,
            color: 'from-orange-500/20 to-red-500/20',
            borderColor: 'group-hover:border-orange-500/50'
        }
    ];

    const handleSelect = (categoryId) => {
        // In a real app, we might pass the template ID to the workspace
        navigate(`/workspace?template=${categoryId}`);
    };

    return (
        <div className="min-h-screen container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
                    Select Your Resume Template
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Choose a template category that best matches your career stage. Our AI will help you fill in the details.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {categories.map((cat) => (
                    <Card
                        key={cat.id}
                        className={`bg-slate-900/40 border-slate-800 transition-all duration-300 group cursor-pointer hover:-translate-y-2 ${cat.borderColor}`}
                        onClick={() => handleSelect(cat.id)}
                    >
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} backdrop-blur-sm border border-white/5`}>
                                {cat.icon}
                            </div>
                            <CardTitle className="text-2xl text-white">{cat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-400 mb-6 text-base leading-relaxed">
                                {cat.description}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">3 Variations</span>
                                <Button variant="ghost" className="text-white group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                                    Select Template <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Templates;
