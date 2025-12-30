import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Events: React.FC = () => {
    const { isAdmin } = useAdmin();
    const events = useQuery(api.list.getEvents) || [];
    const deleteEvent = useMutation(api.crud.deleteItem);
    const updateEvent = useMutation(api.crud.updateEvent);

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [editingId, setEditingId] = useState<Id<"events"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"events">>>({});

    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter ? e.type === typeFilter : true;
        return matchesSearch && matchesType;
    });

    const handleEdit = (event: Doc<"events">) => {
        setEditingId(event._id);
        setEditFormData(event);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.title) return;
        try {
            await updateEvent({
                id: editingId,
                title: editFormData.title!,
                date: editFormData.date!,
                location: editFormData.location!,
                description: editFormData.description!,
                type: editFormData.type as "webinar" | "in-person",
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update event.");
        }
    };

    const handleDelete = async (id: Id<"events">) => {
        if (confirm("Are you sure you want to delete this event?")) {
            await deleteEvent({ id, table: "events" });
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">Events & Webinars</h2>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4 cl-box p-4 bg-gray-50">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-bold mb-1">Search Event:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-400 p-2 text-sm bg-white"
                        placeholder="e.g. Trauma, Conference..."
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
                        <option value="webinar">Webinar</option>
                        <option value="in-person">In-Person</option>
                    </select>
                </div>
            </div>

            <div className="cl-box p-0 bg-white text-black shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="p-3 font-bold">Date</th>
                            <th className="p-3 font-bold">Event</th>
                            <th className="p-3 font-bold">Location</th>
                            <th className="p-3 font-bold">Type</th>
                            {isAdmin && <th className="p-3 font-bold">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((evt) => (
                                <React.Fragment key={evt._id}>
                                    {editingId === evt._id ? (
                                        <tr>
                                            <td colSpan={isAdmin ? 5 : 4} className="p-4 bg-blue-50">
                                                <div className="space-y-3">
                                                    <div className="flex gap-2">
                                                        <input className="flex-1 p-2 border" value={editFormData.title} onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} placeholder="Event Title" />
                                                        <input className="w-40 p-2 border" value={editFormData.date} onChange={e => setEditFormData({ ...editFormData, date: e.target.value })} placeholder="Date" />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <input className="flex-1 p-2 border" value={editFormData.location} onChange={e => setEditFormData({ ...editFormData, location: e.target.value })} placeholder="Location" />
                                                        <select className="w-40 p-2 border" value={editFormData.type} onChange={e => setEditFormData({ ...editFormData, type: e.target.value as any })}>
                                                            <option value="webinar">Webinar</option>
                                                            <option value="in-person">In-Person</option>
                                                        </select>
                                                    </div>
                                                    <textarea className="w-full p-2 border h-20" value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} placeholder="Description" />
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200 font-bold">Cancel</button>
                                                        <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white font-bold">Save</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr className="border-b border-gray-200 hover:bg-yellow-50">
                                            <td className="p-3 text-sm whitespace-nowrap">{evt.date}</td>
                                            <td className="p-3">
                                                <div className="font-bold text-blue-800 hover:underline cursor-pointer">{evt.title}</div>
                                                <div className="text-xs text-gray-600">{evt.description}</div>
                                            </td>
                                            <td className="p-3 text-sm">{evt.location}</td>
                                            <td className="p-3 text-sm italic">{evt.type}</td>
                                            {isAdmin && (
                                                <td className="p-3 text-sm">
                                                    <div className="flex gap-1 flex-col sm:flex-row">
                                                        <button onClick={() => handleEdit(evt)} className="text-[10px] bg-gray-100 hover:bg-gray-200 px-1 py-0.5 border border-gray-300 font-bold uppercase">Edit</button>
                                                        <button onClick={() => handleDelete(evt._id)} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-800 px-1 py-0.5 border border-red-200 font-bold uppercase">Del</button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr><td colSpan={isAdmin ? 5 : 4} className="p-4 text-center font-bold text-gray-500">No events found matching your criteria.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Events;
