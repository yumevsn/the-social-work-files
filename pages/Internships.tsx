import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Internships: React.FC = () => {
    const { isAdmin } = useAdmin();
    const internships = useQuery(api.list.getInternships) || [];
    const deleteOp = useMutation(api.crud.deleteItem);
    const updateOp = useMutation(api.crud.updateInternship);

    const [searchTerm, setSearchTerm] = useState('');
    const [focusFilter, setFocusFilter] = useState('');
    const [editingId, setEditingId] = useState<Id<"internships"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"internships">>>({});

    const filteredInternships = internships.filter(i => {
        const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.organization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFocus = focusFilter ? i.focus === focusFilter : true;
        return matchesSearch && matchesFocus;
    });

    const uniqueFocusAreas = Array.from(new Set(internships.map(i => i.focus))).sort();

    const handleEdit = (internship: Doc<"internships">) => {
        setEditingId(internship._id);
        setEditFormData(internship);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.title) return;
        try {
            await updateOp({
                id: editingId,
                title: editFormData.title!,
                organization: editFormData.organization!,
                duration: editFormData.duration!,
                focus: editFormData.focus!,
                description: editFormData.description,
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update internship.");
        }
    };

    const handleDelete = async (id: Id<"internships">) => {
        if (confirm("Are you sure you want to delete this internship program?")) {
            await deleteOp({ id, table: "internships" });
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Internship Programs</h2>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4 cl-box p-4 bg-gray-50">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-bold mb-1">Search Internship or Organization:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-400 p-2 text-sm bg-white"
                        placeholder="e.g. Clinical, Hospital..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-auto">
                    <label className="block text-sm font-bold mb-1">Filter by Focus Area:</label>
                    <select
                        className="w-full border border-gray-400 p-2 text-sm min-w-[150px] bg-white"
                        value={focusFilter}
                        onChange={(e) => setFocusFilter(e.target.value)}
                    >
                        <option value="">All Focus Areas</option>
                        {uniqueFocusAreas.map(f => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="cl-box p-6 bg-white space-y-4 text-black shadow-sm">
                <p className="font-medium mb-4">Discover formal internship opportunities for social work students.</p>

                {filteredInternships.length > 0 ? (
                    filteredInternships.map((i) => (
                        <div key={i._id} className="border-b border-gray-200 pb-4">
                            {editingId === i._id ? (
                                <div className="space-y-3 bg-blue-50 p-4">
                                    <input className="w-full p-2 border" value={editFormData.title} onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} placeholder="Title" />
                                    <div className="flex gap-2">
                                        <input className="flex-1 p-2 border" value={editFormData.organization} onChange={e => setEditFormData({ ...editFormData, organization: e.target.value })} placeholder="Organization" />
                                        <input className="flex-1 p-2 border" value={editFormData.duration} onChange={e => setEditFormData({ ...editFormData, duration: e.target.value })} placeholder="Duration" />
                                    </div>
                                    <select className="w-full p-2 border" value={editFormData.focus} onChange={e => setEditFormData({ ...editFormData, focus: e.target.value })}>
                                        <option value="Clinical">Clinical</option>
                                        <option value="Macro">Macro</option>
                                        <option value="Policy">Policy</option>
                                        <option value="School">School</option>
                                    </select>
                                    <textarea className="w-full p-2 border h-20" value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} placeholder="Description (optional)" />
                                    <div className="flex justify-end gap-2 text-sm">
                                        <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200 font-bold">Cancel</button>
                                        <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white font-bold">Save</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-blue-800 underline">{i.title}</h3>
                                        {isAdmin && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(i)} className="text-[10px] bg-gray-100 px-2 py-1 border font-bold uppercase hover:bg-gray-200">[ edit ]</button>
                                                <button onClick={() => handleDelete(i._id)} className="text-[10px] bg-red-50 text-red-700 px-2 py-1 border font-bold uppercase hover:bg-red-100">[ delete ]</button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 font-bold">{i.organization} | {i.duration} | Focus: {i.focus}</p>
                                    {i.description && <p className="mt-2 text-sm">{i.description}</p>}
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 font-bold italic">No internship programs found matching your criteria.</div>
                )}
            </div>
        </div>
    );
};
export default Internships;
