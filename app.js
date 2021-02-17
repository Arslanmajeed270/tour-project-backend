const mongoose = require("mongoose");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const morgan = require("morgan");
var Database = require("./config");
const firebase = require("firebase");
const helmet = require("helmet");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");
var usersRouter = require("./routes/userRoutes");
var agencyRouter = require("./routes/agencyRoute");
var tourRouter = require("./routes/tourRoute");
var reviewRouter = require("./routes/reviewRoutes");
const AppError = require("./utils/appError");

var app = express();

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

app.use("/users", usersRouter);
app.use("/agency", agencyRouter);
app.use("/agency/tour", tourRouter);
app.use("/users/tour", reviewRouter);

// catch 404 and forward to error handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

var firebaseConfig = {
  apiKey: "AIzaSyBgwelLC90Igs56saAIKngamwQHwMKwkgE",
  authDomain: "biko-e8799.firebaseapp.com",
  databaseURL: "https://biko-e8799.firebaseio.com",
  projectId: "biko-e8799",
  storageBucket: "biko-e8799.appspot.com",
  messagingSenderId: "445298354293",
  appId: "1:445298354293:web:6731332e0649bb5308703c",
  measurementId: "G-JNVF45X143",
};

firebase.initializeApp(firebaseConfig);

const connect = mongoose.connect(Database.URL, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

module.exports = app;
