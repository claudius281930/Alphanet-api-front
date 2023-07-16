const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userRequest = require("../requests/userRequest");

const registerController = {
  pageResister: async (req, res) => {
    //Exibe a pagina de Cadastro;
    return res.render("user/register");
  },
  createRegister: async (req, res) => {
    //Checagem de dados pelo Middleware de rota;
    const errors = validationResult(req);
    //Tratamento de erro;
    try {
      //Validação dos erros ao preencher os campos no formulario de cadastro;
      if (!errors.isEmpty()) {
        //Exite erros. Voltar ao formulario e exibir os erros;
        return res.render("user/register", {
          errors: errors.mapped(),
        });
      }
      let { name, password } = req.body;
      let pswCrypt = bcrypt.hashSync(password, 10);
      //Variavel que amazenará os dados do formulário;
      let user = {
        //Recebe os dados via body do formulário;
        name: name,
        //Recebe os dados via body do formulário;
        password: pswCrypt,
      };
      //Visualizar o valor original da senha que foi salva;
      console.log(bcrypt.compareSync(pswCrypt));
      //Faz uma requisição POST ao controlador da API(Back-end) e cria o usuario;
      const dataUser = await userRequest.createUser(user);
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: "Erro: ao tentar criar o cadastro" });
    }
  },
};
module.exports = registerController;
