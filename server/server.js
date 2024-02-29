const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());


const usersRoute = require("./routes/userRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute");

app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);

const port = process.env.PORT || 5000;

const path = require("path");
app.listen(port, () =>
  console.log(`Node JS Server is running on port ${port}`)
);