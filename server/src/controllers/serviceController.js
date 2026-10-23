import Service from '../models/Service.js';

// Public: Get all published services
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ status: 'Published' }).sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get published service by slug
export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug.toLowerCase(),
      status: 'Published',
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service '${req.params.slug}' not found or is currently unpublished.`,
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all services with optional filter
export const getAllServices = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const services = await Service.find(query).sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get service by ID
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service record not found',
      });
    }
    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create service
export const createService = async (req, res, next) => {
  try {
    const { title, slug, shortDescription, detailedDescription } = req.body;
    if (!title || !slug || !shortDescription || !detailedDescription) {
      return res.status(400).json({
        success: false,
        message: 'Title, slug, short description, and detailed description are required.',
      });
    }

    const existing = await Service.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A service with slug '${slug}' already exists.`,
      });
    }

    const service = await Service.create({
      ...req.body,
      slug: slug.toLowerCase(),
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update service
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service record not found.',
      });
    }

    if (req.body.slug && req.body.slug !== service.slug) {
      const existing = await Service.findOne({ slug: req.body.slug.toLowerCase() });
      if (existing && existing._id.toString() !== req.params.id) {
        return res.status(409).json({
          success: false,
          message: `Slug '${req.body.slug}' is already taken by another service.`,
        });
      }
      req.body.slug = req.body.slug.toLowerCase();
    }

    Object.assign(service, req.body);
    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete service
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service record not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Reorder services
export const reorderServices = async (req, res, next) => {
  try {
    const { items } = req.body; // Array of { id, displayOrder }
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Invalid items array' });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { displayOrder: item.displayOrder } },
      },
    }));

    await Service.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: 'Services display order updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};
