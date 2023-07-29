const userRequest = require("../requests/userRequest");
const jwt = require("jsonwebtoken");
const secretKey = "meuProjetoProvider";

const userController = {
  pageLogin: async (req, res) => {
    //Exibe a pagina de Login;
    return res.render("user/login");
  },
  processLogin: async (req, res) => {
    const user = {
      name: req.body.name,
      password: req.body.password,
    };
    try {
      const userData = await userRequest.processLogin(user);
      console.log(userData.name);

      if (user.name !== userData.name && user.password !== userData.password) {
        // Gerar o token JWT; 
        const token = jwt.sign({ name: userData.name }, secretKey, {
          algorithm: "HS256",
          //admin: userData.isAdmin,
          //Token expira em 1 hora;
          expiresIn: 30000//30seg,
        });
        const userLoggedComplete = {
          id: userData.id,
          name: userData.name,
          admin: userData.admin,
          //Endoded;
          token,
        };
        // Autenticação bem-sucedida;
        res.status(200).json({
          msg: "Login bem-sucedido",
          userLoggedComplete,
        });
      } else {
        return res.send("Erro: Credenciais inválidas.");
      }
    } catch (error) {
      console.error(error);
      return res.send("Erro: Requisição mau-sucedida!");
    }
  },
  pageProfile: async (req, res) => {
    const user = req.body;
    // Exibir a pagina e informações sobre o perfil do usuário
    return res
      .status(200)
      .json({ mgs: "Sou a pagina restrita 'profile'!", user });
    // return res.render("profile", { user });
  },
};

module.exports = userController;
