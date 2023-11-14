const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("express-async-errors");
require("events").EventEmitter.defaultMaxListeners = 15;
const mongoose = require("mongoose");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  accessTokenExtractor,
  refreshTokenExtractor,
} = require("./utils/middleware");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/authenticator");
const {MONGODB_URI} = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");
const logoutRouter = require("./controllers/logout");
const refreshRouter = require("./controllers/refresh");

const app = express();

mongoose.set("strictQuery", false);
logger.info(`connecting to ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI)
.then(()=> logger.info("connected to MongoDB Database"))
.catch((error) => {
  logger.error("error connecting to MongoDB:", error.message);
})


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(requestLogger);
app.use(accessTokenExtractor);
app.use('/api/users', userRouter)
app.use('api/login', loginRouter)
app.use('api/blogs', blogRouter)
app.use('api/logout', logoutRouter)
app.use('api/refresh', refreshRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;
