const bcrypt = require("bcrypt");

const userRequest = require("../requests/userRequest");

const userController = {
  pageLogin: async (req, res) => {
    //Exibe a pagina de Login;
    return res.render("user/login");
  },
  processLogin: async (req, res) => {
    let { name, password } = req.body;
    let user = {
      name: name,
      password: password,
    }
    let userSave = await userRequest.loginUser(user);
    

    if (name != userSave.name && !bcrypt.compareSync(password, userSave.password)) {
      return res.send("Usuário inválido!");
    }

    // if (!) {
    //   return res.send("Senha inválida!");
    // }

    //req.session.user = userSave;

    // if (logado != "undefined") {
    //   req.cookie("logado", userSave.name, { maxAge: 20000 });
    // }

    res.redirect("/boxes");
  },
};

module.exports = userController;
