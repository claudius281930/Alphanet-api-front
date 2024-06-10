//Import da biblioteca;
const { check } = require("express-validator");
//Armazena os dados checados;
const validations = [
  check("name")
    .isString()
    .notEmpty()
    .withMessage("inválido")
    //Customizando a checagem do campo nome;
    .custom((value, { req }) => {
      //REGEX somente letras e com letra maiuscula /^[\p{Lu}\s]+$/u;
      const regexName = /^[\p{L}\s]+$/u;
      if (!regexName.test(value)) {
        const error = new Error('O campo "Nome" deve conter apenas letras');
        //Tratando e lançando o NOVO Error
        throw error;
      }
      //Não há erros;
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("inválido")
    .custom((value, { req }) => {
      //Pelo menos uma letra ao criar uma senha /[a-zA-Z]/ ;
      const regexPsw = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).+$/; // ^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).+$;

      if (!regexPsw.test(value)) {
        const error = new Error(
          'O campo "Senha" deve conter ao menos um(a) letra, numero e caractere especial'
        );
        //Tratando e lançando o NOVO Error
        throw error;
      }
      //Não há erros;
      return true;
    })
    // Garantir que um campo não seja validado desnecessariamente;
    .bail()
    .isLength({ min: 6 })
    // Remover espaços em branco;
    .trim(),
];
module.exports = validations;
