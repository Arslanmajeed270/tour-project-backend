// section to store img or documents in firbase storage

var admin = require("firebase-admin");
var serviceAccount = require("../config.json");
const { v4: uuidv4 } = require("uuid");

const uuid = uuidv4();
const folder = "BookingUser";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://biko-e8799.firebaseio.com",
});

var bucket = admin.storage().bucket("gs://biko-e8799.appspot.com");

// you can also create folder in budget by changing the name of file below

const upload = (localFile, Filename) => {
  var options = {
    gzip: true,
    destination: `${folder}/${Filename}`,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
    },
  };

  return bucket.upload(localFile, options).then((data) => {
    let file = data[0];

    return Promise.resolve(
      "https://firebasestorage.googleapis.com/v0/b/" +
        bucket.name +
        "/o/" +
        encodeURIComponent(file.name) +
        "?alt=media&token=" +
        uuid
    );
  });
};

module.exports.upload = upload;
// upload("C:\\Users\\user\\Desktop\\portfolio_v2-master\\2.jpg", "sa.jpg").then(
//   (downloadURL) => {
//     console.log(downloadURL);
//   }
// );
