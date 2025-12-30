import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';

import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Reading: React.FC = () => {
    const { isAdmin } = useAdmin();
    const readings = useQuery(api.list.getReadings) || [];
    const deleteOp = useMutation(api.crud.deleteItem);
    const updateOp = useMutation(api.crud.updateReading);

    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<Id<"recommendedReadings"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"recommendedReadings">>>({});

    const filteredReadings = readings.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (reading: Doc<"recommendedReadings">) => {
        setEditingId(reading._id);
        setEditFormData(reading);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.title) return;
        try {
            await updateOp({
                id: editingId,
                title: editFormData.title!,
                author: editFormData.author!,
                year: editFormData.year!,
                description: editFormData.description!,
                link: editFormData.link,
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update reading profile.");
        }
    };

    const handleDelete = async (id: Id<"recommendedReadings">) => {
        if (confirm("Are you sure you want to delete this book profile?")) {
            await deleteOp({ id, table: "recommendedReadings" });
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Recommended Reading for Social Work</h2>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4 cl-box p-4 bg-gray-50">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-bold mb-1">Search Books by Title or Author:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-400 p-2 text-sm bg-white"
                        placeholder="e.g. Biestek, Ethics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReadings.length > 0 ? (
                    filteredReadings.map(book => (
                        <div key={book._id} className="cl-box p-6 bg-white flex gap-4">
                            <div className="hidden sm:block w-24 h-32 bg-gray-200 border-2 border-gray-300 flex-shrink-0 flex items-center justify-center text-gray-400 font-black text-2xl uppercase">
                                {book.title.charAt(0)}
                            </div>
                            <div className="flex-grow">
                                {editingId === book._id ? (
                                    <div className="space-y-2">
                                        <input className="w-full p-2 border font-bold" value={editFormData.title} onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} placeholder="Title" />
                                        <div className="flex gap-2">
                                            <input className="flex-1 p-2 border" value={editFormData.author} onChange={e => setEditFormData({ ...editFormData, author: e.target.value })} placeholder="Author" />
                                            <input className="w-20 p-2 border" value={editFormData.year} onChange={e => setEditFormData({ ...editFormData, year: e.target.value })} placeholder="Year" />
                                        </div>
                                        <textarea className="w-full p-2 border h-20 text-sm" value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} placeholder="Description" />
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200 font-bold text-xs uppercase">Cancel</button>
                                            <button onClick={handleSave} className="px-3 py-1 bg-black text-white font-bold text-xs uppercase">Save</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start">
                                            <Link to={`/reading/${book._id}`}>
                                                <h3 className="text-xl font-black text-black underline mb-1 hover:text-red-900 transition-colors">{book.title}</h3>
                                            </Link>

                                            {isAdmin && (
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleEdit(book)} className="text-[10px] bg-gray-100 px-1 border font-bold hover:bg-gray-200 uppercase">[ edit ]</button>
                                                    <button onClick={() => handleDelete(book._id)} className="text-[10px] bg-red-50 text-red-700 px-1 border font-bold hover:bg-red-100 uppercase">[ del ]</button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm font-bold text-red-900 mb-2">{book.author} ({book.year})</p>
                                        <p className="text-base text-black font-medium leading-tight">{book.description}</p>
                                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                            <Link to={`/reading/${book._id}`} className="cl-link text-[10px] font-black uppercase underline">
                                                🔍 Full Book Analysis
                                            </Link>
                                            {(book as any).fileUrl && (
                                                <a href={(book as any).fileUrl} target="_blank" rel="noopener noreferrer" className="cl-link text-[10px] font-black uppercase text-red-800">
                                                    📄 Fetch PDF
                                                </a>
                                            )}
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full p-8 text-center font-bold text-gray-500 italic border-2 border-dashed border-gray-200">
                        No books found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reading;
