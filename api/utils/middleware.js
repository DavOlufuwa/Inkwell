const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blog = require("../models/blog");
const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token has expired" });
  }

  next();
};

const accessTokenExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.split(" ")[1];
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const verifiedAccessToken = jwt.verify(
    request.token,
    process.env.SECRET_TOKEN_KEY
  );

  if (!verifiedAccessToken.id) {
    return response
      .status(401)
      .json({ error: "accessToken missing or invalid" });
  } else {
    request.user = await User.findById(verifiedAccessToken.id);
  }
  next();
};

const refreshTokenExtractor = async (request, response, next) => {
  const cookies = request.cookies;

  if (!cookies?.jwt) {
    return response.status(403).json({ error: "No cookies found" });
  }

  const refreshToken = cookies.jwt;

  const verifiedRefreshToken = jwt.verify(
    refreshToken,
    process.env.SECRET_REFRESH_KEY
  );

  if (!verifiedRefreshToken.id) {
    return response
      .status(403)
      .json({ error: "refreshToken missing or invalid" });
  } else {
    request.user = await User.findById(verifiedRefreshToken.id);
  }
  next();
};

const paginatedResults = (model) => {
  return async (request, response, next) => {
    const allResults = {};

    const pageNumber = Number(request.query.page);
    const limit = Number(request.query.limit || 20);

    const startIndex = (pageNumber - 1) * limit;
    const endIndex = pageNumber * limit;

    const allBlogs = await model.find({}).populate("user", {
      _id: 1,
      firstName: 1,
      lastName: 1,
    }).limit(limit).skip(startIndex);

    if (endIndex < allBlogs.length) {
      allResults.next = {
        page: pageNumber + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      allResults.previous = {
        page: pageNumber - 1,
        limit: limit,
      };
    }

    allResults.paginatedResults = allBlogs;

    response.json(allResults);

    next();
  };

};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  accessTokenExtractor,
  userExtractor,
  refreshTokenExtractor,
  paginatedResults
};
