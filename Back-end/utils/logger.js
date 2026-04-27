import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Always log to console (Docker captures this)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Save errors to file on EC2
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    // Save all logs to file
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

export default logger;