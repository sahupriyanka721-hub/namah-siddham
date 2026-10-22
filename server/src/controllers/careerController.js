import JobOpening from '../models/JobOpening.js';
import JobApplication from '../models/JobApplication.js';

export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await JobOpening.find(query).sort({ createdAt: -1 });

    // Include application count for each job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await JobApplication.countDocuments({ jobId: job._id });
        return {
          ...job.toObject(),
          applicationCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: jobsWithCounts.length,
      data: jobsWithCounts,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await JobOpening.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job opening not found.' });
    }
    const applications = await JobApplication.find({ jobId: job._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: job,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      department,
      jobType,
      location,
      experience,
      description,
      responsibilities,
      requirements,
      applicationDeadline,
      status,
    } = req.body;

    const job = await JobOpening.create({
      title,
      department,
      jobType: jobType || 'Full-time',
      location,
      experience,
      description,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      requirements: Array.isArray(requirements) ? requirements : [],
      applicationDeadline: applicationDeadline || undefined,
      status: status || 'Published',
    });

    res.status(201).json({
      success: true,
      message: 'Job opening created successfully.',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await JobOpening.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job opening not found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Job opening updated successfully.',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await JobOpening.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job opening not found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Job opening deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
