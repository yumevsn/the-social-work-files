
import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAdmin } from '../context/AdminContext';
import { Doc, Id } from '../convex/_generated/dataModel';

const Licensure: React.FC = () => {
    const { isAdmin } = useAdmin();
    const licInfo = useQuery(api.list.getLicensureInfo) || [];
    const deleteItem = useMutation(api.crud.deleteItem);
    const updateItem = useMutation(api.crud.updateLicensureInfo);

    const [editingId, setEditingId] = useState<Id<"licensureInfo"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"licensureInfo">>>({});

    const handleEdit = (item: Doc<"licensureInfo">) => {
        setEditingId(item._id);
        setEditFormData(item);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.category || !editFormData.content) return;
        try {
            await updateItem({
                id: editingId,
                category: editFormData.category,
                content: editFormData.content,
                type: editFormData.type || "paragraph",
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update licensure info.");
        }
    };

    const handleDelete = async (id: Id<"licensureInfo">) => {
        if (confirm("Delete this section?")) {
            await deleteItem({ id, table: "licensureInfo" });
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Licensure Exams (ASWB)</h2>
            <div className="cl-box p-6 bg-white space-y-8 text-black shadow-sm">
                {licInfo.map((item) => (
                    <section key={item._id} className="group relative">
                        {editingId === item._id ? (
                            <div className="space-y-3 p-3 bg-gray-50 border border-gray-200">
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase">Section Title</label>
                                    <input
                                        className="w-full p-2 border border-gray-400 text-base font-black"
                                        value={editFormData.category}
                                        onChange={e => setEditFormData({ ...editFormData, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase">Content</label>
                                    <textarea
                                        className="w-full p-2 border border-gray-400 text-sm h-32 font-medium"
                                        value={editFormData.content}
                                        onChange={e => setEditFormData({ ...editFormData, content: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase">Display Style</label>
                                    <select
                                        className="w-full p-2 border border-gray-400 text-sm font-bold"
                                        value={editFormData.type}
                                        onChange={e => setEditFormData({ ...editFormData, type: e.target.value as any })}
                                    >
                                        <option value="paragraph">Standard Text</option>
                                        <option value="list">Bullet Points</option>
                                        <option value="notice">Warning Box</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setEditingId(null)} className="text-xs font-black bg-gray-200 px-3 py-1 border border-gray-400 uppercase">Cancel</button>
                                    <button onClick={handleSave} className="text-xs font-black bg-black text-white px-3 py-1 uppercase">Save Changes</button>
                                </div>
                            </div>
                        ) : (
                            <div className={item.type === 'notice' ? 'bg-yellow-50 border border-yellow-200 p-4' : ''}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`text-xl font-bold ${item.type === 'notice' ? 'text-orange-800' : 'text-gray-800'}`}>{item.category}</h3>
                                    {isAdmin && (
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(item)} className="text-[10px] font-black bg-gray-100 border border-gray-300 px-2 py-0.5 hover:bg-gray-200 uppercase">Edit</button>
                                            <button onClick={() => handleDelete(item._id)} className="text-[10px] font-black bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 hover:bg-red-100 uppercase">Delete</button>
                                        </div>
                                    )}
                                </div>

                                {item.type === 'list' ? (
                                    <ul className="list-disc pl-5 text-sm space-y-1 font-medium">
                                        {item.content.split('\n').map((line, idx) => (
                                            <li key={idx}>
                                                {line.includes(':') ? (
                                                    <>
                                                        <strong className="font-black">{line.split(':')[0]}:</strong>
                                                        {line.split(':')[1]}
                                                    </>
                                                ) : line}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className={`${item.type === 'notice' ? 'text-xs' : 'text-sm'} leading-relaxed font-medium whitespace-pre-wrap`}>
                                        {item.content}
                                    </p>
                                )}
                            </div>
                        )}
                    </section>
                ))}
                {licInfo.length === 0 && (
                    <p className="italic text-gray-400 font-bold border-2 border-dashed border-gray-100 p-8 text-center uppercase tracking-widest">Database records empty</p>
                )}
            </div>
        </div>
    );
};

export default Licensure;
