const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { allRouter } = require("./router/router");
module.exports = class Aplication {
  #app = express();
  #DB_URI;
  #PORT;

  constructor(PORT, DB_URI) {
    this.#DB_URI = DB_URI;
    this.#PORT = PORT;

    this.configApplication();
    this.connectTOmongoDB();
    this.createServer();
    this.createdRoutes();
    this.errorHandling();
  }

  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname + ".." + "public")));
  }

  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }
  connectTOmongoDB() {
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("connceted to mongodb");
      console.log(error.message);
    });

    mongoose.connection.on("connected", () => {
      console.log("db is connected");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("db is disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }

  createdRoutes() {
    this.#app.use(allRouter);
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        message: "آدرس مورد نظر یافت نشد",
      });
    });

    this.#app.use((error, req, res, next) => {
      const statusCode = error.status || 500;
      const message = error.message || " Internall Error";

      return res.status(statusCode).json({
        status: statusCode,
        message: message,
      });
    });
  }
};
