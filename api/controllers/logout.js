const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

const logoutRouter = require("express").Router();

logoutRouter.get("/", userExtractor, async (request, response) => {
  
  const user = await User.findOne({email: request.user.email});

  user.refreshToken = "";

  await user.save();

  response.status(204)
  .clearCookie("jwt", {
    httpOnly: true,
    SameSite: "none",
    secure: false
  })
  .send();
})

module.exports = logoutRouter