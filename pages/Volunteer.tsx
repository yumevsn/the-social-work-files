import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Volunteer: React.FC = () => {
    const { isAdmin } = useAdmin();
    const opportunities = useQuery(api.list.getVolunteerOpportunities) || [];
    const deleteOp = useMutation(api.crud.deleteItem);
    const updateOp = useMutation(api.crud.updateVolunteer);

    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<Id<"volunteerOpportunities"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"volunteerOpportunities">>>({});

    const filteredOps = opportunities.filter(op =>
        op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.organization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (op: Doc<"volunteerOpportunities">) => {
        setEditingId(op._id);
        setEditFormData(op);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.title) return;
        try {
            await updateOp({
                id: editingId,
                title: editFormData.title!,
                organization: editFormData.organization!,
                commitment: editFormData.commitment!,
                location: editFormData.location!,
                description: editFormData.description!,
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update opportunity.");
        }
    };

    const handleDelete = async (id: Id<"volunteerOpportunities">) => {
        if (confirm("Are you sure you want to delete this opportunity?")) {
            await deleteOp({ id, table: "volunteerOpportunities" });
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Volunteer Opportunities</h2>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4 cl-box p-4 bg-gray-50">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-bold mb-1">Search Opportunities:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-400 p-2 text-sm bg-white"
                        placeholder="e.g. Mentor, Hotline..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="cl-box p-6 bg-white space-y-4 text-black shadow-sm">
                <p className="font-medium mb-4">Find volunteer roles to build experience and give back to the community.</p>

                {filteredOps.length > 0 ? (
                    filteredOps.map((op) => (
                        <div key={op._id} className="border-b border-gray-200 pb-4">
                            {editingId === op._id ? (
                                <div className="space-y-3 bg-blue-50 p-4">
                                    <input className="w-full p-2 border" value={editFormData.title} onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} placeholder="Opportunity Title" />
                                    <div className="flex gap-2">
                                        <input className="flex-1 p-2 border" value={editFormData.organization} onChange={e => setEditFormData({ ...editFormData, organization: e.target.value })} placeholder="Organization" />
                                        <input className="flex-1 p-2 border" value={editFormData.commitment} onChange={e => setEditFormData({ ...editFormData, commitment: e.target.value })} placeholder="Commitment (e.g. 4 hrs/week)" />
                                    </div>
                                    <input className="w-full p-2 border" value={editFormData.location} onChange={e => setEditFormData({ ...editFormData, location: e.target.value })} placeholder="Location" />
                                    <textarea className="w-full p-2 border h-20" value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} placeholder="Description" />
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200 font-bold">Cancel</button>
                                        <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white font-bold">Save</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-blue-800">{op.title}</h3>
                                        {isAdmin && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(op)} className="text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-1 border border-gray-300 font-bold uppercase">Edit</button>
                                                <button onClick={() => handleDelete(op._id)} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-800 px-2 py-1 border border-red-200 font-bold uppercase">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 font-bold">{op.organization} | {op.location} | {op.commitment}</p>
                                    <p className="mt-2 text-sm">{op.description}</p>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 font-bold italic">No opportunities found matching your criteria.</div>
                )}
            </div>
        </div>
    );
};

export default Volunteer;
