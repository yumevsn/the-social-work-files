
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Id } from '../convex/_generated/dataModel';

const DocumentDetail: React.FC<{ type: 'research' | 'reading' }> = ({ type }) => {
    const { id } = useParams<{ id: string }>();
    const [copySuccess, setCopySuccess] = useState(false);

    // Fetch data based on type
    const researchData = useQuery(api.list.getResearchById, type === 'research' ? { id: id as Id<"research"> } : "skip" as any);
    const readingData = useQuery(api.list.getReadingById, type === 'reading' ? { id: id as Id<"recommendedReadings"> } : "skip" as any);

    const doc = type === 'research' ? researchData : readingData;

    if (doc === undefined) {
        return <div className="p-8 text-center font-black uppercase tracking-widest animate-pulse">Loading Document Analysis...</div>;
    }

    if (doc === null) {
        return (
            <div className="p-8 text-center border-2 border-dashed border-red-200 bg-red-50">
                <h2 className="text-xl font-black text-red-800 uppercase">Archive Error 404</h2>
                <p className="font-bold text-red-600 mt-2">The requested document could not be located in the central repository.</p>
                <Link to={type === 'research' ? '/research' : '/reading'} className="mt-4 inline-block cl-link font-black uppercase underline">Return to Index</Link>
            </div>
        );
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="p-2 space-y-6">
            <div className="flex justify-between items-start border-b-2 border-gray-300 pb-2">
                <Link to={type === 'research' ? '/research' : '/reading'} className="cl-link text-xs font-black uppercase flex items-center gap-1">
                    ← Back to {type === 'research' ? 'Research Archive' : 'Reading List'}
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={handleShare}
                        className="text-[10px] font-black uppercase border-2 border-black px-3 py-1 bg-white hover:bg-gray-100 shadow-[2px_2px_0_0_#000]"
                    >
                        {copySuccess ? 'Link Copied!' : 'Share Document'}
                    </button>
                    {doc.fileUrl && (
                        <a
                            href={doc.fileUrl}
                            download
                            className="text-[10px] font-black uppercase border-2 border-red-800 px-3 py-1 bg-red-800 text-white hover:bg-red-900 shadow-[2px_2px_0_0_#ccc]"
                        >
                            Download Primary File
                        </a>
                    )}
                </div>
            </div>

            <div className="cl-box p-8 bg-white border-2 border-black grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Side */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        {(doc as any).type && (
                            <span className="text-[10px] font-black uppercase bg-red-100 text-red-800 px-2 py-1 mb-2 inline-block">{(doc as any).type}</span>
                        )}
                        <h1 className="text-3xl font-black text-red-900 leading-tight">{(doc as any).title}</h1>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm font-bold text-gray-500 uppercase italic">
                            <span>Authored By: {(doc as any).author}</span>
                            <span>Published: {(doc as any).year}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest border-b border-gray-100 pb-1">Executive Summary / Abstract</h3>
                        <p className="text-lg font-medium leading-relaxed text-gray-900 whitespace-pre-wrap italic">
                            "{(doc as any).description}"
                        </p>
                    </div>

                    {(doc as any).link && (
                        <div className="pt-4">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-2">External Reference</h3>
                            <a href={(doc as any).link} target="_blank" rel="noopener noreferrer" className="cl-link font-black break-all underline decoration-red-800">
                                {(doc as any).link}
                            </a>
                        </div>
                    )}
                </div>

                {/* Interaction Side */}
                <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-8 space-y-6">
                    <div className="bg-gray-50 p-6 border-2 border-dashed border-gray-300">
                        <h3 className="text-xs font-black uppercase mb-4 text-center tracking-widest">Document Portal</h3>
                        {doc.fileUrl ? (
                            <div className="space-y-4">
                                <div className="aspect-[3/4] bg-gray-200 border border-gray-300 flex items-center justify-center relative group">
                                    <span className="text-4xl">📄</span>
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                        <p className="text-[10px] font-black text-center uppercase text-black leading-tight bg-white border border-black p-2 shadow-sm">
                                            Interactive Preview Mode Restricted in this view
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-black text-white font-black py-4 uppercase text-xs tracking-widest shadow-[4px_4px_0_0_#991b1b] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#991b1b] active:translate-y-0 transition-all"
                                >
                                    Launch Document Viewer
                                </a>
                                <p className="text-center text-[10px] font-bold text-gray-400 uppercase">Supported Formats: PDF, DOCX, TXT</p>
                            </div>
                        ) : (
                            <div className="py-12 text-center space-y-2">
                                <span className="text-4xl opacity-20">🚫</span>
                                <p className="text-xs font-black text-gray-400 uppercase italic">Full manuscript not yet available in digital archive</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase text-gray-400">Copyright Notice</h4>
                        <p className="text-[9px] font-bold text-gray-500 leading-tight uppercase">
                            This document is provided for professional educational purposes only. Redistribution for commercial gain is strictly prohibited under terminal guidelines.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentDetail;
