//const userRequest = require("../requests/userRequest"); //Usuario na Basa;

const mainUserController = {
  pageResister: async (req, res) => {
    res.render("register");
  },
  pageLogin: async (req, res) => {
    res.render("login");
  },
  registerUser: async (req, res) => {
    //  let user = {
    //   name : req.body.name,
    //   email: req.body.email,
    //   password : req.body.password,
    // };
    //     try {
    //     } catch (error) {}
  },
};

module.exports = mainUserController;
