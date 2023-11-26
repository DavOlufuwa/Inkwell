const blogRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const {
  userExtractor,
  searchByAuthor,
  generateResults,
  setPaginationLinks,
  searchByTags,
  searchByTitle,
} = require("../utils/middleware");

// Getting All Blogs
blogRouter.get(
  "/",
  async (request, response, next) => {
    const { page, limit } = request.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 20;
    const startIndex = (pageNumber - 1) * pageSize;

    const allBlogs = await Blog.find({ state: "published" })
      .skip(startIndex)
      .limit(pageSize);

    const totalCount = await Blog.countDocuments({ state: "published" });

    request.pageNumber = pageNumber;
    request.pageSize = pageSize;
    request.totalCount = totalCount;
    request.allBlogs = allBlogs;
    request.startIndex = startIndex;

    next();
  },
  generateResults,
  setPaginationLinks,
  (request, response) => {
    response.status(200).json(response.results);
  }
);

// Get By Author
blogRouter.get(
  "/author",
  searchByAuthor,
  async (request, response, next) => {

    const { authorSearchQuery } = request;

    const { page, limit } = request.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 20;
    const startIndex = (pageNumber - 1) * pageSize;
    const totalCount = await Blog.countDocuments(authorSearchQuery);
    const allBlogs = await Blog.find(authorSearchQuery)
      .skip(startIndex)
      .limit(pageSize);

    request.pageNumber = pageNumber;
    request.pageSize = pageSize;
    request.totalCount = totalCount;
    request.allBlogs = allBlogs;
    request.startIndex = startIndex;

    next();
  },
  generateResults,
  setPaginationLinks,
  (request, response) => {
    response.status(200).json(response.results);
  }
);

// Get By Tags
blogRouter.get(
  "/tags",
  searchByTags,
  async (request, response, next) => {
    const { tagsSearchQuery } = request
    const { page, limit, } = request.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 20;
    const startIndex = (pageNumber - 1) * pageSize;
    const totalCount = await Blog.countDocuments(tagsSearchQuery);
    const allBlogs = await Blog.find(tagsSearchQuery)      
    .skip(startIndex)
    .limit(pageSize);

    request.pageNumber = pageNumber;
    request.pageSize = pageSize;
    request.totalCount = totalCount;
    request.allBlogs = allBlogs;
    request.startIndex = startIndex;

    next();
  },
  generateResults,
  setPaginationLinks,
  (request, response) => {
    response.status(200).json(response.results);
  }
);

// Get By Title 
blogRouter.get(
  "/title",
  searchByTitle,
  async (request, response, next) => {
    const { titleSearchQuery } = request
    const { page, limit, } = request.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 20;
    const startIndex = (pageNumber - 1) * pageSize;
    const totalCount = await Blog.countDocuments(titleSearchQuery);
    const allBlogs = await Blog.find(titleSearchQuery)      
    .skip(startIndex)
    .limit(pageSize);

    request.pageNumber = pageNumber;
    request.pageSize = pageSize;
    request.totalCount = totalCount;
    request.allBlogs = allBlogs;
    request.startIndex = startIndex;

    next();
  },
  generateResults,
  setPaginationLinks,
  (request, response) => {
    response.status(200).json(response.results);
  }
)

// Get blog by id
blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog);
});

// Getting All Blogs by the user
blogRouter.get("/user/:userid", userExtractor, async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(404).json({
      error: "user not found",
    });
  }

  const blogs = await Blog.find({ "author.id": user.id });

  response.status(200).json(blogs);
});

// Creating a new blog
blogRouter.post("/", userExtractor, async (request, response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const user = request.user;
  console.log(user);
  const body = request.body;

  const readTime = () => {
    const avgWordsPerMinute = 200;
    const wordCount = body.content.match(/\w+/g).length;
    return Math.ceil(wordCount / avgWordsPerMinute);
  };

  const blog = new Blog({
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    imagePublicId: body.imagePublicId,
    tags: body.tags,
    author: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    content: body.content,
    readingTime: readTime(),
  });

  const savedBlog = await blog.save({ session });

  user.blogs = user.blogs.concat(savedBlog.id);

  await user.save({ session });

  await session.commitTransaction();
  session.endSession();
  response.status(201).json(savedBlog);
});

// Updating the ReadCount of a post
blogRouter.put("/readcount/:id", async (request, response) => {
  const blogId = request.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { $inc: { readCount: 1 } },
    { new: true }
  );
  response.status(200).json(updatedBlog);
});

//Updating a blog post
blogRouter.put("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(403).json({ error: "You are not authorized" });
  }

  const blogId = request.params.id;
  const body = request.body;

  const blog = await Blog.findById(blogId);
  console.log(blog);

  const blogContent = blog.content.match(/\w+/g).length;
  const bodyContent = body.content?.match(/\w+/g).length;

  const update = {};

  const fields = [
    "title",
    "description",
    "imageUrl",
    "imagePublicId",
    "readingTime",
    "tags",
    "content",
    "state",
  ];

  fields.forEach((field) => {
    if (body[field]) {
      update[field] = body[field];
    }
  });

  if (bodyContent && blogContent !== bodyContent) {
    update.readingTime = Math.ceil(bodyContent / 200);
  }

  if (body.state === "published") {
    update.state = "published";
    update["timeStamp.publishedAt"] = new Date();
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, update, {
    new: true,
  });

  response.status(200).json(updatedBlog);
});

// Deleting a blog
blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(403).json({ error: "You are not authorized" });
  }

  const blogId = request.params.id;

  await Blog.findByIdAndDelete(blogId);

  response.status(204).end();
});

module.exports = blogRouter;
