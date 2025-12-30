import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Salary: React.FC = () => {
    const { isAdmin } = useAdmin();
    const salaryData = useQuery(api.list.getSalaryGuides) || [];
    const deleteOp = useMutation(api.crud.deleteItem);
    const updateOp = useMutation(api.crud.updateSalaryGuide);

    const [experienceFilter, setExperienceFilter] = useState('');
    const [editingId, setEditingId] = useState<Id<"salaryGuides"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"salaryGuides">>>({});

    const filteredData = experienceFilter
        ? salaryData.filter(item => item.experienceLevel === experienceFilter)
        : salaryData;

    const experienceLevels = Array.from(new Set(salaryData.map(item => item.experienceLevel))).sort();

    const handleEdit = (item: Doc<"salaryGuides">) => {
        setEditingId(item._id);
        setEditFormData(item);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.role) return;
        try {
            await updateOp({
                id: editingId,
                role: editFormData.role!,
                experienceLevel: editFormData.experienceLevel!,
                range: editFormData.range!,
                category: editFormData.category,
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update salary guide.");
        }
    };

    const handleDelete = async (id: Id<"salaryGuides">) => {
        if (confirm("Are you sure you want to delete this salary entry?")) {
            await deleteOp({ id, table: "salaryGuides" });
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Global Salary Guide</h2>

            {/* Filters */}
            <div className="mb-6 cl-box p-4 bg-gray-50">
                <label className="block text-sm font-bold mb-1">Filter by Experience Level:</label>
                <select
                    className="w-full sm:w-auto border border-gray-400 p-2 text-sm min-w-[200px] bg-white"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                >
                    <option value="">All Experience Levels</option>
                    {experienceLevels.map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                </select>
            </div>

            <div className="cl-box overflow-x-auto">
                <table className="w-full text-base">
                    <thead>
                        <tr className="cl-title text-left">
                            <th className="p-4 border-r border-gray-300">Role</th>
                            <th className="p-4 border-r border-gray-300">Experience</th>
                            <th className="p-4 border-r border-gray-300">Expected Range</th>
                            {isAdmin && <th className="p-4">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item._id} className="border-b border-gray-200">
                                    {editingId === item._id ? (
                                        <td colSpan={isAdmin ? 4 : 3} className="p-4 bg-blue-50">
                                            <div className="flex gap-2 flex-wrap">
                                                <input className="flex-1 min-w-[200px] p-2 border" value={editFormData.role} onChange={e => setEditFormData({ ...editFormData, role: e.target.value })} placeholder="Role" />
                                                <input className="w-40 p-2 border" value={editFormData.experienceLevel} onChange={e => setEditFormData({ ...editFormData, experienceLevel: e.target.value })} placeholder="Experience Level" />
                                                <input className="w-40 p-2 border" value={editFormData.range} onChange={e => setEditFormData({ ...editFormData, range: e.target.value })} placeholder="Salary Range" />
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200 font-bold">Cancel</button>
                                                    <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white font-bold">Save</button>
                                                </div>
                                            </div>
                                        </td>
                                    ) : (
                                        <>
                                            <td className="p-4 border-r border-gray-300 font-bold text-black">{item.role}</td>
                                            <td className="p-4 border-r border-gray-300 text-gray-700 font-medium italic">{item.experienceLevel}</td>
                                            <td className="p-4 border-r border-gray-300 text-black font-black">{item.range}</td>
                                            {isAdmin && (
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleEdit(item)} className="text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-1 border border-gray-300 font-bold uppercase cursor-pointer">[ edit ]</button>
                                                        <button onClick={() => handleDelete(item._id)} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-800 px-2 py-1 border border-red-200 font-bold uppercase cursor-pointer">[ del ]</button>
                                                    </div>
                                                </td>
                                            )}
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={isAdmin ? 4 : 3} className="p-6 text-center text-gray-500 font-bold">No salary data available.</td></tr>
                        )}
                    </tbody>
                </table>
                <div className="p-3 text-xs text-gray-500 bg-gray-50 border-t border-gray-200 italic font-medium">
                    * Figures are estimates based on national averages and may vary significantly by location and sub-sector.
                </div>
            </div>
        </div>
    );
};

export default Salary;
