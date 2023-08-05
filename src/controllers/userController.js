const userRequest = require("../requests/userRequest");

const userController = {
  // Renderize a página de login aqui
  pageLogin: async (req, res) => {
    //Exibe a pagina de Login;
    return res.render("user/login");
  },
  // Processa o LOGIN
  processLogin: async (req, res) => {
    const { name, password } = req.body;
    //console.log(req.body);
    const user = await userRequest.processLogin({ name, password });
    // Extrai os dados do usuario que veio do back_end;
    const userData = user;
    console.log(userData);
    //Verifica se os valores das credenciais(name e password) correspondem;
    if (userData.status === 200) {
      return res.render("user/profile");
    } else {
      return res.send("Dados não são compativéis!");
    }
  },
  // Renderize a página de perfil se login bem-sucedido
  profile: async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    const userNameProfile = await userRequest.profile({ name });

    const userFindName = userNameProfile;
    if (userFindName.name === name) {
      return res.redirect("/profile");
    }
  },
};

module.exports = userController;
