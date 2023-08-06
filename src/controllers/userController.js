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
    // Extrai os dados do usuario que veio do servidor;
    const userData = user;
    // Extrai apenas o NOME;
    let nameUser = userData.data.user.name;
    //Verifica se os valores das credenciais(name e password) correspondem;
    if (userData.status === 200) {
      return res.render("user/profile", { user: nameUser });
    } else {
      return res.send("Dados não são compativéis!");
    }
  },
  // Renderize a página de perfil se login bem-sucedido
  profile: async (req, res) => {
    /*try {
      const { name } = req.body;
      // Validação do NOME do usuário;
      if (!name || typeof name !== "string") {
        return res.status(400).json({ mgs: "Nome de usuário inválido." });
      }
      // Pesquisar usuário;
      const userNameProfile = await User.findOne({
        where: {
          name: { [db.Sequelize.Op.like]: `%${name}%` },
        },
        order: [["name", "desc"]],
      });
      // Verificar se o usuário foi encontrado;
      const userFindName = userNameProfile;
      if (userFindName) {
        return res.status(200).json({
          msg: "Usuario encontrado!",
          page: "'Profile'",
          userFindName,
        });
      } else {
        return res
          .status(404)
          .json({ mgs: "Usuario inválido ou não encontrado!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mgs: "erro no servidor" });
    }*/
  },
};

module.exports = userController;