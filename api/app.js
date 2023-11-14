const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("events").EventEmitter.defaultMaxListeners = 15;
const mongoose = require("mongoose");


const app = express();

mongoose.set("strictQuery", false);


app.use(express.json());
app.use(cors());



module.exports = app;
