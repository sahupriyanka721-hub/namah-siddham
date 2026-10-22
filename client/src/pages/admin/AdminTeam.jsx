import React, { useState, useEffect } from 'react';
import { Users2, Plus, Edit, Trash2, Linkedin, Upload, AlertCircle } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const initialForm = {
    name: '',
    designation: '',
    biography: '',
    profileImage: '',
    linkedinUrl: '',
    displayOrder: 0,
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getTeam();
      setTeam(res.data.data || []);
    } catch (err) {
      console.error('Failed to load team:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (m) => {
    setEditingId(m._id);
    setFormData({
      name: m.name,
      designation: m.designation,
      biography: m.biography,
      profileImage: m.profileImage || '',
      linkedinUrl: m.linkedinUrl || '',
      displayOrder: m.displayOrder || 0,
      isPublished: m.isPublished !== undefined ? m.isPublished : true,
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
        await adminApi.updateTeamMember(editingId, formData);
      } else {
        await adminApi.createTeamMember(formData);
      }
      setIsModalOpen(false);
      fetchTeam();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save team member.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete profile for '${name}'?`)) {
      try {
        await adminApi.deleteTeamMember(id);
        fetchTeam();
      } catch (err) {
        alert('Failed to delete profile.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest-950">
            Leadership & Governance Team
          </h1>
          <p className="text-xs text-charcoal-500">
            Manage board of directors, advisors, and corporate key members.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="primary" icon={Plus} size="sm">
          Add Profile
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-charcoal-500">Loading profiles...</div>
        ) : team.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sage-50 text-[11px] font-bold text-forest-950 uppercase tracking-wider border-b border-sage-200">
                  <th className="py-3.5 px-4">Order</th>
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">Designation</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100 text-xs">
                {team.map((m) => (
                  <tr key={m._id} className="hover:bg-sage-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-forest-900">{m.displayOrder}</td>
                    <td className="py-3.5 px-4 font-bold text-forest-950">{m.name}</td>
                    <td className="py-3.5 px-4 text-gold-700 font-semibold">{m.designation}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          m.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {m.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(m)}
                        className="p-1.5 rounded-lg text-forest-900 hover:bg-forest-50 inline-block font-semibold"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(m._id, m.name)}
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
            No leadership profiles configured yet.
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Profile' : 'Add Team Profile'}
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
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
              Biography <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.biography}
              onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
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
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="h-4 w-4 rounded text-forest-900 border-sage-300 focus:ring-forest-600"
            />
            <label htmlFor="isPublished" className="text-xs font-semibold text-forest-950 cursor-pointer">
              Publish profile publicly on website
            </label>
          </div>

          <div className="pt-4 border-t border-sage-200 flex justify-end space-x-3">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={saving}>
              {editingId ? 'Save Changes' : 'Create Profile'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTeam;
