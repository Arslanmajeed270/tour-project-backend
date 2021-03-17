const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./routes/userRoutes.js",
  "./routes/agencyRoute.js",
  "./routes/tourRoute.js",
  "./routes/reviewRoutes.js",
  "./routes/bookingRoute.js",
  "./routes/homeRoute.js",
  "./routes/userRoutes.js",
];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  //   require("./bin/www");
});
