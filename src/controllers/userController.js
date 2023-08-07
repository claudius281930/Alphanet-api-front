const userRequest = require("../requests/userRequest");

const userController = {
  // Renderize a página de login;
  pageLogin: async (req, res) => {
    //Exibe a pagina de Login;
    return res.render("user/login");
  },
  // Processa o LOGIN
  processLogin: async (req, res) => {
    try {
      //Receber os dados via body(corpo da requisição);
      const { name, password } = req.body;

      //Faz a REQUISIÇÃO junto ao AXIOS para o controlador serve-side. Passando os dados a ser consultados;
      const user = await userRequest.processLogin(
        { name, password },
        { withCredentials: true }
      );
      // Extrai os dados do usuario que veio da RESPONSE do servdor;
      const userData = user;

      // Extrai apenas o NOME vindo;
      //{name} = userData.data.user;
      const nameUser = userData.data.user.name;
      //console.log(nameUser);

      //Verificação atraves do status code;
      if (userData.status === 200) {
        console.log(req.session.user);
        // Tudo certo. Exibe a pagina do Perfil. Utiliza a variavel user para acessar os dados na pagina ejs;
        return res.render("user/profile", { user: nameUser });
      } else {
        return res.send("Dados não são compativéis!");
      }
      // PARTE 2;
      //let sessionUser = req.session.user;
    } catch (error) {
      console.error(error);
      return res.send("Erro: dados incorretos");
    }
  },
  // Renderize a página de perfil. Precisa-se criar uma sessão para que os dados da função processLogin seja utilizados no perfil sem dar erro de "path";
  profile: async (req, res) => {
    try {
      //Extrai da RESPONSE do servidor os dados do ususario da sessão;
      let sessionUser = req.session.user;
      console.log(sessionUser);
      //Verifica se o status code para este usuario foi 200;
      if (sessionUser.status === 200) {
        return res.render("user/profile", { user: sessionUser });
      }
    } catch (error) {
      console.error(error);
      return res.redirect("/login")//send("Falha na resposta do servidor.");
    }
  },
};

module.exports = userController;
