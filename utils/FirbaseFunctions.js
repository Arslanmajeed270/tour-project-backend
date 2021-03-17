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

    if (role == "user") {
      const DbUser = await User.findOne({ uid: user.user.uid });
      return DbUser;
    } else if (role == "agency") {
      const DbUser = await Agency.findOne({ uid: user.user.uid });
      return DbUser;
    } else {
      return next(new AppError("Unkonwn Error", 400));
    }
  } catch (error) {
    var errorCode = 400;
    var errorMessage = error.message;
    return next(new AppError(errorMessage, errorCode));
  }
  // [END auth_signin_password]
};

const FirebasesignUp = async (role, email, password, name, next) => {
  try {
    let user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (role == "user") {
      const newUser = await userController.createUser(
        user.user.uid,
        email,
        name
      );

      console.log(newUser);
      return newUser;
    } else {
      const newUser = await agencyController.CreateAgency(
        user.user.uid,
        email,
        name
      );
      console.log(newUser);
      return newUser;
    }
    // sendEmailVerification();
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    return next(new AppError(errorMessage, errorCode));
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
