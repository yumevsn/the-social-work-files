
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';

import { api } from '../convex/_generated/api';
import { useAdmin } from '../context/AdminContext';
import { Doc, Id } from '../convex/_generated/dataModel';

const Research: React.FC = () => {
    const { isAdmin } = useAdmin();
    const researchItems = useQuery(api.list.getResearch) || [];
    const deleteItem = useMutation(api.crud.deleteItem);
    const updateItem = useMutation(api.crud.updateResearch);

    const [editingId, setEditingId] = useState<Id<"research"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"research">>>({});

    const handleEdit = (item: Doc<"research">) => {
        setEditingId(item._id);
        setEditFormData(item);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.title || !editFormData.author) return;
        try {
            await updateItem({
                id: editingId,
                title: editFormData.title,
                author: editFormData.author,
                year: editFormData.year || "2024",
                type: editFormData.type as any || "Research Paper",
                description: editFormData.description || "",
                fileStorageId: editFormData.fileStorageId,
                fileUrl: editFormData.fileUrl,
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update research item.");
        }
    };

    const handleDelete = async (id: Id<"research">) => {
        if (confirm("Delete this research entry?")) {
            await deleteItem({ id, table: "research" });
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2 text-black">Research Archive & Dissertations</h2>
            <div className="grid grid-cols-1 gap-6">
                {researchItems.map((item) => (
                    <div key={item._id} className="cl-box p-6 bg-white shadow-sm hover:shadow-md transition-shadow group relative">
                        {editingId === item._id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input className="w-full p-2 border border-gray-400 font-bold" value={editFormData.title} onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} placeholder="Title" />
                                    <input className="w-full p-2 border border-gray-400 font-bold" value={editFormData.author} onChange={e => setEditFormData({ ...editFormData, author: e.target.value })} placeholder="Author" />
                                    <input className="w-full p-2 border border-gray-400" value={editFormData.year} onChange={e => setEditFormData({ ...editFormData, year: e.target.value })} placeholder="Year" />
                                    <select className="w-full p-2 border border-gray-400" value={editFormData.type} onChange={e => setEditFormData({ ...editFormData, type: e.target.value as any })}>
                                        <option>Research Paper</option>
                                        <option>Dissertation</option>
                                        <option>Policy Brief</option>
                                    </select>
                                </div>
                                <textarea className="w-full p-2 border border-gray-400 h-24" value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} placeholder="Description" />
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setEditingId(null)} className="px-4 py-1 bg-gray-200 font-black uppercase text-xs border border-gray-400">Cancel</button>
                                    <button onClick={handleSave} className="px-4 py-1 bg-black text-white font-black uppercase text-xs">Save</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase bg-red-100 text-red-800 px-2 py-0.5 self-start mb-2">{item.type}</span>
                                        <Link to={`/research/${item._id}`}>
                                            <h3 className="text-xl font-black text-red-900 underline decoration-black/10 hover:text-red-700 transition-colors uppercase tracking-tight line-clamp-2">
                                                {item.title}
                                            </h3>
                                        </Link>

                                        <div className="mt-1 flex gap-3 text-xs font-bold text-gray-500 uppercase italic">
                                            <span>By: {item.author}</span>
                                            <span>Published: {item.year}</span>
                                        </div>
                                    </div>
                                    {isAdmin && (
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(item)} className="text-[10px] font-black border border-gray-300 px-2 py-1 uppercase bg-white">Edit</button>
                                            <button onClick={() => handleDelete(item._id)} className="text-[10px] font-black border border-red-200 bg-red-50 text-red-700 px-2 py-1 uppercase">Del</button>
                                        </div>
                                    )}
                                </div>
                                <p className="mt-4 text-sm font-medium leading-relaxed text-gray-800 italic">
                                    {item.description}
                                </p>
                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <Link to={`/research/${item._id}`} className="cl-link text-[10px] font-black uppercase flex items-center gap-1">
                                        🔍 View Document Analysis
                                    </Link>
                                    {item.fileUrl && (
                                        <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="cl-link text-[10px] font-black uppercase flex items-center gap-1 text-red-800">
                                            📄 Fetch Original
                                        </a>
                                    )}
                                </div>

                            </>
                        )}
                    </div>
                ))}
            </div>
            {researchItems.length === 0 && (
                <div className="cl-box p-12 text-center border-2 border-dashed border-gray-200">
                    <p className="font-black text-gray-400 uppercase tracking-widest italic">Research database is currently offline or empty.</p>
                </div>
            )}
        </div>
    );
};

export default Research;
