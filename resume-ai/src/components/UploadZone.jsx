import React, { useCallback } from 'react';
import { UploadCloud, FileType } from 'lucide-react';
import { cn } from '../lib/utils';

const UploadZone = ({ onFileSelect, className, selectedFile }) => {
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={cn(
                "border-2 border-dashed border-slate-700 rounded-xl p-10 text-center hover:bg-slate-800/30 hover:border-blue-500/50 transition-all cursor-pointer group bg-slate-900/40 relative",
                selectedFile ? "border-green-500/50 bg-green-500/5" : "",
                className
            )}
        >
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleChange}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                {selectedFile ? (
                    <div className="animate-in zoom-in duration-300">
                        <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <FileType className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">{selectedFile.name}</h3>
                        <p className="text-sm text-green-400 mb-4 flex items-center gap-2 justify-center">
                            <UploadCloud className="h-4 w-4" /> Ready to analyze
                        </p>
                        <p className="text-xs text-slate-500">Click to change file</p>
                    </div>
                ) : (
                    <>
                        <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                            <UploadCloud className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">Upload your resume</h3>
                        <p className="text-sm text-slate-400 mb-4">Drag & drop or click to browse</p>
                        <div className="flex gap-2 text-xs text-slate-500 uppercase tracking-wider justify-center">
                            <span className="bg-slate-800 px-2 py-1 rounded">TXT</span>
                            <span className="bg-slate-800 px-2 py-1 rounded">PDF</span>
                            <span className="bg-slate-800 px-2 py-1 rounded">DOCX</span>
                        </div>
                    </>
                )}
            </label>
        </div>
    );
};

export default UploadZone;
