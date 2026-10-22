import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

export const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Application form state
  const [applicationData, setApplicationData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    resumeUrl: '',
    coverNote: '',
    portfolioUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await publicApi.getJobs();
        setJobs(res.data.data || []);
      } catch (err) {
        console.error('Failed to load career openings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setSubmitSuccess(null);
    setSubmitError(null);
    setIsApplyModalOpen(true);
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    setUploadingResume(true);
    setSubmitError(null);
    try {
      const res = await publicApi.uploadDocument(formData);
      if (res.data?.url) {
        setApplicationData((prev) => ({ ...prev, resumeUrl: res.data.url }));
      }
    } catch (err) {
      setSubmitError('Failed to upload document. Please upload a PDF or DOC file under 5MB.');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!applicationData.applicantName.trim() || !applicationData.email.trim() || !applicationData.phone.trim()) {
      setSubmitError('Name, email, and phone number are required.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        jobId: selectedJob?._id,
        jobTitle: selectedJob?.title || 'General Career Application',
        ...applicationData,
      };

      const res = await publicApi.submitJobApplication(payload);
      if (res.data?.success) {
        setSubmitSuccess({
          message: res.data.message,
          referenceId: res.data.referenceId,
        });
        setApplicationData({
          applicantName: '',
          email: '',
          phone: '',
          resumeUrl: '',
          coverNote: '',
          portfolioUrl: '',
        });
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Careers & Opportunities"
        description="Explore career opportunities at Namah Siddham Corporation Private Limited. Join our technology and marketplace operations team."
      />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            <span>Join Our Team</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Careers at Namah Siddham
          </h1>
          <p className="text-base sm:text-lg text-sage-200 max-w-3xl leading-relaxed font-light">
            Build and scale digital platforms that connect millions of households with dependable services and regional commerce.
          </p>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sage-200 shadow-soft-sm space-y-6">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
            Work Culture
          </span>
          <h2 className="font-serif font-bold text-2xl text-forest-950">
            Purpose-Driven, Merit-Based & Collaborative
          </h2>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed max-w-3xl">
            We foster an engineering and operational culture that emphasizes autonomy, high ownership, and direct impact. Team members across software architecture, vendor relations, and digital customer support collaborate in agile iterations to deliver seamless marketplace experiences.
          </p>
        </div>
      </section>

      {/* Job Openings List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
            Current Openings
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
            Open Positions
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-forest-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs text-charcoal-500 mt-3">Loading openings...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage-100 pb-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-forest-950">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider mt-0.5">
                      {job.department}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center text-xs font-medium bg-sage-100 text-forest-900 px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3 mr-1" />
                      {job.jobType}
                    </span>
                    <span className="inline-flex items-center text-xs font-medium bg-sage-100 text-forest-900 px-3 py-1 rounded-full">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center text-xs font-medium bg-gold-50 text-gold-800 border border-gold-200 px-3 py-1 rounded-full">
                      Exp: {job.experience}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  <p>{job.description}</p>

                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h5 className="font-bold text-forest-950 text-xs uppercase tracking-wider">
                        Key Responsibilities:
                      </h5>
                      <ul className="space-y-1 pl-4 list-disc text-charcoal-600">
                        {job.responsibilities.map((r, idx) => (
                          <li key={idx}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h5 className="font-bold text-forest-950 text-xs uppercase tracking-wider">
                        Candidate Requirements:
                      </h5>
                      <ul className="space-y-1 pl-4 list-disc text-charcoal-600">
                        {job.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <Button
                    onClick={() => openApplyModal(job)}
                    variant="primary"
                    size="sm"
                    className="px-6 py-2.5"
                  >
                    Apply For Position
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-sage-200 p-8 space-y-2">
            <Briefcase className="w-12 h-12 text-sage-300 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-forest-950">No Open Vacancies Currently</h3>
            <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
              We do not post simulated vacancies. When new positions in software engineering, partner onboarding, or customer operations become available, they will be listed here.
            </p>
          </div>
        )}
      </section>

      {/* Application Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply: ${selectedJob?.title || 'Position'}`}
      >
        {submitSuccess ? (
          <div className="space-y-4 py-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-forest-950">
              Application Submitted!
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              {submitSuccess.message}
            </p>
            <div className="pt-2 text-xs font-mono bg-sage-50 p-2.5 rounded-lg border border-sage-200">
              Reference ID: <span className="font-bold text-forest-950">{submitSuccess.referenceId}</span>
            </div>
            <div className="pt-4">
              <Button onClick={() => setIsApplyModalOpen(false)} variant="secondary" size="sm">
                Close Dialog
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleApplicationSubmit} className="space-y-4">
            {submitError && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-xs text-red-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={applicationData.applicantName}
                onChange={(e) =>
                  setApplicationData({ ...applicationData, applicantName: e.target.value })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={applicationData.email}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={applicationData.phone}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Portfolio or LinkedIn URL
              </label>
              <input
                type="url"
                value={applicationData.portfolioUrl}
                onChange={(e) =>
                  setApplicationData({ ...applicationData, portfolioUrl: e.target.value })
                }
                placeholder="https://linkedin.com/in/... or GitHub link"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Upload Resume / CV (PDF or DOC, Max 5MB)
              </label>
              <div className="flex items-center space-x-3">
                <label className="cursor-pointer inline-flex items-center px-4 py-2 rounded-lg border border-sage-300 text-xs font-semibold bg-white hover:bg-sage-50 text-forest-950">
                  <Upload className="w-3.5 h-3.5 mr-1.5 text-forest-800" />
                  <span>{uploadingResume ? 'Uploading...' : 'Choose File'}</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    disabled={uploadingResume}
                  />
                </label>
                {applicationData.resumeUrl && (
                  <span className="text-xs text-emerald-700 font-medium flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Resume attached
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Brief Cover Note
              </label>
              <textarea
                rows={3}
                value={applicationData.coverNote}
                onChange={(e) =>
                  setApplicationData({ ...applicationData, coverNote: e.target.value })
                }
                placeholder="Highlight your relevant experience and why you are interested in this position..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="pt-4 border-t border-sage-200 flex justify-end space-x-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsApplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={submitting}
                icon={Send}
              >
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default CareersPage;
