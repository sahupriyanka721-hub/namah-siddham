import NewsArticle from '../models/NewsArticle.js';

export const getAllNewsAdmin = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status === 'published') query.isPublished = true;
    if (status === 'draft') query.isPublished = false;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    const news = await NewsArticle.find(query).sort({ publishedAt: -1 });

    res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsById = async (req, res, next) => {
  try {
    const article = await NewsArticle.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const createNews = async (req, res, next) => {
  try {
    const { title, slug, featuredImage, summary, content, category, author, publishedAt, isPublished, seoTitle, seoDescription } = req.body;

    const formattedSlug = slug
      ? slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-')
      : title.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

    const existing = await NewsArticle.findOne({ slug: formattedSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An article with this slug already exists. Please choose a different title or slug.',
      });
    }

    const article = await NewsArticle.create({
      title,
      slug: formattedSlug,
      featuredImage,
      summary,
      content,
      category: category || 'Corporate News',
      author: author || 'Namah Siddham Communications',
      publishedAt: publishedAt || new Date(),
      isPublished: isPublished !== undefined ? isPublished : true,
      seoTitle,
      seoDescription,
    });

    res.status(201).json({
      success: true,
      message: 'News article created successfully.',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (req, res, next) => {
  try {
    const article = await NewsArticle.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    if (req.body.slug && req.body.slug !== article.slug) {
      const formattedSlug = req.body.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
      const conflict = await NewsArticle.findOne({ slug: formattedSlug, _id: { $ne: article._id } });
      if (conflict) {
        return res.status(400).json({
          success: false,
          message: 'Slug already taken by another article.',
        });
      }
      req.body.slug = formattedSlug;
    }

    const updated = await NewsArticle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Article updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (req, res, next) => {
  try {
    const article = await NewsArticle.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
