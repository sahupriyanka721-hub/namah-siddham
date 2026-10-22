import ContactInquiry from '../models/ContactInquiry.js';
import PartnerInquiry from '../models/PartnerInquiry.js';
import JobApplication from '../models/JobApplication.js';
import { jsonToCSV } from '../utils/helpers.js';

// ==================== CONTACT INQUIRIES ====================

export const getContactInquiries = async (req, res, next) => {
  try {
    const { status, category, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (category && category !== 'all') query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { referenceId: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await ContactInquiry.countDocuments(query);
    const inquiries = await ContactInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactInquiryStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const inquiry = await ContactInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Contact inquiry not found.' });
    }

    if (status) inquiry.status = status;
    if (note && note.trim()) {
      inquiry.internalNotes.push({
        note: note.trim(),
        author: req.user ? req.user.name : 'Admin',
        createdAt: new Date(),
      });
    }

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactInquiry = async (req, res, next) => {
  try {
    const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Contact inquiry not found.' });
    }
    res.status(200).json({ success: true, message: 'Contact inquiry deleted.' });
  } catch (error) {
    next(error);
  }
};

export const exportContactInquiriesCSV = async (req, res, next) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });

    const headers = [
      { label: 'Reference ID', key: 'referenceId' },
      { label: 'Date', key: (i) => new Date(i.createdAt).toISOString() },
      { label: 'Name', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Phone', key: 'phone' },
      { label: 'Category', key: 'category' },
      { label: 'Subject', key: 'subject' },
      { label: 'Message', key: 'message' },
      { label: 'Status', key: 'status' },
    ];

    const csvData = jsonToCSV(inquiries, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=contact-inquiries-${Date.now()}.csv`);
    res.status(200).send(csvData);
  } catch (error) {
    next(error);
  }
};

// ==================== PARTNER INQUIRIES ====================

export const getPartnerInquiries = async (req, res, next) => {
  try {
    const { status, category, platform, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (category && category !== 'all') query.category = category;
    if (platform && platform !== 'all') query.platform = platform;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { referenceId: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await PartnerInquiry.countDocuments(query);
    const inquiries = await PartnerInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePartnerInquiryStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const inquiry = await PartnerInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Partner inquiry not found.' });
    }

    if (status) inquiry.status = status;
    if (note && note.trim()) {
      inquiry.internalNotes.push({
        note: note.trim(),
        author: req.user ? req.user.name : 'Admin',
        createdAt: new Date(),
      });
    }

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Partner inquiry updated successfully.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePartnerInquiry = async (req, res, next) => {
  try {
    const inquiry = await PartnerInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Partner inquiry not found.' });
    }
    res.status(200).json({ success: true, message: 'Partner inquiry deleted.' });
  } catch (error) {
    next(error);
  }
};

export const exportPartnerInquiriesCSV = async (req, res, next) => {
  try {
    const inquiries = await PartnerInquiry.find().sort({ createdAt: -1 });

    const headers = [
      { label: 'Reference ID', key: 'referenceId' },
      { label: 'Date', key: (i) => new Date(i.createdAt).toISOString() },
      { label: 'Contact Person', key: 'name' },
      { label: 'Business Name', key: 'businessName' },
      { label: 'Email', key: 'email' },
      { label: 'Mobile', key: 'mobile' },
      { label: 'City', key: 'city' },
      { label: 'State', key: 'state' },
      { label: 'Category', key: 'category' },
      { label: 'Platform', key: 'platform' },
      { label: 'Message', key: 'message' },
      { label: 'Status', key: 'status' },
    ];

    const csvData = jsonToCSV(inquiries, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=partner-inquiries-${Date.now()}.csv`);
    res.status(200).send(csvData);
  } catch (error) {
    next(error);
  }
};

// ==================== JOB APPLICATIONS ====================

export const getJobApplications = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { applicantName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } },
        { referenceId: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await JobApplication.countDocuments(query);
    const applications = await JobApplication.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJobApplicationStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application record not found.' });
    }

    if (status) application.status = status;
    if (note && note.trim()) {
      application.internalNotes.push({
        note: note.trim(),
        author: req.user ? req.user.name : 'Admin',
        createdAt: new Date(),
      });
    }

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application updated successfully.',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJobApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application record not found.' });
    }
    res.status(200).json({ success: true, message: 'Application record deleted.' });
  } catch (error) {
    next(error);
  }
};
