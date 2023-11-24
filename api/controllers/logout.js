const User = require("../models/user");
const { userExtractor, refreshTokenExtractor } = require("../utils/middleware");

const logoutRouter = require("express").Router();

logoutRouter.get("/", refreshTokenExtractor, async (request, response) => {
  
  const user = await User.findOne({email: request.user.email});

  user.refreshToken = "";

  await user.save();

  response
    .clearCookie("jwt", {
      httpOnly: true,
      SameSite: "None",
      secure: false,
    })
    .status(204)
    .send();
})

module.exports = logoutRouter