import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';
import { ALL_COUNTRIES } from '../constants';

const RegulatedCountries: React.FC = () => {
  const { isAdmin } = useAdmin();
  const countries = useQuery(api.list.getCountries) || [];
  const deleteCountry = useMutation(api.crud.deleteItem);
  const updateCountry = useMutation(api.crud.updateCountry);

  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [editingId, setEditingId] = useState<Id<"countries"> | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Doc<"countries">>>({});

  const filteredCountries = countries.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.regulators.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = regionFilter ? c.region === regionFilter : true;
    return matchesSearch && matchesRegion;
  });

  const regions = Array.from(new Set(countries.map(c => c.region))).sort();

  const handleEdit = (country: Doc<"countries">) => {
    setEditingId(country._id);
    setEditFormData({ ...country });
  };

  const handleSave = async () => {
    if (!editingId || !editFormData.name) return;
    try {
      await updateCountry({
        id: editingId,
        name: editFormData.name!,
        region: editFormData.region!,
        regulators: editFormData.regulators || []
      });
      setEditingId(null);
    } catch (err) {
      alert("Failed to update country.");
    }
  };

  const handleDelete = async (id: Id<"countries">) => {
    if (confirm("Are you sure you want to delete this country entry?")) {
      await deleteCountry({ id, table: "countries" });
    }
  };

  const updateRegulatorField = (idx: number, field: 'name' | 'url', value: string) => {
    const regs = [...(editFormData.regulators || [])];
    regs[idx] = { ...regs[idx], [field]: value };
    setEditFormData({ ...editFormData, regulators: regs });
  };

  const addRegulator = () => {
    setEditFormData({
      ...editFormData,
      regulators: [...(editFormData.regulators || []), { name: '', url: '' }]
    });
  };

  const removeRegulator = (idx: number) => {
    const regs = (editFormData.regulators || []).filter((_, i) => i !== idx);
    setEditFormData({ ...editFormData, regulators: regs });
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Directory of Social Work Regulators</h2>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 cl-box p-4 bg-gray-50">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-bold mb-1">Search Country or Body:</label>
          <input
            type="text"
            className="w-full border border-gray-400 p-2 text-sm bg-white"
            placeholder="e.g. UK, Social Work England..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-bold mb-1">Filter by Region:</label>
          <select
            className="w-full border border-gray-400 p-2 text-sm min-w-[150px] bg-white"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((c) => (
            <div key={c._id} className="cl-box p-4 group flex flex-col">
              {editingId === c._id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Country Name</label>
                    <select
                      className="w-full p-1 border text-sm bg-white"
                      value={editFormData.name}
                      onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                    >
                      {ALL_COUNTRIES.map(ctry => <option key={ctry} value={ctry}>{ctry}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Region</label>
                    <select className="w-full p-1 border text-sm bg-white" value={editFormData.region} onChange={e => setEditFormData({ ...editFormData, region: e.target.value })}>
                      {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold">Regulators</label>
                    {(editFormData.regulators || []).map((reg, idx) => (
                      <div key={idx} className="bg-gray-100 p-2 border border-gray-300 space-y-1">
                        <input className="w-full p-1 border text-xs" value={reg.name} onChange={e => updateRegulatorField(idx, 'name', e.target.value)} placeholder="Body Name" />
                        <input className="w-full p-1 border text-xs" value={reg.url || ''} onChange={e => updateRegulatorField(idx, 'url', e.target.value)} placeholder="URL (Optional)" />
                        <button onClick={() => removeRegulator(idx)} className="text-[10px] text-red-600 font-bold uppercase underline">Remove</button>
                      </div>
                    ))}
                    <button onClick={addRegulator} className="text-[10px] bg-white border border-gray-400 px-2 py-1 font-bold">+ ADD REGULATOR</button>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                    <button onClick={() => setEditingId(null)} className="text-xs bg-gray-200 px-2 py-1 font-bold">CANCEL</button>
                    <button onClick={handleSave} className="text-xs bg-black text-white px-2 py-1 font-bold">SAVE</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-black uppercase text-gray-500 tracking-tighter">{c.region}</div>
                    {isAdmin && (
                      <div className="flex gap-1">
                        <button onClick={() => handleEdit(c)} className="text-[10px] bg-gray-100 px-1 border font-bold hover:bg-gray-200">EDIT</button>
                        <button onClick={() => handleDelete(c._id)} className="text-[10px] bg-red-50 text-red-700 px-1 border font-bold hover:bg-red-100">DEL</button>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-black mb-3 border-b-2 border-red-900 pb-1 leading-none">{c.name}</h3>
                  <div className="space-y-3 flex-grow">
                    {c.regulators.map((reg, idx) => (
                      <div key={idx} className="pb-2 border-b border-gray-100 last:border-0">
                        <p className="text-sm font-bold text-black mb-1">{reg.name}</p>
                        {reg.url ? (
                          <a
                            href={reg.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-[11px] font-black text-blue-700 hover:text-red-900 transition-colors uppercase tracking-tight"
                          >
                            Visit Portal &raquo;
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-400 italic uppercase">No portal link listed</span>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center font-bold text-gray-500 italic border-2 border-dashed border-gray-200">
            No countries found matching your criteria.
          </div>
        )}
      </div>

      <div className="mt-8 p-6 cl-box bg-yellow-50 border-yellow-200">
        <h4 className="font-black text-lg mb-2 text-black underline">Notice for Practitioners:</h4>
        <p className="text-black font-medium text-base">Regulatory jurisdictions can be fragmented. We aim to list all statutory bodies for each region.</p>
      </div>
    </div>
  );
};

export default RegulatedCountries;