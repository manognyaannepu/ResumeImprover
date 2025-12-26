import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, PlusCircle } from 'lucide-react';
import { Button } from './ui/Button';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('resume_auth');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white">
            {/* Navigation Bar */}
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-lg">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                ResumeAI
                            </span>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/hub">
                                    <Button variant="ghost" size="sm">
                                        Home
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                                <LogOut className="h-5 w-5 text-gray-400 hover:text-white" />
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
