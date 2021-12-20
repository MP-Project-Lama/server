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
        
        let activeCode= "";
        const activeCharacters = "0123456789";
        for(let i = 0; i < 4; i++){
            activeCode += activeCharacters.charAt(Math.floor(Math.random() * activeCharacters.length));


        }
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user : process.env.EMAIL,
                pass : process.env.WORD 
            }
        });
        const newUser = new userModel({
          email: emailToLowerCase,
          username: usernameToLowerCase,
          password: hashedPassword,
          avatar,
          resetCode: " ",
          activeCode,
          role
        });
        newUser.save().then((result)=> {
            res.status(201).json(result);
            transporter.sendMail({
              from: process.env.EMAIL,
              to: emailToLowerCase,
              subject: " Email Confirmation",
              html: `<h3> Hello ${usernameToLowerCase}</h3>
        
          <p>  Your Verifiction Code : [ ${activeCode} ] </p>
          <h4> Thank You </h4>
          `,
            }).catch((error)=> {
                res.status(400).json(error)
            })
        })
    } else {
        res.send({ message : " Email or Username Already Exist !"})
    }


}



module.exports  = {signUp}