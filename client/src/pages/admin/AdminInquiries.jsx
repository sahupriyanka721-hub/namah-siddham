import React, { useState, useEffect } from 'react';
import { Mail, Download, Search, Eye, Trash2, CheckCircle2, MessageSquare, AlertCircle, Building2, MapPin, DollarSign, Phone } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getContactInquiries({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search,
        page,
        limit: 15,
      });
      setInquiries(res.data.data || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, search, page]);

  const openDetailModal = (item) => {
    setSelectedInquiry(item);
    setNewStatus(item.status);
    setNewNote('');
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await adminApi.updateContactInquiry(selectedInquiry._id, {
        status: newStatus,
        note: newNote,
      });
      setSelectedInquiry(res.data.data);
      setNewNote('');
      fetchInquiries();
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this contact inquiry permanently?')) {
      try {
        await adminApi.deleteContactInquiry(id);
        setIsModalOpen(false);
        fetchInquiries();
      } catch (err) {
        alert('Failed to delete inquiry.');
      }
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await adminApi.exportContactCSV();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `contact-inquiries-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to export CSV.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-navy-900 tracking-tight flex items-center">
            <Mail className="w-6 h-6 mr-2.5 text-royal-500" />
            Corporate & IT Project Inquiries
          </h1>
          <p className="text-xs text-navy-600 mt-1">
            Review incoming project briefs, development requests, budget indications, and corporate messages.
          </p>
        </div>

        <Button onClick={handleExportCSV} variant="secondary" icon={Download} size="sm">
          Export to CSV
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, company, city, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-navy-600 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-medium text-navy-800"
          >
            <option value="all">All Inquiries</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Contacted">Contacted</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading inquiries...</div>
        ) : inquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-navy-900 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4">Ref ID</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Client / Company</th>
                  <th className="py-3.5 px-4">Service Required</th>
                  <th className="py-3.5 px-4">Budget Range</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {inquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-royal-600">
                      {item.referenceId}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-900">{item.name}</div>
                      {item.businessName && (
                        <div className="text-[11px] text-royal-700 font-semibold">{item.businessName}</div>
                      )}
                      <div className="text-[11px] text-slate-500">{item.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-navy-800">
                        {item.serviceRequired || item.category || 'General Inquiry'}
                      </div>
                      {item.city && (
                        <div className="text-[11px] text-slate-400 flex items-center">
                          <MapPin className="w-3 h-3 mr-0.5 inline" /> {item.city}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs text-navy-700 font-medium">
                        {item.budgetRange || 'Not specified'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={item.status}>{item.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openDetailModal(item)}
                        className="px-3 py-1.5 rounded-lg bg-royal-50 hover:bg-royal-100 text-royal-700 text-xs font-bold inline-flex items-center transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-xs text-slate-400">
            No contact inquiries found.
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Inquiry Details: ${selectedInquiry?.referenceId || ''}`}
        maxWidth="max-w-2xl"
      >
        {selectedInquiry && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-navy-900 block">Contact Name:</span>
                <span className="text-navy-700">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="font-bold text-navy-900 block">Business / Organization:</span>
                <span className="text-navy-700 font-semibold">{selectedInquiry.businessName || 'Individual'}</span>
              </div>
              <div>
                <span className="font-bold text-navy-900 block">Email Address:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-royal-600 underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="font-bold text-navy-900 block">Phone Number:</span>
                <span className="text-navy-700">{selectedInquiry.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="font-bold text-navy-900 block">City / Location:</span>
                <span className="text-navy-700">{selectedInquiry.city || 'N/A'}</span>
              </div>
              <div>
                <span className="font-bold text-navy-900 block">Preferred Contact:</span>
                <span className="text-navy-700 font-semibold">{selectedInquiry.preferredContactMethod || 'Email'}</span>
              </div>
              <div>
                <span className="font-bold text-navy-900 block">Service Required:</span>
                <span className="text-royal-700 font-bold">{selectedInquiry.serviceRequired || selectedInquiry.category}</span>
              </div>
              <div>
                <span className="font-bold text-navy-900 block">Budget Range:</span>
                <span className="text-gold-700 font-bold">{selectedInquiry.budgetRange || 'Not specified'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                Project Description & Scope:
              </span>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-800 leading-relaxed whitespace-pre-line shadow-sm">
                {selectedInquiry.projectDescription || selectedInquiry.message}
              </div>
            </div>

            {/* Internal Notes History */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center">
                <MessageSquare className="w-3.5 h-3.5 mr-1 text-royal-600" />
                Internal Administrative Notes (Private)
              </span>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedInquiry.internalNotes && selectedInquiry.internalNotes.length > 0 ? (
                  selectedInquiry.internalNotes.map((note, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                        <span className="font-semibold text-navy-900">By: {note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-navy-700">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-slate-400 italic">No internal notes added yet.</p>
                )}
              </div>
            </div>

            {/* Update Status Form */}
            <form onSubmit={handleUpdateStatus} className="pt-4 border-t border-slate-200 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Update Inquiry Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-medium text-navy-800"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Add Internal Note
                  </label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="e.g. Call scheduled for tomorrow 2 PM"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedInquiry._id)}
                  className="text-xs text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete Inquiry Record
                </button>
                <Button type="submit" variant="primary" size="sm" loading={updating}>
                  Save Status & Note
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminInquiries;