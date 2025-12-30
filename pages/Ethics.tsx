
import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAdmin } from '../context/AdminContext';
import { Doc, Id } from '../convex/_generated/dataModel';

const Ethics: React.FC = () => {
  const { isAdmin } = useAdmin();
  const ethicsItems = useQuery(api.list.getEthics) || [];
  const deleteItem = useMutation(api.crud.deleteItem);
  const updateItem = useMutation(api.crud.updateEthics);

  const [editingId, setEditingId] = useState<Id<"ethicsGuidelines"> | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Doc<"ethicsGuidelines">>>({});

  const handleEdit = (item: Doc<"ethicsGuidelines">) => {
    setEditingId(item._id);
    setEditFormData(item);
  };

  const handleSave = async () => {
    if (!editingId || !editFormData.title || !editFormData.content) return;
    try {
      await updateItem({
        id: editingId,
        title: editFormData.title,
        content: editFormData.content,
        category: editFormData.category,
      });
      setEditingId(null);
    } catch (err) {
      alert("Failed to update ethics guideline.");
    }
  };

  const handleDelete = async (id: Id<"ethicsGuidelines">) => {
    if (confirm("Delete this guideline?")) {
      await deleteItem({ id, table: "ethicsGuidelines" });
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Code of Ethics & Professional Standards</h2>
      <div className="cl-box p-6 bg-white space-y-8 text-black shadow-sm">
        {ethicsItems.map((item) => (
          <section key={item._id} className="border-l-4 border-red-800 pl-6 group relative">
            {editingId === item._id ? (
              <div className="space-y-3 p-2 bg-gray-50 border border-gray-200">
                <div>
                  <label className="block text-xs font-bold mb-1 uppercase">Title</label>
                  <input
                    className="w-full p-2 border border-gray-400 text-base font-black"
                    value={editFormData.title}
                    onChange={e => setEditFormData({ ...editFormData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 uppercase">Content</label>
                  <textarea
                    className="w-full p-2 border border-gray-400 text-base h-32"
                    value={editFormData.content}
                    onChange={e => setEditFormData({ ...editFormData, content: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingId(null)} className="text-xs font-black bg-gray-200 px-3 py-1 border border-gray-400 uppercase">Cancel</button>
                  <button onClick={handleSave} className="text-xs font-black bg-black text-white px-3 py-1 uppercase">Save Changes</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-black text-red-900 underline">{item.title}</h3>
                  {isAdmin && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(item)} className="text-[10px] font-black bg-gray-100 border border-gray-300 px-2 py-0.5 hover:bg-gray-200 uppercase">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="text-[10px] font-black bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 hover:bg-red-100 uppercase">Delete</button>
                    </div>
                  )}
                </div>
                <p className="font-medium leading-relaxed text-lg">{item.content}</p>
              </>
            )}
          </section>
        ))}
        {ethicsItems.length === 0 && (
          <p className="italic text-gray-500 font-bold">No ethics guidelines listed.</p>
        )}
      </div>
    </div>
  );
};

export default Ethics;