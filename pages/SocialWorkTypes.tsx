
import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAdmin } from '../context/AdminContext';
import { Doc, Id } from '../convex/_generated/dataModel';

const SocialWorkTypes: React.FC = () => {
    const { isAdmin } = useAdmin();
    const swTypes = useQuery(api.list.getSocialWorkTypes) || [];
    const deleteItem = useMutation(api.crud.deleteItem);
    const updateItem = useMutation(api.crud.updateSocialWorkType);

    const [editingId, setEditingId] = useState<Id<"socialWorkTypes"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"socialWorkTypes">>>({});

    const handleEdit = (item: Doc<"socialWorkTypes">) => {
        setEditingId(item._id);
        setEditFormData(item);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.title || !editFormData.description) return;
        try {
            await updateItem({
                id: editingId,
                title: editFormData.title,
                description: editFormData.description,
                typicalWorkplaces: editFormData.typicalWorkplaces || "",
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update role description.");
        }
    };

    const handleDelete = async (id: Id<"socialWorkTypes">) => {
        if (confirm("Delete this specialization description?")) {
            await deleteItem({ id, table: "socialWorkTypes" });
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2 text-black truncate">Social Work Specializations & Career Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {swTypes.map((item) => (
                    <div key={item._id} className="cl-box overflow-hidden shadow-sm flex flex-col group">
                        <div className="cl-title flex justify-between items-center py-2 px-4 h-auto min-h-[40px]">
                            {editingId === item._id ? (
                                <input
                                    className="w-full text-sm font-black text-black p-1 border border-gray-400"
                                    value={editFormData.title}
                                    onChange={e => setEditFormData({ ...editFormData, title: e.target.value })}
                                />
                            ) : (
                                <span className="font-black uppercase tracking-tight">{item.title}</span>
                            )}
                            {isAdmin && !editingId && (
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(item)} className="text-[10px] bg-white text-black px-2 py-0.5 font-bold uppercase border border-black/20">Edit</button>
                                    <button onClick={() => handleDelete(item._id)} className="text-[10px] bg-red-900 text-white px-2 py-0.5 font-bold uppercase">Del</button>
                                </div>
                            )}
                        </div>
                        <div className="p-5 flex-1 bg-white space-y-4">
                            {editingId === item._id ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase mb-1">Role Description</label>
                                        <textarea
                                            className="w-full p-2 border border-gray-400 text-sm h-32"
                                            value={editFormData.description}
                                            onChange={e => setEditFormData({ ...editFormData, description: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase mb-1">Typical Workplaces</label>
                                        <input
                                            className="w-full p-2 border border-gray-400 text-sm font-bold"
                                            value={editFormData.typicalWorkplaces}
                                            onChange={e => setEditFormData({ ...editFormData, typicalWorkplaces: e.target.value })}
                                            placeholder="Schools, Hospitals, Private Practice..."
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setEditingId(null)} className="px-4 py-1 bg-gray-200 text-xs font-black uppercase border border-gray-400">Cancel</button>
                                        <button onClick={handleSave} className="px-4 py-1 bg-black text-white text-xs font-black uppercase">Save</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-base font-medium leading-relaxed text-black italic">"{item.description}"</p>
                                    <div className="pt-4 border-t border-gray-100">
                                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Common Work Environments:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.typicalWorkplaces.split(',').map((place, i) => (
                                                <span key={i} className="text-xs bg-gray-100 px-2 py-1 font-bold border border-gray-200 uppercase">{place.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {swTypes.length === 0 && (
                <div className="cl-box p-12 text-center border-2 border-dashed border-gray-200">
                    <p className="font-black text-gray-400 uppercase tracking-widest">No specialized career paths defined in the database.</p>
                </div>
            )}
        </div>
    );
};

export default SocialWorkTypes;
