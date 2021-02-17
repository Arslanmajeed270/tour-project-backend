var firebase = require("firebase");
const agencyController = require("../controllers/agencyController");
const userController = require("../controllers/userController");
const User = require("../models/userModel");
const AppError = require("./../utils/appError");
const Agency = require("../models/agencyModel");

const FirebasesignIn = async (role, email, password, next) => {
  try {
    let user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    if (user.user.emailVerified == false) {
      return next(new AppError("Please Verify email", 400));
    } else if (user.user.emailVerified == true && role == "user") {
      const DbUser = await User.findOne({ uid: user.user.uid });
      return DbUser;
    } else if (user.user.emailVerified == true && role == "agency") {
      const DbUser = await Agency.findOne({ uid: user.user.uid });
      return DbUser;
    } else {
      next(new AppError("Unkonwn Error", 400));
    }
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    next(new AppError(errorMessage, errorCode));
  }
  // [END auth_signin_password]
};

const FirebasesignUp = async (role, email, password, name, next) => {
  try {
    let user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (role == "user") {
      user = await userController.createUser(user.user.uid, user.user.email);
    } else {
      user = await agencyController.CreateAgency(
        user.user.uid,
        user.user.email,
        name
      );
    }
    sendEmailVerification();
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    next(new AppError(errorMessage, errorCode));
  }
};

const sendEmailVerification = () => {
  // [START auth_send_email_verification]
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      console.log("Email Send");
    });
  // [END auth_send_email_verification]
};

const sendPasswordReset = (email) => {
  // [START auth_send_password_reset]
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Email Send");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  // [END auth_send_password_reset]
};

module.exports.FirebasesignIn = FirebasesignIn;
module.exports.FirebasesignUp = FirebasesignUp;
module.exports.sendEmailVerification = sendEmailVerification;
module.exports.sendPasswordReset = sendPasswordReset;
