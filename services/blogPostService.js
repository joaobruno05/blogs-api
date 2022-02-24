const Joi = require('joi');
const { BlogPost, User, Category } = require('../models');
const categoryService = require('./categoryService');
const loginService = require('./loginService');
const errorDefault = require('../errors/errorDefault');

const schemaBlogPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const schemaUpdate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validateCategories = async (categories) => {
  const validCategories = await categoryService.findById(categories);

  return validCategories.length === categories.length;
};

const includeOptions = {
  include: [
    {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
};

const createBlogPost = async (userId, title, content, categoryIds) => {
  const BlogPostValidate = schemaBlogPost.validate({ title, content, categoryIds });

  const { error } = BlogPostValidate;

  if (error) throw (errorDefault(400, error.details[0].message));

  const validCategories = await validateCategories(categoryIds);

  if (!validCategories) throw (errorDefault(400, '"categoryIds" not found'));

  const blogPost = await BlogPost.create({ userId, title, content, categoryIds });

  return blogPost;
};

const getAllBlogPosts = async () => {
  const blogPosts = await BlogPost.findAll(includeOptions);

  return blogPosts;
};

const findByIdBlogPosts = async (id) => {
  const blogPost = await BlogPost.findByPk(id, includeOptions);

  if (!blogPost) throw (errorDefault(404, 'Post does not exist'));

  return blogPost;
};

const updateBlogPost = async (id, userId, data) => {
  const { title, content, categoryIds } = data;

  if (categoryIds) throw (errorDefault(400, 'Categories cannot be edited'));

  const validBlogPost = schemaUpdate.validate({ title, content });
  const { error } = validBlogPost;
  
  if (error) throw (errorDefault(400, error.details[0].message));

  const blogPostUpdated = await findByIdBlogPosts(id);

  if (blogPostUpdated.userId !== userId) throw (errorDefault(401, 'Unauthorized user'));

  await BlogPost.update(
    { title, content },
    { where: { id } },
    includeOptions,
  );

  const { categories } = blogPostUpdated;

  return { title, content, userId, categories };
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  findByIdBlogPosts,
  updateBlogPost,
};
