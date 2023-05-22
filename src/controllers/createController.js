const moment = require('moment');
const createRequest = require("../requests/createRequests/createBoxRequest");

const createController = {
    //Home form create
    homeFormCreateBox: (req,res) => {
        res.render("create-box-form");
      },
    //Creating...
    create: async (req, res) => {
        const msgSucesso = "Caixa criada com sucesso!"
        const formattedData = moment(dateModify, 'DD/MM/YYYY').format('YYYY/MM/DD');
        let body = {
        dateModify: formattedData.req.body,
        nameDescription: req.body,
        locale: req.body,
        activeCto: req.body,
        networkTechnology: req.body
    }
    
    let box = body
    console.log(box);
    try {
      const response = await createRequest.createBox(box);
     if(box != undefined){
        res.redirect("boxes").json({msg: msgSucesso});
     }
      
    } catch (error) {
      if (error.response) {
        // Erro de resposta da API
        console.log(error.response.status);
        console.log(error.response.data);
        console.log(error.response.headers);
      } else if (error.request) {
        // Erro de requisição (sem resposta)
        console.log(error.request);
      } else {
        // Outro tipo de erro
        console.log("Erro", error.message);
      }
    }
  },
};
module.exports = createController;

/*const moment = require('moment');

// ...

const createController = {
  createdBox: async (req, res) => {
    const { data, name, locale, descricao, quantidade } = req.body;

    // Convertendo a data do formato "dd/mm/aaaa" para "aaaa/mm/dd"
    const formattedData = moment(data, 'DD/MM/YYYY').format('YYYY/MM/DD');

    // Resto da lógica para criar o objeto e salvar no banco de dados
    // ...
  }
};
 */