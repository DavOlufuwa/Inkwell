const User = require("../models/user");
const userRouter = require("express").Router();
const bcryptjs = require("bcryptjs");

// GET ALL USERS 
userRouter.get("/", async (request, response) => {
  const users = await User.find({})
  response.json(users)
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
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = userRouter