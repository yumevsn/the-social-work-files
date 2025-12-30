import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Qualifications: React.FC = () => {
  const { isAdmin } = useAdmin();
  const qualifications = useQuery(api.list.getQualifications) || [];
  const deleteOp = useMutation(api.crud.deleteItem);
  const updateOp = useMutation(api.crud.updateQualification);

  const [editingId, setEditingId] = useState<Id<"qualifications"> | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Doc<"qualifications">>>({});

  const handleEdit = (q: Doc<"qualifications">) => {
    setEditingId(q._id);
    setEditFormData(q);
  };

  const handleSave = async () => {
    if (!editingId || !editFormData.level) return;
    try {
      await updateOp({
        id: editingId,
        level: editFormData.level!,
        duration: editFormData.duration!,
        description: editFormData.description!,
        nextSteps: editFormData.nextSteps!,
      });
      setEditingId(null);
    } catch (err) {
      alert("Failed to update qualification.");
    }
  };

  const handleDelete = async (id: Id<"qualifications">) => {
    if (confirm("Are you sure you want to delete this qualification level?")) {
      await deleteOp({ id, table: "qualifications" });
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Academic Qualifications in Social Work</h2>

      <div className="cl-box p-6 bg-white space-y-4 text-black shadow-sm">
        <p className="font-medium mb-4">Understanding the different levels of social work education.</p>

        {qualifications.length > 0 ? (
          qualifications.map((q) => (
            <div key={q._id} className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0">
              {editingId === q._id ? (
                <div className="space-y-3 bg-gray-50 p-4 border border-gray-200">
                  <input className="w-full p-2 border font-bold" value={editFormData.level} onChange={e => setEditFormData({ ...editFormData, level: e.target.value })} placeholder="Level (e.g. BSW)" />
                  <input className="w-full p-2 border" value={editFormData.duration} onChange={e => setEditFormData({ ...editFormData, duration: e.target.value })} placeholder="Typical Duration" />
                  <textarea className="w-full p-2 border h-20" value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} placeholder="Description" />
                  <textarea className="w-full p-2 border h-20" value={editFormData.nextSteps} onChange={e => setEditFormData({ ...editFormData, nextSteps: e.target.value })} placeholder="Next Steps" />
                  <div className="flex justify-end gap-2 text-xs font-bold uppercase">
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200">Cancel</button>
                    <button onClick={handleSave} className="px-3 py-1 bg-red-900 text-white">Update</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-xl text-red-900 underline uppercase">{q.level}</h3>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(q)} className="text-[10px] bg-gray-100 hover:bg-gray-200 px-2 py-1 border border-gray-300 font-bold uppercase">[ edit ]</button>
                        <button onClick={() => handleDelete(q._id)} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-800 px-2 py-1 border border-red-200 font-bold uppercase">[ del ]</button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-600 mb-2 italic">Typical Duration: {q.duration}</p>
                  <p className="text-base mb-3 leading-relaxed">{q.description}</p>
                  <div className="bg-gray-50 p-3 border-l-4 border-red-900 shadow-inner">
                    <p className="text-xs font-black uppercase text-red-900 mb-1">Next Steps / Trajectory:</p>
                    <p className="text-sm font-medium">{q.nextSteps}</p>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center p-8 text-gray-400 font-bold italic">No qualification data currently listed.</div>
        )}
      </div>
    </div>
  );
};

export default Qualifications;