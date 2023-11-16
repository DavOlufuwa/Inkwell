const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const {
  initialUser,
  usersInDb,
  initialBlogs,
  blogsInDb,
} = require("./test_helper");
const User = require("../models/user");

let authHeader;

describe("blogs api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    // Create a test user and save its authHeader
    const user = initialUser;
    const userCreate = await api.post("/api/users").send(user);

    const response = await api
      .post("/api/login")
      .send({ email: user.email, password: user.password });

    authHeader = `Bearer ${response.body.accessToken}`;
  }, 100000);

  describe("CRUD test on blogs", () => {
    test("blog can be created", async () => {
      await Blog.deleteMany({});
      const blog = initialBlogs[0];

      await api
        .post("/api/blogs")
        .set("Authorization", authHeader)
        .send(blog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await blogsInDb();
      expect(blogs).toHaveLength(1);
    }, 100000);

    test("blog can be added once more", async () => {
      const newBlog = initialBlogs[1];

      await api
        .post("/api/blogs")
        .set("Authorization", authHeader)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await blogsInDb();
      expect(blogs).toHaveLength(2);
    }, 100000);

    test("blog cannot be added without authorization", async () => {
      const unauthorizedBlog = initialBlogs[2];
      await api.post("/api/blogs").send(unauthorizedBlog).expect(401);
    }, 100000);

    test("blog reading time is different", async () => {
      const veryLongBlog = initialBlogs[3];

      const response = await api
        .post("/api/blogs")
        .set("Authorization", authHeader)
        .send(veryLongBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const result = response.body;
      expect(result.readingTime).toBeDefined();
      expect(result.readingTime).toBeGreaterThan(2);
    }, 100000);

    test("blog can be gotten", async () => {
      const allBlogs = await blogsInDb();

      expect(allBlogs).toHaveLength(3);

      expect(allBlogs[0].title).toEqual(initialBlogs[0].title);
    }, 100000);

    test("blog can be deleted", async () => {
      const allBlogs = await blogsInDb();
      const formerBlog = allBlogs[0];

      await api.delete(`/api/blogs/${formerBlog.id}`).set("Authorization", authHeader);

      const blogs = await blogsInDb();

      expect(blogs).toHaveLength(2);
    }, 100000)

    test("blog can be updated", async () => {
      const allBlogs = await blogsInDb();

      const formerBlog = allBlogs[0];

      const updatedBlog = {
        ...initialBlogs[0],
        title: "updated title",
        state: "published"
      }

      await api
        .put(`/api/blogs/${formerBlog.id}`)
        .set("Authorization", authHeader)
        .send(updatedBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    }, 100000);

    test("blog can be searched", async () => {
      
      const query = "Remote Work"
      const response = await api
        .get(`/api/blogs/?search=${query}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      
        console.log(response.body)
    }, 100000)
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
