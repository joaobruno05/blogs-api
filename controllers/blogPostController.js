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

const getAll = async (req, res, next) => {
  try {
    const blogPosts = await blogPostService.getAllBlogPosts();

    return res.status(200).json(blogPosts);
  } catch (error) {
    console.log(`Error get all blog posts: ${error.message}`);
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blogPost = await blogPostService.findByIdBlogPosts(id);

    return res.status(200).json(blogPost);
  } catch (error) {
    console.log(`Error find by id blog post: ${error.message}`);
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  findById,
};
