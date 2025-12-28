import React from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white py-12 border-t border-white/10 relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-8">

                    {/* Links Row */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] sm:text-xs font-medium tracking-wider text-slate-300 uppercase">
                        <a href="#" className="hover:text-white transition-colors">About Us</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">Affiliates</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">Contact Us</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">FAQs</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">Accessibility</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">Cookies and Tracking Policy</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        <span className="text-slate-700">|</span>
                        <a href="#" className="hover:text-white transition-colors">Our AI Resume Builder</a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                            <Facebook className="h-4 w-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </div>

                    {/* Copyright/Brand - Optional but good for ending */}
                    <div className="text-[10px] text-slate-600">
                        © 2024 ResumeAI. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
