const roleModel = require("./../../db/models/role");

const designerAuthorization = async (req, res, next) => {
//   console.log(req.token);
  try {
    if (req.token.role == "Designer") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden! Only for designers" });
    }
  } catch (err) {
    res.status(403).json(err);
  }
};

module.exports = designerAuthorization;
