const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig"); // Ensure dbConfig is correctly setting up the database connection
app.use(express.json());

const usersRoute = require("./routes/userRoute");
const moviesRoute = require("./routes/moviesRoute");

// Correct the route setup for moviesRoute
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Node Js server is running on port ${port}`)
);
