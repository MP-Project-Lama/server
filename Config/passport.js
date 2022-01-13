const userModel = require("../db/models/user")
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth2").Strategy;


dotenv.config();

// Get SECRET_KEY variable from .env
const SECRET = process.env.SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const email = profile.email.toLowerCase();

      const user = await userModel.findOne({ email }).populate("role");

      if (user) {
        console.log(user);
        if (user.auth == profile.provider && user.googleId == profile.id) {
          const payload = {
            id: user._id,
            email: user.email,
            name: user.username,
            role: user.role.role,
          };

          const options = {
            expiresIn: "5h",
          };

          const token = jwt.sign(payload, SECRET, options);

          return done(null, { result: user, token });
        } else {
          return done(null, { message: "Email is already taken!!" });
        }
      } else {
        const newUser = new userModel({
          email: email,
          username: profile.given_name,
          avatar: profile.picture,
          role: process.env.USER_ROLE,
          isActive: true,
          auth: profile.profile,
          googleId: provider.id,
        });

        newUser.save().then(async (result) => {
          const res = await userModel
            .findOne({ _id: result._id })
            .populate("role");

          const payload = {
            id: res._id,
            email: res.email,
            name: res.name,
            role: res.role.role,
          };

          const options = {
            expiresIn: "5h",
          };

          const token = jwt.sign(payload, SECRET, options);

          return done(null, { result: res, token });
        });
      }
      return done(null, { profile });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});