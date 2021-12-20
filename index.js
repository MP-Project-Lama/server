const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./db");
const morgan = require("morgan");
const cors = require("cors");


/// app-level middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//  middleware for role routers
const rolesRouter = require("./routers/routes/role");
app.use(rolesRouter);

//// create a middleware for user router
const usersRouter = require("./routers/routes/user");
app.use(usersRouter);

/// Set PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started On : ${PORT}`);
});
