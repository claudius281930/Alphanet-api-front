const { validationResult } = require("express-validator");
const userRequest = require("../requests/userRequest");

const userController = {
  pageResister: async (req, res) => {
    //Exibe a pagina de Cadastro;
    return res.render("user/register");
  },
  pageLogin: async (req, res) => {
    //Exibe a pagina de Login;
    return res.render("user/login");
  },
  createRegister: async (req, res) => {
    //Checagem de dados pelo Middleware de rota;
    const errors = validationResult(req);
    //console.log(errors.mapped());
    //Tratamento de erro;
    try {
      //Validação dos erros ao preencher os campos no formulario de cadastro;
      if (!errors.isEmpty()) {
        //Exite erros. Voltar ao formulario e exibir os erros;
         //console.log(errors.mapped())
        return res.render("user/register", {
          errors: errors.mapped(),
        });
      } 
      //Constante que amazenará os dados do formulário;
      let user = {
        //Recebe os dados via body do formulário;
        name: req.body.name,
        password: req.body.password,
      };
        //Faz uma requisição POST ao controlador da API(Back-end) e cria o usuario;
        const dataUser = await userRequest.createUser(user);
        console.log(dataUser.data);
        res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Erro: ao tentar criar o cadastro" });
    }
  },
};

module.exports = userController;
