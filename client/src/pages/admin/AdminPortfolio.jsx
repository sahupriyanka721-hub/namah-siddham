import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Search,
  ExternalLink,
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';

export const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notification, setNotification] = useState(null);

  const initialForm = {
    name: '',
    slug: '',
    industry: '',
    category: 'Website Development',
    projectType: 'Demonstration Project',
    shortDescription: '',
    detailedDescription: '',
    technologiesText: '',
    projectUrl: '',
    isFeatured: true,
    status: 'Published',
    displayOrder: 0,
    seoTitle: '',
    seoDescription: '',
  };

  const [form, setForm] = useState(initialForm);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getPortfolio({
        status: statusFilter,
        projectType: typeFilter,
        search: searchTerm,
      });
      setProjects(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load portfolio projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [statusFilter, typeFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadProjects();
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (!editingId) {
      setForm((prev) => ({
        ...prev,
        name: val,
        slug: generateSlug(val),
      }));
    } else {
      setForm((prev) => ({ ...prev, name: val }));
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingId(proj._id);
    setForm({
      name: proj.name || '',
      slug: proj.slug || '',
      industry: proj.industry || '',
      category: proj.category || 'Website Development',
      projectType: proj.projectType || 'Demonstration Project',
      shortDescription: proj.shortDescription || '',
      detailedDescription: proj.detailedDescription || '',
      technologiesText: (proj.technologies || []).join(', '),
      projectUrl: proj.projectUrl || '',
      isFeatured: proj.isFeatured ?? true,
      status: proj.status || 'Published',
      displayOrder: proj.displayOrder || 0,
      seoTitle: proj.seoTitle || '',
      seoDescription: proj.seoDescription || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.industry || !form.shortDescription || !form.detailedDescription) {
      alert('Please fill in project name, slug, industry, short description, and detailed description.');
      return;
    }

    const payload = {
      ...form,
      technologies: form.technologiesText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await adminApi.updatePortfolioProject(editingId, payload);
        setNotification({ type: 'success', message: 'Portfolio project updated successfully.' });
      } else {
        await adminApi.createPortfolioProject(payload);
        setNotification({ type: 'success', message: 'New portfolio project created.' });
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save portfolio project.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.deletePortfolioProject(id);
      setDeleteConfirmId(null);
      setNotification({ type: 'success', message: 'Project removed.' });
      loadProjects();
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl text-navy-900 flex items-center">
            <FolderGit2 className="w-6 h-6 mr-2 text-royal-600" />
            <span>Portfolio &amp; Case Studies Management</span>
          </h1>
          <p className="text-xs text-surface-500 mt-1">
            Showcase completed systems, internal aggregator platforms, and demonstration architectures.
          </p>
        </div>

        <Button
          onClick={openCreateModal}
          variant="primary"
          icon={Plus}
          className="text-xs font-bold px-4 py-2.5 rounded-xl bg-royal-500 hover:bg-royal-600 text-white"
        >
          Add Portfolio Project
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
            placeholder="Search project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-surface-200 text-xs font-medium bg-surface-50 text-navy-900 focus:outline-none"
          >
            <option value="all">All Project Types</option>
            <option value="Client Project">Client Project</option>
            <option value="Internal Product">Internal Product</option>
            <option value="Demonstration Project">Demonstration Project</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-surface-200 text-xs font-medium bg-surface-50 text-navy-900 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-3xl border border-surface-200 shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 text-surface-500 uppercase tracking-wider font-mono border-b border-surface-200">
              <tr>
                <th className="py-3.5 px-6">Project Name</th>
                <th className="py-3.5 px-4">Industry</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-surface-400">
                    Loading portfolio records...
                  </td>
                </tr>
              ) : projects.length > 0 ? (
                projects.map((p) => (
                  <tr key={p._id} className="hover:bg-surface-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-navy-900">
                      <div>{p.name}</div>
                      <div className="text-[11px] text-surface-400 font-normal line-clamp-1">
                        {p.shortDescription}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-royal-600">{p.industry}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono ${
                          p.projectType === 'Client Project'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : p.projectType === 'Internal Product'
                            ? 'bg-orange-100 text-orange-800 border border-orange-300'
                            : 'bg-blue-100 text-blue-800 border border-blue-300'
                        }`}
                      >
                        {p.projectType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-surface-100 text-navy-900">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {p.isFeatured ? (
                        <span className="text-[10px] font-bold text-royal-600">Yes</span>
                      ) : (
                        <span className="text-[10px] text-surface-400">No</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <a
                        href={`/portfolio/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-surface-400 hover:text-navy-900 inline-block"
                        title="Preview Case Study"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-royal-600 hover:bg-royal-50 inline-block"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p._id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 inline-block"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-surface-400">
                    No portfolio projects found.
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
              Are you sure you want to permanently remove this portfolio project?
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-5 border border-surface-200 shadow-soft-xl">
            <div className="flex items-center justify-between border-b border-surface-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-navy-900">
                {editingId ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
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
                  <label className="block font-bold text-navy-900 mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={handleNameChange}
                    placeholder="e.g. Multi-Vendor Marketplace"
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
                    placeholder="multi-vendor-marketplace"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Industry *</label>
                  <input
                    type="text"
                    required
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    placeholder="e.g. E-commerce & Retail"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Project Classification *</label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 font-medium"
                  >
                    <option value="Demonstration Project">Demonstration Project</option>
                    <option value="Internal Product">Internal Product</option>
                    <option value="Client Project">Client Project</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 font-medium"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={form.technologiesText}
                  onChange={(e) => setForm({ ...form, technologiesText: e.target.value })}
                  placeholder="React.js, Node.js, Express, MongoDB, Tailwind CSS"
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Brief summary for cards..."
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Detailed Case Study Description *</label>
                <textarea
                  rows={4}
                  required
                  value={form.detailedDescription}
                  onChange={(e) => setForm({ ...form, detailedDescription: e.target.value })}
                  placeholder="In-depth architecture description and specifications..."
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Project / Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={form.projectUrl}
                    onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono"
                  />
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

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeaturedPortfolio"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="rounded text-royal-600 focus:ring-royal-500"
                />
                <label htmlFor="isFeaturedPortfolio" className="text-xs font-semibold text-navy-900">
                  Feature on Homepage Showcase
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
