//Import da biblioteca;
const { check } = require("express-validator");
//Armazena os dados checados;
const validations = [
  check("name")
    .isString()
    .notEmpty()
    .withMessage("inválido")
    //Customizando a checagem do campo nome;
    .custom((value) => {
      //REGEX somente letras;
      if (!/^[\p{L}\s]+$/u.test(value)) {
        const error = new Error('O campo "Nome" deve conter apenas letras');
        //Tratando e lançando o NOVO Error
        throw error;
      }
      //Não há erros;
      return true;
    }),
  //Pelo menos uma letra ao criar uma senha /[a-zA-Z]/ ;
  check("password")
    .notEmpty()
    .withMessage("inválido")
    .bail()
    .isLength({ min: 3 })
    .trim(),
];
module.exports = validations;
