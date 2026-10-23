import React, { useState, useEffect } from 'react';
import {
  Code2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowUpDown,
  X,
  Globe,
  Smartphone,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notification, setNotification] = useState(null);

  const initialForm = {
    title: '',
    slug: '',
    icon: 'Globe',
    shortDescription: '',
    detailedDescription: '',
    keyFeaturesText: '',
    deliverablesText: '',
    status: 'Published',
    isFeatured: true,
    displayOrder: 0,
    seoTitle: '',
    seoDescription: '',
  };

  const [form, setForm] = useState(initialForm);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getServices({ status: statusFilter, search: searchTerm });
      setServices(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadServices();
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title || '',
      slug: service.slug || '',
      icon: service.icon || 'Globe',
      shortDescription: service.shortDescription || '',
      detailedDescription: service.detailedDescription || '',
      keyFeaturesText: (service.keyFeatures || []).join('\n'),
      deliverablesText: (service.deliverables || []).join('\n'),
      status: service.status || 'Published',
      isFeatured: service.isFeatured ?? true,
      displayOrder: service.displayOrder || 0,
      seoTitle: service.seoTitle || '',
      seoDescription: service.seoDescription || '',
    });
    setModalOpen(true);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!editingId) {
      setForm((prev) => ({
        ...prev,
        title: val,
        slug: generateSlug(val),
      }));
    } else {
      setForm((prev) => ({ ...prev, title: val }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.shortDescription || !form.detailedDescription) {
      alert('Please fill in title, slug, short description, and detailed description.');
      return;
    }

    const payload = {
      ...form,
      keyFeatures: form.keyFeaturesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      deliverables: form.deliverablesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await adminApi.updateService(editingId, payload);
        setNotification({ type: 'success', message: 'Service updated successfully.' });
      } else {
        await adminApi.createService(payload);
        setNotification({ type: 'success', message: 'New IT service created.' });
      }
      setModalOpen(false);
      loadServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save service.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.deleteService(id);
      setDeleteConfirmId(null);
      setNotification({ type: 'success', message: 'Service deleted.' });
      loadServices();
    } catch (err) {
      alert('Failed to delete service.');
    }
  };

  const toggleStatus = async (service) => {
    const newStatus = service.status === 'Published' ? 'Draft' : 'Published';
    try {
      await adminApi.updateService(service._id, { status: newStatus });
      loadServices();
    } catch (err) {
      alert('Failed to toggle status.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl text-navy-900 flex items-center">
            <Code2 className="w-6 h-6 mr-2 text-royal-600" />
            <span>IT Services Management</span>
          </h1>
          <p className="text-xs text-surface-500 mt-1">
            Manage Vertical 1 IT services, capabilities, deliverables, and public showcase.
          </p>
        </div>

        <Button
          onClick={openCreateModal}
          variant="primary"
          icon={Plus}
          className="text-xs font-bold px-4 py-2.5 rounded-xl bg-royal-500 hover:bg-royal-600 text-white"
        >
          Add New IT Service
        </Button>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs font-medium">
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-emerald-700 font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-surface-200 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearch} className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
          />
        </form>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-surface-400 font-bold uppercase font-mono">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-surface-200 text-xs font-medium bg-surface-50 text-navy-900 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 text-surface-500 uppercase tracking-wider font-mono border-b border-surface-200">
              <tr>
                <th className="py-3.5 px-6">Service Name</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Icon</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-surface-400">
                    Loading service records...
                  </td>
                </tr>
              ) : services.length > 0 ? (
                services.map((s) => (
                  <tr key={s._id} className="hover:bg-surface-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-navy-900">
                      <div>{s.title}</div>
                      <div className="text-[11px] text-surface-400 font-normal line-clamp-1">
                        {s.shortDescription}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-royal-600">{s.slug}</td>
                    <td className="py-4 px-4 text-surface-500 font-mono">{s.icon || 'Globe'}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleStatus(s)}
                        title="Click to toggle status"
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                          s.status === 'Published'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {s.status}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      {s.isFeatured ? (
                        <span className="text-[10px] font-bold text-royal-600">Yes</span>
                      ) : (
                        <span className="text-[10px] text-surface-400">No</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <a
                        href={`/services/${s.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-surface-400 hover:text-navy-900 inline-block"
                        title="Preview Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 rounded-lg text-royal-600 hover:bg-royal-50 inline-block"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(s._id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 inline-block"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-surface-400">
                    No services found. Click "Add New IT Service" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-soft-xl text-center">
            <h3 className="font-serif font-bold text-lg text-navy-900">Confirm Deletion</h3>
            <p className="text-xs text-surface-500">
              Are you sure you want to permanently remove this IT service? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-surface-200 text-surface-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 border border-surface-200 shadow-soft-xl">
            <div className="flex items-center justify-between border-b border-surface-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-navy-900">
                {editingId ? 'Edit IT Service' : 'Add New IT Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-surface-400 hover:text-navy-900 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Website Development"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="web-development"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Icon</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  >
                    <option value="Globe">Globe (Web Development)</option>
                    <option value="Code2">Code2 (Software / ERP)</option>
                    <option value="Smartphone">Smartphone (Mobile Apps)</option>
                    <option value="TrendingUp">TrendingUp (Digital Marketing)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) =>
                      setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Summary for cards and preview..."
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Detailed Description *</label>
                <textarea
                  rows={4}
                  required
                  value={form.detailedDescription}
                  onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })}
                  placeholder="Full scope of service for detail page..."
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Key Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.keyFeaturesText}
                  onChange={(e) => setForm({ ...form, keyFeaturesText: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Typical Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.deliverablesText}
                  onChange={(e) => setForm({ ...form, deliverablesText: e.target.value })}
                  placeholder="Deliverable 1&#10;Deliverable 2"
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                    placeholder="Custom meta title"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy-900 mb-1">SEO Description</label>
                  <input
                    type="text"
                    value={form.seoDescription}
                    onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                    placeholder="Custom meta description"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="rounded text-royal-600 focus:ring-royal-500"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-navy-900">
                  Feature on Homepage and Services Highlights
                </label>
              </div>

              <div className="pt-3 border-t border-surface-200 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-200 text-surface-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-royal-500 hover:bg-royal-600 text-white text-xs font-bold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
