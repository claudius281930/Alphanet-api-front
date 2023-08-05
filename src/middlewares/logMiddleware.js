// const jwt = require("jsonwebtoken");
// const { promisify } = require("util");
// const secretKey = "meuProjetoProvider";

const userRequest = require("../requests/userRequest");
const bcrypt = require("bcrypt");

const eUser = {
  eUser: async (req, res, next) => {
    // Utiliza os dados amazenados no req para autentição;
    const { name, password } = req.body;
    //Buscou no banco por um registro;
    const user = await userRequest.processLogin({ name, password });
    // Extrai o valor do campo nome;
    const userDataName = user.data.user.name;
    // Extrai o valor do campo password;
    const userDataPsw = user.data.user.password;
    //Tratamento de erro;
    try {
      //Extrai o nome do usuario que esta no campo nome;
      const nameUser = userDataName;
      // Compara as duas senhas;
      const hashPsw = bcrypt.compareSync(password, userDataPsw);
      // Verifica se os dados do req e base são os mesmos;
      if (nameUser) {
        if (hashPsw) {
          return next();
        } else {
          return res.status(404).json({ msg: "Credenciais inválidas!" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ msg: "Login mal-sucedido." });
    }
  },
};

module.exports = eUser;
