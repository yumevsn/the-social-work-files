import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Jobs: React.FC = () => {
  const { isAdmin } = useAdmin();
  const jobs = useQuery(api.list.getJobs) || [];
  const deleteJob = useMutation(api.crud.deleteItem);
  const updateJob = useMutation(api.crud.updateJob);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [editingId, setEditingId] = useState<Id<"jobs"> | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Doc<"jobs">>>({});

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? job.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  const uniqueTypes = Array.from(new Set(jobs.map(j => j.type))).sort();

  const handleEdit = (job: Doc<"jobs">) => {
    setEditingId(job._id);
    setEditFormData(job);
  };

  const handleSave = async () => {
    if (!editingId || !editFormData.title) return;
    try {
      await updateJob({
        id: editingId,
        title: editFormData.title!,
        organization: editFormData.organization!,
        location: editFormData.location!,
        salary: editFormData.salary,
        type: editFormData.type!,
        description: editFormData.description!,
      });
      setEditingId(null);
    } catch (err) {
      alert("Failed to update job.");
    }
  };

  const handleDelete = async (id: Id<"jobs">) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      await deleteJob({ id, table: "jobs" });
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Global Social Work Job Board</h2>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 cl-box p-4 bg-gray-50">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-bold mb-1">Search Job Title or Location:</label>
          <input
            type="text"
            className="w-full border border-gray-400 p-2 text-sm bg-white"
            placeholder="e.g. Clinical, London..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-bold mb-1">Filter by Type:</label>
          <select
            className="w-full border border-gray-400 p-2 text-sm min-w-[150px] bg-white"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {uniqueTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-lg mb-6 italic text-black font-black bg-yellow-50 p-2 inline-block">
        &raquo; Current priority listings for qualified professionals.
      </p>

      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="cl-box p-4 hover:bg-yellow-50 transition-colors">
              {editingId === job._id ? (
                <div className="space-y-3">
                  <input className="w-full p-2 border" value={editFormData.title} onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} placeholder="Title" />
                  <input className="w-full p-2 border" value={editFormData.organization} onChange={e => setEditFormData({ ...editFormData, organization: e.target.value })} placeholder="Organization" />
                  <div className="flex gap-2">
                    <input className="flex-1 p-2 border" value={editFormData.location} onChange={e => setEditFormData({ ...editFormData, location: e.target.value })} placeholder="Location" />
                    <input className="flex-1 p-2 border" value={editFormData.salary} onChange={e => setEditFormData({ ...editFormData, salary: e.target.value })} placeholder="Salary" />
                  </div>
                  <textarea className="w-full p-2 border h-24" value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} placeholder="Description" />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200 font-bold">Cancel</button>
                    <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white font-bold">Save Changes</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <a href="#" className="cl-link text-xl font-black block sm:inline">{job.title}</a>
                    <span className="sm:ml-4 text-black font-bold text-lg">[{job.location}]</span>
                    <span className="ml-2 text-gray-900 font-medium italic border-l border-gray-400 pl-2">{job.organization}</span>
                    <span className="ml-2 text-gray-900 font-medium italic border-l border-gray-400 pl-2">{job.type}</span>

                    {isAdmin && (
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => handleEdit(job)} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 border border-gray-300 font-bold uppercase">[ edit ]</button>
                        <button onClick={() => handleDelete(job._id)} className="text-xs bg-red-50 hover:bg-red-100 text-red-800 px-2 py-1 border border-red-200 font-bold uppercase">[ delete ]</button>
                      </div>
                    )}
                  </div>
                  <div className='flex flex-col items-end mt-4 sm:mt-0'>
                    {job.salary && <span className="text-sm font-bold text-green-700 block">{job.salary}</span>}
                    <span className="text-sm sm:text-base text-black font-black bg-gray-200 px-3 py-1 mt-2 sm:mt-0">Posted: {job.postedAt}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 font-bold">No jobs found matching your criteria.</div>
        )}
      </div>

      <div className="mt-10 p-6 border-2 border-red-100 bg-red-50 text-base text-black font-bold flex items-center shadow-inner">
        <span className="text-red-900 text-3xl mr-4 font-black">!</span>
        <p>IMPORTANT: Identity verification required. Always verify employer credentials and agency registration numbers before submitting sensitive personal data or clinical credentials.</p>
      </div>
    </div>
  );
};

export default Jobs;