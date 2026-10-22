import Platform from '../models/Platform.js';

export const getAllPlatforms = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const platforms = await Platform.find(query).sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: platforms.length,
      data: platforms,
    });
  } catch (error) {
    next(error);
  }
};

export const getPlatformById = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({
        success: false,
        message: 'Platform not found.',
      });
    }
    res.status(200).json({
      success: true,
      data: platform,
    });
  } catch (error) {
    next(error);
  }
};

export const createPlatform = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      logoUrl,
      category,
      shortDescription,
      detailedDescription,
      websiteUrl,
      keyFeatures,
      targetAudience,
      useCases,
      howItWorks,
      status,
      isFeatured,
      displayOrder,
      seoTitle,
      seoDescription,
    } = req.body;

    const formattedSlug = slug
      ? slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-')
      : name.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

    const existing = await Platform.findOne({ slug: formattedSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `A platform with slug '${formattedSlug}' already exists. Please pick a unique slug.`,
      });
    }

    const platform = await Platform.create({
      name,
      slug: formattedSlug,
      logoUrl,
      category,
      shortDescription,
      detailedDescription,
      websiteUrl,
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
      targetAudience,
      useCases: Array.isArray(useCases) ? useCases : [],
      howItWorks: Array.isArray(howItWorks) ? howItWorks : [],
      status: status || 'Published',
      isFeatured: isFeatured !== undefined ? isFeatured : true,
      displayOrder: Number(displayOrder) || 0,
      seoTitle,
      seoDescription,
    });

    res.status(201).json({
      success: true,
      message: 'Platform created successfully.',
      data: platform,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({
        success: false,
        message: 'Platform not found.',
      });
    }

    const { slug } = req.body;
    if (slug && slug !== platform.slug) {
      const formattedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
      const conflict = await Platform.findOne({ slug: formattedSlug, _id: { $ne: platform._id } });
      if (conflict) {
        return res.status(400).json({
          success: false,
          message: `Slug '${formattedSlug}' is already in use by another platform.`,
        });
      }
      req.body.slug = formattedSlug;
    }

    const updated = await Platform.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Platform updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({
        success: false,
        message: 'Platform not found.',
      });
    }

    await Platform.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Platform removed permanently.',
    });
  } catch (error) {
    next(error);
  }
};

export const reorderPlatforms = async (req, res, next) => {
  try {
    const { items } = req.body; // array of { id, displayOrder }
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Invalid data format.' });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { displayOrder: item.displayOrder } },
      },
    }));

    await Platform.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: 'Platforms order updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};
