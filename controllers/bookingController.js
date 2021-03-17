const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const uploadUtil = require("../utils/cloudinary");
const factory = require("./handlerFactory");

// works
exports.createBooking = factory.createOne(Booking);
