const roleModel = require("./../../db/models/role");

const authorization = async (req, res, next) => {
   console.log(req.token);
  try {
   
    if (req.token.role == "Admin") {
      next();
    } else {
     
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    res.status(403).json(err);
  }
};

module.exports = authorization;
