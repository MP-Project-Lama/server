const express = require("express");
 require('dotenv').config();
const morgan = require("morgan");
const cors = require("cors");



 const app = express();

 const PORT= process.env.PORT || 5000;



 app.listen(PORT, () => {
   console.log(`Server Started On : ${PORT}`);
 });