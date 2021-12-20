const userModel = require("./../../db/models/user");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");



// this get the SALT for encrypt the password , from .env 
const SALT = Number(process.env.SALT);

// this is the secret key , from .env
const SECRET = process.env.SECRET;



const signUp = async (req , res) => {
    const { email, username, password, avatar, role } = req.body;

    const emailToLowerCase = email.toLowerCase();
    const usernameToLowerCase = username.toLowerCase();
    
    const existUser = await userModel.findOne({
      $or: [{ email: emailToLowerCase }, { username: usernameToLowerCase }],
    });

    if (!existUser) {
        const hashedPassword = await bcrypt.hash(password, SALT);
        
    }


}