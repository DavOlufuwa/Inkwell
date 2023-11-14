const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");


// Get all blogs
blogRouter.get("/", async (request, response) => {
  const { page, limit, search } = request.query;

  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);


  const searchQuery = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
          { tags: { $regex: search, $options: "i" } },
          {
            $or: [
              { "author.firstName": { $regex: new RegExp(search, "i") } },
              { "author.lastName": { $regex: new RegExp(search, "i") } },
            ],
          },
        ],
      }
    : {};

  const startIndex = (pageNumber - 1) * pageSize;


  const allBlogs = await Blog.find({...searchQuery}).populate("user", {
    _id: 1,
    firstName: 1,
    lastName: 1,
  }).limit(pageSize).skip(startIndex);

  const totalCount = await Blog.countDocuments({...searchQuery});

  const results = {
    currentPage: pageNumber,
    totalPages: Math.ceil(totalCount / pageSize),
    totalBlogs: totalCount,
    paginatedResults: allBlogs
  }

  if(startIndex + pageSize < totalCount) {
    results.next = {
      page: pageNumber + 1,
      limit: pageSize
    }
  }

  if(startIndex > 0) {
    results.previous = {
      page: pageNumber - 1,
      limit: pageSize
    }
  }

  response.status(200).json(results);
});


// Creating a new blog
blogRouter.post("/", userExtractor, async (request, response) => {
  const user = request.user;
  const body = request.body;

  const readTime = () => {
    const avgWordsPerMinute = 200;
    const wordCount = body.content.match(/\w+/g).length;
    return Math.ceil(wordCount / avgWordsPerMinute);
  };

  const blog = new Blog({
    title: body.title,
    description: body.description,
    tags: body.tags,
    author: user.id,
    content: body.content,
    readingtime: readTime(),
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);

  await user.save();

  response.status(201).json(savedBlog);
});

//Updating a blog post
blogRouter.put("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  if(!user) {
    return response.status(403).json({ error: "You are not authorized" });
  }

  const blogId = request.params.id;
  const body = request.body;

  const blog = await Blog.findById(blogId);
  const blogContent = blog.content.match(/\w+/g).length;
  const bodyContent = body.content.match(/\w+/g).length;

  const update = {}

  const fields = ["title", "description", "readingtime" ,"tags", "content", "state"];

  fields.forEach(field => {
    if (body[field]) {
      update[field] = body[field];
    }
  });

  if(blogContent !== bodyContent) {
    update.readingtime = Math.ceil(bodyContent / 200);
  }

 if (body.state === "published") {
   update.state = "published";
   update["timeStamp.publishedAt"] = new Date();
 }

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, update, { new: true });

  response.status(204).json(updatedBlog);
})


// Deleting a blog
blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  if(!user) {
    return response.status(403).json({ error: "You are not authorized" });
  }

  const blogId = request.params.id;

  await Blog.findByIdAndDelete(blogId);

  response.status(204).end()
})


module.exports = blogRouter