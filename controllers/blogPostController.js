const blogPostService = require('../services/blogPostService');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { user: { dataValues: { id: userId } } } = req;

    console.log(userId);

    const blogPost = await blogPostService.createBlogPost(userId, title, content, categoryIds);

    return res.status(201).json(blogPost);
  } catch (error) {
    console.log(`Error create blog post: ${error.message}`);
    next(error);
  }
};

module.exports = {
  create,
};
