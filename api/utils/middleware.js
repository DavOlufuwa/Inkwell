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
    return response
      .status(400)
      .send({ error: "could not save a value to path" });
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

// SearchByTitle
const searchByTitle = (request, response, next) => {
  const { search } = request.query;
  request.titleSearchQuery = search
    ? {
        state: "published",
        title: {
          $regex: search,
          $options: "i",
        },
      }
    : {};
  next();
};

const searchByAuthor = (request, response, next) => {
  const { search } = request.query;
  request.authorSearchQuery = search
    ? {
        state: "published",
        $or: [
          { "author.firstName": { $regex: new RegExp(search, "i") } },
          { "author.lastName": { $regex: new RegExp(search, "i") } },
        ],
      }
    : {};

  next();
};

const searchByTags = (request, response, next) => {
  const { search } = request.query;
  request.tagsSearchQuery = search
    ? {
        state: "published",
        tags: {
          $in: search
            .split(/[,\s]+/)
            .filter((tag) => tag.trim() !== "")
            .map((tag) => new RegExp(tag.trim(), "i")),
        },
      }
    : { tags: new RegExp(search, "i") };

  next();
};

const generateResults = (request, response, next) => {
  const { pageNumber, pageSize, totalCount, allBlogs } = request;

  response.results = {
    currentPage: pageNumber,
    totalPages: Math.ceil(totalCount / pageSize),
    totalBlogs: totalCount,
    paginatedResults: allBlogs,
  };

  next();
};

const setPaginationLinks = (request, response, next) => {
  const { startIndex, pageSize, totalCount, pageNumber } = request;
  const { results } = response.locals;

  if (startIndex + pageSize < totalCount) {
    results.next = {
      page: pageNumber + 1,
      limit: pageSize,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: pageNumber - 1,
      limit: pageSize,
    };
  }

  next();
};



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  accessTokenExtractor,
  userExtractor,
  refreshTokenExtractor,
  searchByTitle,
  searchByAuthor,
  searchByTags,
  generateResults,
  setPaginationLinks,
};
