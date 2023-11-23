const jwt = require("jsonwebtoken");
const refreshRouter = require("express").Router();
const { refreshTokenExtractor } = require("../utils/middleware");

refreshRouter.get("/", refreshTokenExtractor, async (request, response) => {
  const user = request.user;
  const userForToken = {
    email: user.email,
    id: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(userForToken, process.env.SECRET_TOKEN_KEY, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({
    id: user.id,
    email: user.email,
    role: user.role,
    fullName: `${user.firstName} ${user.lastName}`,
    accessToken,
  });
});

module.exports = refreshRouter