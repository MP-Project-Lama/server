const mongoose = require("mongoose");
require("dotenv").config();



/// get database url from variables enviroment
const DB = process.env.DB



///establish connection 
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


mongoose.connect(`${DB}`, options).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);


