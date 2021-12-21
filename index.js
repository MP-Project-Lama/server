const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");



// initiating the app
const app = express();
/// app-level middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));



//  middleware for role routers
const rolesRouter = require("./routers/routes/role");
app.use(rolesRouter);

//// create a middleware for user router
const usersRouter = require("./routers/routes/user");
app.use(usersRouter);

//// create a middleware for post router
const postsRouter = require("./routers/routes/post");
app.use(postsRouter);

///// create a middleware for comments routers
const commentsRouter = require("./routers/routes/comment");
app.use(commentsRouter);

///// create a middleware for collections routers
const collectionsRouter = require("./routers/routes/collection");
app.use(collectionsRouter);


/// Set PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started On : ${PORT}`);
});
