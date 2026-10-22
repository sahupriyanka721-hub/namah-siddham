import React, { useState, useEffect } from 'react';
import { UserCheck, Search, Eye, Download, MessageSquare, ExternalLink, FileText } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getJobApplications({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search,
      });
      setApplications(res.data.data || []);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, search]);

  const openDetailModal = (app) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setNewNote('');
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await adminApi.updateJobApplication(selectedApp._id, {
        status: newStatus,
        note: newNote,
      });
      setSelectedApp(res.data.data);
      setNewNote('');
      fetchApplications();
    } catch (err) {
      alert('Failed to update application status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this applicant profile?')) {
      try {
        await adminApi.deleteJobApplication(id);
        setIsModalOpen(false);
        fetchApplications();
      } catch (err) {
        alert('Failed to delete applicant record.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest-950">
            Recruitment Applications
          </h1>
          <p className="text-xs text-charcoal-500">
            Manage candidates, evaluate resumes, and maintain interview feedback records.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-sage-200 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by candidate name, position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-charcoal-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-medium"
          >
            <option value="all">All Applicants</option>
            <option value="New">New</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-charcoal-500">Loading applications...</div>
        ) : applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sage-50 text-[11px] font-bold text-forest-950 uppercase tracking-wider border-b border-sage-200">
                  <th className="py-3.5 px-4">Ref ID</th>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Position</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Resume</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-100 text-xs">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-sage-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-forest-900">{app.referenceId}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-forest-950">{app.applicantName}</div>
                      <div className="text-[11px] text-charcoal-500">{app.email} • {app.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gold-700">{app.jobTitle}</td>
                    <td className="py-3.5 px-4">
                      <Badge status={app.status}>{app.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-semibold text-forest-900 hover:text-gold-600 underline"
                        >
                          <FileText className="w-3.5 h-3.5 mr-1" />
                          <span>View CV</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-charcoal-400">None</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openDetailModal(app)}
                        className="px-3 py-1.5 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-900 text-xs font-bold inline-flex items-center"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Review</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-charcoal-400">
            No applicant records found.
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Candidate Evaluation: ${selectedApp?.applicantName || ''}`}
        maxWidth="max-w-2xl"
      >
        {selectedApp && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-sage-50 p-4 rounded-xl border border-sage-200 text-xs">
              <div>
                <span className="font-bold text-forest-950 block">Position Applied:</span>
                <span className="text-gold-700 font-bold">{selectedApp.jobTitle}</span>
              </div>
              <div>
                <span className="font-bold text-forest-950 block">Application Reference:</span>
                <span className="font-mono text-forest-950">{selectedApp.referenceId}</span>
              </div>
              <div>
                <span className="font-bold text-forest-950 block">Candidate Email:</span>
                <a href={`mailto:${selectedApp.email}`} className="text-forest-900 underline">
                  {selectedApp.email}
                </a>
              </div>
              <div>
                <span className="font-bold text-forest-950 block">Phone:</span>
                <a href={`tel:${selectedApp.phone}`} className="text-forest-900 font-mono">
                  {selectedApp.phone}
                </a>
              </div>
            </div>

            {selectedApp.portfolioUrl && (
              <div className="text-xs">
                <span className="font-bold text-forest-950 mr-2">Portfolio / Profile:</span>
                <a
                  href={selectedApp.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest-900 underline font-mono inline-flex items-center"
                >
                  <span>{selectedApp.portfolioUrl}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            )}

            {selectedApp.resumeUrl && (
              <div className="p-3 bg-forest-50 border border-forest-100 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-forest-950 flex items-center">
                  <FileText className="w-4 h-4 mr-1.5 text-forest-800" />
                  Uploaded Resume Document
                </span>
                <a
                  href={selectedApp.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-forest-900 text-white text-xs font-bold hover:bg-forest-800"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span>Download Resume</span>
                </a>
              </div>
            )}

            {selectedApp.coverNote && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-forest-950 uppercase tracking-wider block">
                  Cover Note / Pitch:
                </span>
                <div className="bg-white p-4 rounded-xl border border-sage-200 text-xs sm:text-sm text-charcoal-700 leading-relaxed whitespace-pre-line">
                  {selectedApp.coverNote}
                </div>
              </div>
            )}

            {/* Internal Notes */}
            <div className="space-y-2 pt-2 border-t border-sage-200">
              <span className="text-xs font-bold text-forest-950 uppercase tracking-wider flex items-center">
                <MessageSquare className="w-3.5 h-3.5 mr-1 text-gold-600" />
                Recruiter Notes & Candidate Evaluation
              </span>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedApp.internalNotes && selectedApp.internalNotes.length > 0 ? (
                  selectedApp.internalNotes.map((note, idx) => (
                    <div key={idx} className="bg-sage-50 p-2.5 rounded-lg border border-sage-200 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-charcoal-400 mb-1">
                        <span>By: {note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-charcoal-700">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-charcoal-400 italic">No notes added.</p>
                )}
              </div>
            </div>

            <form onSubmit={handleUpdateStatus} className="pt-4 border-t border-sage-200 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Candidate Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-medium"
                  >
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Add Evaluation Note
                  </label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="e.g. Cleared round 1 tech screen"
                    className="w-full px-3 py-2 text-xs bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedApp._id)}
                  className="text-xs text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete Candidate Record
                </button>
                <Button type="submit" variant="primary" size="sm" loading={updating}>
                  Save Candidate Status
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminApplications;
