const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const usersRoute = require("./routes/userRoute");

app.use("/api/users", usersRoute);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Node Js server is running on port ${port}`)
);
