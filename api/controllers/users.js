const User = require("../models/user");
const Blog = require("../models/blog");
const userRouter = require("express").Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { userExtractor } = require("../utils/middleware");

// GET ALL USERS 
userRouter.get("/", async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

// GET USER BY ID
userRouter.get("/:id", userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(404).json({
      error: "user not found"
    })
  }

  const gottenUser = await User.findById(user.id)
  response.json(gottenUser)

})

// SIGN UP A NEW USER
userRouter.post("/", async (request, response) => {
  const {email, firstName, lastName, password} = request.body

  // Checking for duplicate emails in the database
  const existingEmail = await User.findOne({email})
  if (existingEmail) {
    return response.status(409).json({
      error: "email already in use"
    })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    email,
    firstName,
    lastName,
    password : passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.delete("/:id", userExtractor, async (request, response) => {

  const user = request.user
  if (!user) {
    return response.status(401).json({
      error: "Unauthorized Action"
    })
  }

  const session = await mongoose.startSession()
  session.startTransaction()

  
  const userToDelete = await User.findById(user.id)
  
  await Blog.deleteMany({ "author": userToDelete.id }, { session: session })

  await User.findByIdAndDelete(userToDelete.id, { session: session })

  await session.commitTransaction()
  session.endSession()

  response.status(204).end()
})


module.exports = userRouter