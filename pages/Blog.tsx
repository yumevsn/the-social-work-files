import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Doc, Id } from '../convex/_generated/dataModel';
import { useAdmin } from '../context/AdminContext';

const Blog: React.FC = () => {
  const { isAdmin } = useAdmin();
  const blogPosts = useQuery(api.list.getBlogPosts) || [];
  const deletePost = useMutation(api.crud.deleteItem);
  const updatePost = useMutation(api.crud.updateBlogPost);

  const [selectedPost, setSelectedPost] = useState<Doc<"blogPosts"> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<Id<"blogPosts"> | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Doc<"blogPosts">>>({});

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (post: Doc<"blogPosts">) => {
    setEditingId(post._id);
    setEditFormData(post);
  };

  const handleSave = async () => {
    if (!editingId || !editFormData.title) return;
    try {
      await updatePost({
        id: editingId,
        title: editFormData.title!,
        excerpt: editFormData.excerpt!,
        content: editFormData.content!,
      });
      setEditingId(null);
      if (selectedPost?._id === editingId) {
        setSelectedPost({ ...selectedPost, ...editFormData } as any);
      }
    } catch (err) {
      alert("Failed to update post.");
    }
  };

  const handleDelete = async (id: Id<"blogPosts">) => {
    if (confirm("Are you sure you want to delete this archive entry?")) {
      await deletePost({ id, table: "blogPosts" });
      if (selectedPost?._id === id) setSelectedPost(null);
    }
  };

  const handleShare = async () => {
    if (!selectedPost) return;

    const currentUrl = window.location.href.startsWith('blob:')
      ? 'https://thesocialworkfiles.org'
      : window.location.href;

    const shareData = {
      title: `Social Work Files: ${selectedPost.title}`,
      text: selectedPost.excerpt,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share failed or cancelled:', err);
      }
    } else {
      const subject = encodeURIComponent(shareData.title);
      const body = encodeURIComponent(`${shareData.text}\n\nRead more at: ${shareData.url}`);
      const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

      const link = document.createElement('a');
      link.href = mailtoLink;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-300 pb-2">The Social Work Files: Professional Archives</h2>

      {/* Search Filter */}
      <div className="mb-6 cl-box p-4 bg-gray-50 flex flex-col md:flex-row gap-4 items-center">
        <label className="font-bold whitespace-nowrap">Search Archives:</label>
        <input
          type="text"
          className="w-full border border-gray-400 p-2 text-sm bg-white"
          placeholder="Search by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Post List */}
        <div className="w-full md:w-1/3">
          <div className="cl-box">
            <div className="cl-title">archive entries</div>
            <div className="p-3">
              <ul className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <li key={post._id} className="border-b border-gray-200 pb-2 group">
                      <div className="flex justify-between items-start">
                        <button
                          onClick={() => setSelectedPost(post)}
                          className={`text-left block flex-1 hover:bg-gray-100 p-2 text-base ${selectedPost?._id === post._id ? 'font-black bg-yellow-100 underline' : 'cl-link font-bold'}`}
                        >
                          [{post.date}] {post.title}
                        </button>
                        {isAdmin && (
                          <div className="hidden group-hover:flex gap-1 ml-1">
                            <button onClick={() => handleDelete(post._id)} className="text-[10px] text-red-600 font-bold">[DEL]</button>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-black font-medium mt-1 pl-2">{post.excerpt}</p>
                    </li>
                  ))
                ) : (
                  <p className="p-4 text-center font-bold text-gray-500 italic">No entries found matching your query.</p>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="w-full md:w-2/3">
          {editingId ? (
            <div className="cl-box p-6 bg-white shadow-lg space-y-4">
              <h3 className="font-black text-xl border-b pb-2">Edit Archive Entry</h3>
              <input className="w-full p-3 border font-bold text-xl" value={editFormData.title} onChange={e => setEditFormData({ ...editFormData, title: e.target.value })} placeholder="Title" />
              <textarea className="w-full p-3 border h-20 text-sm" value={editFormData.excerpt} onChange={e => setEditFormData({ ...editFormData, excerpt: e.target.value })} placeholder="Excerpt/Summary" />
              <textarea className="w-full p-3 border h-64 font-serif" value={editFormData.content} onChange={e => setEditFormData({ ...editFormData, content: e.target.value })} placeholder="Full Content" />
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setEditingId(null)} className="px-6 py-2 bg-gray-200 font-black uppercase text-sm">Discard</button>
                <button onClick={handleSave} className="px-6 py-2 bg-red-900 text-white font-black uppercase text-sm">Update Archive</button>
              </div>
            </div>
          ) : selectedPost ? (
            <div className="cl-box p-6 bg-white shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-sm text-black font-black bg-gray-100 border border-gray-300 px-3 py-1 hover:bg-gray-200"
                >
                  &laquo; return to list
                </button>
                <div className="flex gap-2">
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(selectedPost)}
                      className="text-sm font-black bg-yellow-100 text-yellow-900 border border-yellow-400 px-3 py-1 hover:bg-yellow-200"
                    >
                      [ edit entry ]
                    </button>
                  )}
                  <button
                    onClick={handleShare}
                    className="text-sm font-black bg-blue-100 text-blue-900 border border-blue-400 px-3 py-1 hover:bg-blue-200"
                  >
                    [ share this entry ]
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-black text-red-900 mb-2">{selectedPost.title}</h1>
              <div className="text-sm text-black font-black mb-8 italic border-b-4 border-red-50 pb-2">
                PUBLISHED: {selectedPost.date} | SOURCE: Internal Repository | AUTHOR: Administrator
              </div>
              <div className="prose max-w-none text-lg text-black leading-relaxed font-serif space-y-6">
                {selectedPost.content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-12 pt-6 border-t-2 border-gray-100 flex justify-between items-center">
                <span className="text-sm text-black font-black underline cursor-pointer hover:text-blue-700" onClick={handleShare}>direct system link</span>
                <span className="text-sm text-black font-black bg-gray-100 px-2 py-1">CATEGORY: Professional Practice</span>
              </div>
            </div>
          ) : (
            <div className="cl-box p-16 bg-gray-50 text-center border-dashed border-4 flex flex-col items-center justify-center">
              <p className="text-xl text-black font-black mb-2 underline decoration-red-200">NO ENTRY SELECTED</p>
              <p className="text-base text-black font-medium">Please choose a file from the archive on the left to review its contents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;