const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  const correctPassword =
    user === null ? false : await bcryptjs.compare(password, user.password);

  if (!(user && correctPassword)) {
    return response.status(401).json({
      error: "invalid email or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
    role: user.role
  };

  const accessToken = jwt.sign(userForToken, process.env.SECRET_TOKEN_KEY, {
    expiresIn: 60 * 60,
  });

  const refreshToken = jwt.sign(userForToken, process.env.SECRET_REFRESH_KEY, {
    expiresIn: "1d",
  });

  response
  .status(200)
  .cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  })
  .send({
    email: user.email,
    fullName: `${user.firstName} ${user.lastName}`, 
    accessToken,
  })
});

module.exports = loginRouter