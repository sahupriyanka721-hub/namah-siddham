import React, { useState, useEffect } from 'react';
import { Newspaper, Plus, Edit, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const initialForm = {
    title: '',
    slug: '',
    category: 'Corporate News',
    author: 'Namah Siddham Communications',
    summary: '',
    content: '',
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getNews();
      setNews(res.data.data || []);
    } catch (err) {
      console.error('Failed to load news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (a) => {
    setEditingId(a._id);
    setFormData({
      title: a.title,
      slug: a.slug,
      category: a.category || 'Corporate News',
      author: a.author || 'Namah Siddham Communications',
      summary: a.summary,
      content: a.content,
      isPublished: a.isPublished !== undefined ? a.isPublished : true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    try {
      if (editingId) {
        await adminApi.updateNews(editingId, formData);
      } else {
        await adminApi.createNews(formData);
      }
      setIsModalOpen(false);
      fetchNews();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save news article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete news article '${title}'?`)) {
      try {
        await adminApi.deleteNews(id);
        fetchNews();
      } catch (err) {
        alert('Failed to delete news article.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest-950">
            News & Announcements
          </h1>
          <p className="text-xs text-charcoal-500">
            Publish official corporate releases, expansion notices, and product updates.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="primary" icon={Plus} size="sm">
          Publish News Article
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-charcoal-500">Loading articles...</div>
        ) : news.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sage-50 text-[11px] font-bold text-forest-950 uppercase tracking-wider border-b border-sage-200">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Title & Slug</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100 text-xs">
                {news.map((a) => (
                  <tr key={a._id} className="hover:bg-sage-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-charcoal-500">
                      {new Date(a.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-serif font-bold text-sm text-forest-950">{a.title}</div>
                      <div className="text-[11px] text-charcoal-400 font-mono">/news/{a.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gold-700">{a.category}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          a.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {a.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(a)}
                        className="p-1.5 rounded-lg text-forest-900 hover:bg-forest-50 inline-block font-semibold"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(a._id, a.title)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 inline-block"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-charcoal-400">
            No news articles published yet.
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Article' : 'Publish Article'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-xs text-red-800">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Slug (URL Identifier)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="Leave blank to auto-generate from title"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
              Summary Lead <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
              Article Content <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={6}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <input
              type="checkbox"
              id="newsPublish"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="h-4 w-4 rounded text-forest-900 border-sage-300 focus:ring-forest-600"
            />
            <label htmlFor="newsPublish" className="text-xs font-semibold text-forest-950 cursor-pointer">
              Publish publicly on corporate news page
            </label>
          </div>

          <div className="pt-4 border-t border-sage-200 flex justify-end space-x-3">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={saving}>
              {editingId ? 'Save Changes' : 'Publish Article'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminNews;
