import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit, Trash2, Users, AlertCircle } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const AdminCareers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const initialForm = {
    title: '',
    department: '',
    jobType: 'Full-time',
    location: '',
    experience: '',
    description: '',
    responsibilitiesText: '',
    requirementsText: '',
    status: 'Published',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getJobs();
      setJobs(res.data.data || []);
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (j) => {
    setEditingId(j._id);
    setFormData({
      title: j.title,
      department: j.department,
      jobType: j.jobType || 'Full-time',
      location: j.location,
      experience: j.experience,
      description: j.description,
      responsibilitiesText: (j.responsibilities || []).join('\n'),
      requirementsText: (j.requirements || []).join('\n'),
      status: j.status,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    try {
      const resp = formData.responsibilitiesText.split('\n').map((s) => s.trim()).filter(Boolean);
      const reqs = formData.requirementsText.split('\n').map((s) => s.trim()).filter(Boolean);

      const payload = {
        ...formData,
        responsibilities: resp,
        requirements: reqs,
      };

      if (editingId) {
        await adminApi.updateJob(editingId, payload);
      } else {
        await adminApi.createJob(payload);
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save job opening.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete vacancy '${title}'?`)) {
      try {
        await adminApi.deleteJob(id);
        fetchJobs();
      } catch (err) {
        alert('Failed to delete job.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest-950">
            Job Openings Management
          </h1>
          <p className="text-xs text-charcoal-500">
            Publish authentic positions and review applicant response rates.
          </p>
        </div>

        <Button onClick={openCreateModal} variant="primary" icon={Plus} size="sm">
          Post Job Opening
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-charcoal-500">Loading vacancies...</div>
        ) : jobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sage-50 text-[11px] font-bold text-forest-950 uppercase tracking-wider border-b border-sage-200">
                  <th className="py-3.5 px-4">Position</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Type & Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Applicants</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100 text-xs">
                {jobs.map((j) => (
                  <tr key={j._id} className="hover:bg-sage-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-forest-950">{j.title}</td>
                    <td className="py-3.5 px-4 text-charcoal-600 font-medium">{j.department}</td>
                    <td className="py-3.5 px-4 text-charcoal-500">
                      {j.jobType} • {j.location}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={j.status}>{j.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-forest-900">
                      {j.applicationCount || 0}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(j)}
                        className="p-1.5 rounded-lg text-forest-900 hover:bg-forest-50 inline-block font-semibold"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(j._id, j.title)}
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
            No vacancies posted yet.
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Job Opening' : 'Post New Vacancy'}
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
                Job Title <span className="text-red-500">*</span>
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
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Employment Type
              </label>
              <select
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Indore / Hybrid"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Experience Req <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="2-4 Years"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Responsibilities (One per line)
              </label>
              <textarea
                rows={3}
                value={formData.responsibilitiesText}
                onChange={(e) => setFormData({ ...formData, responsibilitiesText: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Requirements (One per line)
              </label>
              <textarea
                rows={3}
                value={formData.requirementsText}
                onChange={(e) => setFormData({ ...formData, requirementsText: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider mb-1">
              Publication Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-3 py-2 text-xs bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              <option value="Published">Published</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="pt-4 border-t border-sage-200 flex justify-end space-x-3">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={saving}>
              {editingId ? 'Save Changes' : 'Post Opening'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCareers;
