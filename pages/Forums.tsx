
import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Forums: React.FC = () => {
    const { isAdmin } = useAdmin();
    const forumPosts = useQuery(api.list.getForumPosts, {}) || [];
    const deletePost = useMutation(api.crud.deleteItem);
    const updatePost = useMutation(api.crud.updateForumPost);
    const createPost = useMutation(api.submissions.createForumPost);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [editingId, setEditingId] = useState<Id<"forumPosts"> | null>(null);
    const [editFormData, setEditFormData] = useState<Partial<Doc<"forumPosts">>>({});

    // New Post Form State
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPostData, setNewPostData] = useState({
        title: '',
        content: '',
        category: 'General Discussion',
        author: ''
    });

    const filteredPosts = forumPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? post.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });

    const uniqueCategories = Array.from(new Set(forumPosts.map(p => p.category))).sort();

    const handleEdit = (post: Doc<"forumPosts">) => {
        setEditingId(post._id);
        setEditFormData(post);
    };

    const handleSave = async () => {
        if (!editingId || !editFormData.title) return;
        try {
            await updatePost({
                id: editingId,
                title: editFormData.title!,
                content: editFormData.content!,
                category: editFormData.category!,
            });
            setEditingId(null);
        } catch (err) {
            alert("Failed to update post.");
        }
    };

    const handleDelete = async (id: Id<"forumPosts">) => {
        if (confirm("Are you sure you want to delete this discussion?")) {
            await deletePost({ id, table: "forumPosts" });
        }
    };

    const handleNewPostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPost({
                title: newPostData.title,
                content: newPostData.content,
                category: newPostData.category,
                author: newPostData.author || "Anonymous",
                postedAt: new Date().toLocaleDateString()
            });
            setShowNewPost(false);
            setNewPostData({ title: '', content: '', category: 'General Discussion', author: '' });
        } catch (err) {
            alert("Failed to create post.");
        }
    };

    return (
        <div className="p-2">
            <div className="flex justify-between items-end mb-6 border-b-2 border-gray-300 pb-2">
                <h2 className="text-2xl font-bold">Professional Forums</h2>
                <button
                    onClick={() => setShowNewPost(!showNewPost)}
                    className="bg-black text-white px-4 py-2 text-sm font-black uppercase hover:bg-gray-800"
                >
                    {showNewPost ? 'Cancel Post' : '+ Start Discussion'}
                </button>
            </div>

            {/* New Post Form */}
            {showNewPost && (
                <form onSubmit={handleNewPostSubmit} className="mb-8 cl-box p-6 bg-white shadow-md border-2 border-black space-y-4 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-black uppercase underline decoration-red-800">Start a New Professional Discussion</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase mb-1">Topic Title</label>
                            <input
                                required
                                className="w-full p-2 border border-gray-400 font-bold"
                                value={newPostData.title}
                                onChange={e => setNewPostData({ ...newPostData, title: e.target.value })}
                                placeholder="What would you like to discuss?"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Category</label>
                            <select
                                className="w-full p-2 border border-gray-400 font-bold"
                                value={newPostData.category}
                                onChange={e => setNewPostData({ ...newPostData, category: e.target.value })}
                            >
                                <option>General Discussion</option>
                                <option>Case Consultation</option>
                                <option>Student Lounge</option>
                                <option>Policy & Legislation</option>
                                <option>Career Advice</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Your Name (Optional)</label>
                            <input
                                className="w-full p-2 border border-gray-400 font-bold"
                                value={newPostData.author}
                                onChange={e => setNewPostData({ ...newPostData, author: e.target.value })}
                                placeholder="Anonymous"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase mb-1">Discussion Content</label>
                            <textarea
                                required
                                className="w-full p-2 border border-gray-400 h-32"
                                value={newPostData.content}
                                onChange={e => setNewPostData({ ...newPostData, content: e.target.value })}
                                placeholder="Describe your topic in detail..."
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-red-800 text-white px-6 py-2 font-black uppercase hover:bg-red-900 shadow-sm">
                            Post to Forum
                        </button>
                    </div>
                </form>
            )}

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4 cl-box p-4 bg-gray-50 border border-gray-300">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-bold mb-1 uppercase">Search Discussions:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-400 p-2 text-sm bg-white"
                        placeholder="Search by keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-auto">
                    <label className="block text-xs font-bold mb-1 uppercase">Filter by Category:</label>
                    <select
                        className="w-full border border-gray-400 p-2 text-sm min-w-[200px] bg-white font-bold"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="cl-box p-6 bg-white space-y-4 text-black shadow-sm">
                <p className="font-bold text-gray-600 italic">Connected Professional Grid: {forumPosts.length} Active Topics</p>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={post._id} className="border border-gray-300 p-5 bg-gray-50 hover:bg-white transition-colors">
                            {editingId === post._id ? (
                                <div className="space-y-3">
                                    <input className="w-full p-2 border border-gray-400 font-bold" value={editFormData.title} onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} placeholder="Title" />
                                    <select className="w-full p-2 border border-gray-400 font-bold" value={editFormData.category} onChange={e => setEditFormData({ ...editFormData, category: e.target.value })}>
                                        <option value="General Discussion">General Discussion</option>
                                        <option value="Case Consultation">Case Consultation</option>
                                        <option value="Student Lounge">Student Lounge</option>
                                        <option value="Policy & Legislation">Policy & Legislation</option>
                                        <option value="Career Advice">Career Advice</option>
                                    </select>
                                    <textarea className="w-full p-2 border border-gray-400 h-24" value={editFormData.content} onChange={e => setEditFormData({ ...editFormData, content: e.target.value })} placeholder="Content" />
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-200 border border-gray-400 font-black uppercase text-xs">Cancel</button>
                                        <button onClick={handleSave} className="px-3 py-1 bg-black text-white font-black uppercase text-xs">Save</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex flex-col">
                                            <h3 className="font-black text-xl text-red-900 underline decoration-black/20 hover:decoration-red-800 transition-all cursor-pointer">{post.title}</h3>
                                            <span className="text-[10px] items-center flex gap-1 font-black text-gray-500 mt-1 uppercase tracking-tighter">
                                                <span className="bg-gray-200 px-1 py-0.5 rounded text-black">{post.category}</span>
                                            </span>
                                        </div>
                                        {isAdmin && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(post)} className="text-[10px] bg-white hover:bg-gray-100 px-2 py-1 border border-gray-300 font-black uppercase">Edit</button>
                                                <button onClick={() => handleDelete(post._id)} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-800 px-2 py-1 border border-red-200 font-black uppercase">Del</button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-base font-medium leading-relaxed mt-3">{post.content}</p>
                                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-600 font-bold">
                                        <span className="italic uppercase">By {post.author}</span>
                                        <span>POSTED: {post.postedAt}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 text-gray-500 font-bold italic border-2 border-dashed border-gray-200 uppercase tracking-widest">
                        Zero discussion matches found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Forums;
