const winston = require("winston");
const morgan = require("morgan");

morgan.token("req[body]", (req, res) => {
  return req.body 
});

const winstonLogger = winston.createLogger({
  level: "verbose",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});


