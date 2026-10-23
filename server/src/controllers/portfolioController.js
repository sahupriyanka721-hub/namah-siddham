import PortfolioProject from '../models/PortfolioProject.js';

// Public: Get all published portfolio projects
export const getPortfolio = async (req, res, next) => {
  try {
    const { category, type } = req.query;
    const query = { status: 'Published' };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (type && type !== 'All') {
      query.projectType = type;
    }

    const projects = await PortfolioProject.find(query).sort({
      isFeatured: -1,
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get published portfolio project by slug
export const getPortfolioBySlug = async (req, res, next) => {
  try {
    const project = await PortfolioProject.findOne({
      slug: req.params.slug.toLowerCase(),
      status: 'Published',
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project '${req.params.slug}' not found or is currently unpublished.`,
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all portfolio projects with filter & search
export const getAllPortfolioProjects = async (req, res, next) => {
  try {
    const { status, search, projectType } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }
    if (projectType && projectType !== 'all') {
      query.projectType = projectType;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const projects = await PortfolioProject.find(query).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get portfolio project by ID
export const getPortfolioProjectById = async (req, res, next) => {
  try {
    const project = await PortfolioProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create portfolio project
export const createPortfolioProject = async (req, res, next) => {
  try {
    const { name, slug, industry, category, projectType, shortDescription, detailedDescription } =
      req.body;

    if (!name || !slug || !industry || !category || !shortDescription || !detailedDescription) {
      return res.status(400).json({
        success: false,
        message: 'Name, slug, industry, category, short and detailed description are required.',
      });
    }

    const existing = await PortfolioProject.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Project with slug '${slug}' already exists.`,
      });
    }

    const project = await PortfolioProject.create({
      ...req.body,
      slug: slug.toLowerCase(),
      projectType: projectType || 'Demonstration Project',
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update portfolio project
export const updatePortfolioProject = async (req, res, next) => {
  try {
    const project = await PortfolioProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    if (req.body.slug && req.body.slug !== project.slug) {
      const existing = await PortfolioProject.findOne({ slug: req.body.slug.toLowerCase() });
      if (existing && existing._id.toString() !== req.params.id) {
        return res.status(409).json({
          success: false,
          message: `Slug '${req.body.slug}' is already in use by another project.`,
        });
      }
      req.body.slug = req.body.slug.toLowerCase();
    }

    Object.assign(project, req.body);
    await project.save();

    res.status(200).json({
      success: true,
      message: 'Portfolio project updated successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete portfolio project
export const deletePortfolioProject = async (req, res, next) => {
  try {
    const project = await PortfolioProject.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
