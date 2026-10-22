import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Search,
  Upload,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const AdminPlatforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formError, setFormError] = useState(null);

  const initialForm = {
    name: '',
    slug: '',
    category: '',
    shortDescription: '',
    detailedDescription: '',
    websiteUrl: '',
    keyFeaturesText: '',
    targetAudience: '',
    status: 'Published',
    displayOrder: 0,
    logoUrl: '',
    seoTitle: '',
    seoDescription: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchPlatforms = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getPlatforms({
        search,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      setPlatforms(res.data.data || []);
    } catch (err) {
      console.error('Failed to load platforms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, [search, statusFilter]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setFormData({
      name: p.name,
      slug: p.slug,
      category: p.category,
      shortDescription: p.shortDescription,
      detailedDescription: p.detailedDescription || '',
      websiteUrl: p.websiteUrl,
      keyFeaturesText: (p.keyFeatures || []).join('\n'),
      targetAudience: p.targetAudience || '',
      status: p.status,
      displayOrder: p.displayOrder || 0,
      logoUrl: p.logoUrl || '',
      seoTitle: p.seoTitle || '',
      seoDescription: p.seoDescription || '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploadingLogo(true);
    try {
      const res = await adminApi.uploadImage(data);
      if (res.data?.url) {
        setFormData((prev) => ({ ...prev, logoUrl: res.data.url }));
      }
    } catch (err) {
      setFormError('Failed to upload logo image.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    try {
      const featuresArray = formData.keyFeaturesText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        keyFeatures: featuresArray,
      };

      if (editingId) {
        await adminApi.updatePlatform(editingId, payload);
      } else {
        await adminApi.createPlatform(payload);
      }

      setIsModalOpen(false);
      fetchPlatforms();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save platform.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete '${name}'?`)) {
      try {
        await adminApi.deletePlatform(id);
        fetchPlatforms();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete platform.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest-950">
            Ecosystem Platforms
          </h1>
          <p className="text-xs text-charcoal-500">
            Manage corporate marketplace brands (HomeServixo, Carrento, Jainamshree, SuperiorMart)
          </p>
        </div>

        <Button onClick={openCreateModal} variant="primary" icon={Plus} size="sm">
          Add New Platform
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl p-4 border border-sage-200 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-charcoal-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Platforms Table */}
      <div className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-charcoal-500">Loading platforms...</div>
        ) : platforms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sage-50 text-[11px] font-bold text-forest-950 uppercase tracking-wider border-b border-sage-200">
                  <th className="py-3.5 px-4">Order</th>
                  <th className="py-3.5 px-4">Platform</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Official URL</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100 text-xs">
                {platforms.map((p) => (
                  <tr key={p._id} className="hover:bg-sage-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-forest-900">
                      {p.displayOrder}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        {p.logoUrl ? (
                          <img
                            src={p.logoUrl}
                            alt=""
                            className="w-8 h-8 rounded-lg object-contain border border-sage-200 p-0.5"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-forest-900 text-gold-300 font-serif font-black flex items-center justify-center text-xs">
                            {p.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-serif font-bold text-sm text-forest-950">{p.name}</div>
                          <div className="text-[11px] text-charcoal-400 font-mono">/ecosystem/{p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gold-700">{p.category}</td>
                    <td className="py-3.5 px-4">
                      <Badge status={p.status}>{p.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={p.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-900 hover:text-gold-600 inline-flex items-center"
                      >
                        <span className="truncate max-w-[150px]">{p.websiteUrl}</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/ecosystem/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-charcoal-500 hover:text-forest-950 inline-block"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-forest-900 hover:bg-forest-50 inline-block font-semibold"
                        title="Edit Details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 inline-block"
                        title="Delete Platform"
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
            No platforms found matching your criteria.
          </div>
        )}
      </div>

      {/* Add / Edit Platform Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Platform Details' : 'Add New Portfolio Platform'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-800 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Platform Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. HomeServixo"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Slug (URL Identifier) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. homeservixo"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Home Services & Appliance Repair"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Official Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://homeservixo.in"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-medium"
              >
                <option value="Published">Published (Live)</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Logo Image
              </label>
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer px-3 py-2 bg-white border border-sage-300 rounded-lg text-xs font-medium hover:bg-sage-50 inline-flex items-center">
                  <Upload className="w-3.5 h-3.5 mr-1 text-forest-900" />
                  <span>{uploadingLogo ? '...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={uploadingLogo}
                  />
                </label>
                {formData.logoUrl && (
                  <span className="text-[11px] text-emerald-700 font-semibold truncate max-w-[120px]">
                    Logo loaded
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
              Short Description (Card Summary) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Concise 1-2 sentence description"
              className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              placeholder="In-depth explanation of platform value, customer convenience, and operations..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Key Features (One feature per line)
              </label>
              <textarea
                rows={3}
                value={formData.keyFeaturesText}
                onChange={(e) => setFormData({ ...formData, keyFeaturesText: e.target.value })}
                placeholder="Vetted Technicians&#10;Upfront Pricing&#10;Doorstep Repair"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Target Audience
              </label>
              <textarea
                rows={3}
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g. Homeowners, urban consumers, retail shoppers..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-sage-200 flex justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={saving}
            >
              {editingId ? 'Update Platform' : 'Create Platform'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPlatforms;
