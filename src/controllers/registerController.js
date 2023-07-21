const { validationResult } = require("express-validator");
//const bcrypt = require("bcrypt");
const userRequest = require("../requests/userRequest");

const registerController = {
  pageResister: async (req, res) => {
    //Exibe a pagina de Cadastro;
    return res.render("user/register");
  },
  /* User */
  processRegister: async (req, res) => {
    //Tratamento de erro;
    try {
      //Checar dados os dados pelo Middleware de rota;
      const errors = validationResult(req);
      //Validação dos erros ao preencher os campos no formulario de cadastro;
      if (!errors.isEmpty()) {
        //Exite erros. Voltar ao formulario e exibir os erros;
        return res.render("user/register", {
          errors: errors.mapped(),
        });
      }
      //Pegar dados via formularios;
      let { name, password } = req.body;
      //Criptografar a senha antes de salvar no DB;
      //let hash = bcrypt.hashSync(password, 8);
      //console.log(hash);
      //console.log(bcrypt.compareSync(password, hash));
      //Objeto usuario;
      let user = {
        name: name,
        password: password//hash,
      };
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
