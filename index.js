const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const socket = require("socket.io");
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
const { Socket } = require("socket.io");
app.use(collectionsRouter);

/// Set PORT
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Started On : ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Socket connect successfully");
  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`${data.username} has entered the room `);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", {
      username: data.username,
      content: data.content,
    });
  });
});
