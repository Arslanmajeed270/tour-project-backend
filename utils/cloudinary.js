var cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const Upload = async (role, file, name) => {
  try {
    const url = await cloudinary.uploader.upload(file, {
      public_id: `${role}/${name}`,
    });
    return url.secure_url;
  } catch (err) {
    console.log(err);
  }
};

const Delete = (url) => {
  const num = url.lastIndexOf("/");
  const num1 = url.lastIndexOf("/", num - 1);
  const image = url.substring(num1 + 1);

  cloudinary.uploader.destroy(image, function (result) {
    console.log(result);
  });
};

module.exports.Upload = Upload;
module.exports.Delete = Delete;
