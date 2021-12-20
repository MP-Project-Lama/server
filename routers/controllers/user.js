const userModel = require("./../../db/models/user");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// this get the SALT for encrypt the password , from .env
const SALT = Number(process.env.SALT);

// this is the secret key , from .env
const SECRET = process.env.SECRET;

const signUp = async (req, res) => {
  const { email, username, password, avatar, role } = req.body;

  const emailToLowerCase = email.toLowerCase();
  const usernameToLowerCase = username.toLowerCase();

  const existUser = await userModel.findOne({
    $or: [{ email: emailToLowerCase }, { username: usernameToLowerCase }],
  });

  if (!existUser) {
    const hashedPassword = await bcrypt.hash(password, SALT);

    let activeCode = "";
    const activeCharacters = "0123456789";
    for (let i = 0; i < 4; i++) {
      activeCode += activeCharacters.charAt(
        Math.floor(Math.random() * activeCharacters.length)
      );
    }
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD,
      },
    });
    const newUser = new userModel({
      email: emailToLowerCase,
      username: usernameToLowerCase,
      password: hashedPassword,
      avatar,
      resetCode: " ",
      activeCode,
      role,
    });
    newUser.save().then((result) => {
      res.status(201).json(result);
      transporter
        .sendMail({
          from: process.env.EMAIL,
          to: emailToLowerCase,
          subject: " Email Confirmation",
          html: `<h3> Hello ${usernameToLowerCase}</h3>
        
          <p>  Your Verifiction Code : [ ${activeCode} ] </p>
          <h4> Thank You </h4>
          `,
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  } else {
    res.send({ message: " Email or Username Already Exist !" });
  }
};

/// verify the account (active email) by this function
const verifyEmail = async (req, res) => {
  const { id, code } = req.body;

  const user = await userModel.findById(id);
  if (user) {
    if (user.activeCode == code) {
      userModel
        .findByIdAndUpdate(
          id,
          { isActive: true, activeCode: "" },
          { new: true }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } else {
      res.status(404).json("Incorrect Confirmation Code! ");
    }
  }
};

/// login function
const login = (req, res) => {
  const { identity, password } = req.body;

  userModel
    .findOne({
      $or: [{ email: identity }, { username: identity }],
    })
    .populate("role")
    .then(async (result) => {
      if (result) {
        if (result.isDel === false) {
          if (result.email == identity || result.username == identity) {
            if (result.isActive == true) {
              const savedPassword = await bcrypt.compare(
                password,
                result.password
              );

              if (savedPassword) {
                const payload = {
                  id: result._id,
                  email: result.email,
                  username: result.username,
                  isDel: result.isDel,
                  role: result.role,
                };

                const options = {
                  expiresIn: "7d",
                };
                const token = jwt.sign(payload, SECRET, options);

                res.status(201).json({ result, token });
              } else {
                res
                  .status(400)
                  .json({ message: "Incorrect Username or Password !" });
              }
            } else {
              res
                .status(403)
                .json({ message: "This Email Is Not Activated Yet !" });
            }
          } else {
            res
              .status(404)
              .json({ message: " Email Or Username Doesn't Exist !" });
          }
        }
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

//// get user
const getMyAccount = (req, res) => {
  const { id } = req.params;
  userModel
    .findOne({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: " There Is No User With This ID !" });
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

/// this function for admin , it's to get all users in the app that didn't delete their accounts
const getAllUsers = (req, res) => {
  userModel
    .find({ isDel: false })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//// this function to edit user info in the app
const editInfo = async (req, res) => {
  const { avatar, password } = req.body;

  let hashedPassword = "";
  if (password) {
    hashedPassword = await bcrypt.hash(password, SALT);
  }

  const user = await userModel.findOne({ _id: req.token.id });
  userModel
    .findByIdAndUpdate(
      req.token.id,
      {
        password: password ? hashedPassword : user.password,
        avatar: avatar ? avatar : user.avatar,
      },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: " There Is No User With This ID !" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { signUp, verifyEmail, login, getMyAccount, getAllUsers };
