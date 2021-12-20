const express = require("express");
require('dotenv').config();
const app = express();
const db = require("./db");
const morgan = require("morgan");
const cors = require("cors");

 const PORT= process.env.PORT || 5000;

/// app-level middleware 
app.use(express.json());

 app.listen(PORT, () => {
   console.log(`Server Started On : ${PORT}`);
 });