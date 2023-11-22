const User = require("../models/user");
const { refreshTokenExtractor } = require("../utils/middleware");

const logoutRouter = require("express").Router();

logoutRouter.get("/", refreshTokenExtractor,async (request, response) => {
  
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