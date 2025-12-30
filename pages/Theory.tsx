
import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAdmin } from '../context/AdminContext';
import { Doc, Id } from '../convex/_generated/dataModel';

const Theory: React.FC = () => {
  const { isAdmin } = useAdmin();
  const theoryItems = useQuery(api.list.getTheories) || [];
  const deleteItem = useMutation(api.crud.deleteItem);
  const updateItem = useMutation(api.crud.updateTheory);

  const [editingId, setEditingId] = useState<Id<"theories"> | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Doc<"theories">>>({});

  const handleEdit = (item: Doc<"theories">) => {
    setEditingId(item._id);
    setEditFormData(item);
  };

  const handleSave = async () => {
    if (!editingId || !editFormData.name || !editFormData.description) return;
    try {
      await updateItem({
        id: editingId,
        name: editFormData.name,
        description: editFormData.description,
      });
      setEditingId(null);
    } catch (err) {
      alert("Failed to update theory.");
    }
  };

  const handleDelete = async (id: Id<"theories">) => {
    if (confirm("Delete this theory?")) {
      await deleteItem({ id, table: "theories" });
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Theoretical Frameworks in Social Work</h2>
      <div className="cl-box overflow-hidden shadow-sm">
        <table className="w-full text-base sm:text-lg">
          <thead>
            <tr className="cl-title text-left">
              <th className="p-4 border-r border-gray-300 text-red-900 w-1/3">Theory / Model</th>
              <th className="p-4 text-red-900">Application & Description</th>
            </tr>
          </thead>
          <tbody>
            {theoryItems.map((t, i) => (
              <tr key={t._id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} group`}>
                <td className="p-4 border-r border-gray-300 font-black text-black align-top">
                  {editingId === t._id ? (
                    <input
                      className="w-full p-1 border border-gray-400 text-sm font-black"
                      value={editFormData.name}
                      onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex flex-col gap-2">
                      {t.name}
                      {isAdmin && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(t)} className="text-[10px] font-black bg-gray-100 border border-gray-300 px-1 uppercase">Edit</button>
                          <button onClick={() => handleDelete(t._id)} className="text-[10px] font-black bg-red-50 text-red-700 border border-red-200 px-1 uppercase">Del</button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-4 text-black font-medium leading-relaxed align-top">
                  {editingId === t._id ? (
                    <div className="space-y-2">
                      <textarea
                        className="w-full p-1 border border-gray-400 text-sm h-24"
                        value={editFormData.description}
                        onChange={e => setEditFormData({ ...editFormData, description: e.target.value })}
                      />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingId(null)} className="text-[10px] font-black bg-gray-200 px-2 py-1 border border-gray-400 uppercase">Cancel</button>
                        <button onClick={handleSave} className="text-[10px] font-black bg-black text-white px-2 py-1 border border-black uppercase">Save</button>
                      </div>
                    </div>
                  ) : (
                    t.description
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {theoryItems.length === 0 && (
          <div className="p-8 text-center bg-white italic text-gray-400 font-bold">No theoretical frameworks listed.</div>
        )}
      </div>
    </div>
  );
};

export default Theory;