const roleModel = require("./../../db/models/role");


// create a new role in the app by this function : 
const createRole = (req, res) => {
  const { role } = req.body;

  const neweRole = new roleModel({
    role,
  });

  neweRole
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

/// get all roles by this function : 
const getRoles = (req, res) => {
  roleModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
module.exports = { createRole, getRoles };
