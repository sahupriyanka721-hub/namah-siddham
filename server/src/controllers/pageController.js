import PageContent from '../models/PageContent.js';

export const getAllPages = async (req, res, next) => {
  try {
    const pages = await PageContent.find().sort({ pageSlug: 1 });
    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages,
    });
  } catch (error) {
    next(error);
  }
};

export const getPageBySlugAdmin = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let page = await PageContent.findOne({ pageSlug: slug.toLowerCase() });

    if (!page) {
      page = await PageContent.create({
        pageSlug: slug.toLowerCase(),
        title: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
        status: 'Draft',
      });
    }

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePageContent = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { title, heroHeadline, heroDescription, sections, bodyContent, status, seoTitle, seoDescription } = req.body;

    let page = await PageContent.findOne({ pageSlug: slug.toLowerCase() });

    if (!page) {
      page = new PageContent({
        pageSlug: slug.toLowerCase(),
        title: title || slug,
        heroHeadline,
        heroDescription,
        sections,
        bodyContent,
        status: status || 'Published',
        seoTitle,
        seoDescription,
        lastUpdatedBy: req.user ? req.user.name : 'Admin',
      });
    } else {
      if (title !== undefined) page.title = title;
      if (heroHeadline !== undefined) page.heroHeadline = heroHeadline;
      if (heroDescription !== undefined) page.heroDescription = heroDescription;
      if (sections !== undefined) page.sections = sections;
      if (bodyContent !== undefined) page.bodyContent = bodyContent;
      if (status !== undefined) page.status = status;
      if (seoTitle !== undefined) page.seoTitle = seoTitle;
      if (seoDescription !== undefined) page.seoDescription = seoDescription;
      page.lastUpdatedBy = req.user ? req.user.name : 'Admin';
    }

    await page.save();

    res.status(200).json({
      success: true,
      message: `Page '${slug}' saved successfully.`,
      data: page,
    });
  } catch (error) {
    next(error);
  }
};
