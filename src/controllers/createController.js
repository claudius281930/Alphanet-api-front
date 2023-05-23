const moment = require('moment');
const createRequest = require("../requests/createRequests/createBoxRequest");

const createController = {
    //Creating...
    create: async (req, res) => {
        const msgSucesso = "Caixa criada com sucesso!"
        //const formattedData = moment(req.body.dateModify, 'DD/MM/YYYY').format('YYYY-MM-DD');

        //Key que precisarão ser passada lá na view no input com os atributos: name="dateModify"/name="nameDescription"
        let body = {
        dateModify: req.body.dateModify,
        nameDescription: req.body.nameDescription,
        locale: req.body.locale,
        activeCto: req.body.activeCto,
        networkTechnology: req.body.networkTechnology
    }
    
    let box = body
    console.log(box);
    try {
      const response = await createRequest.createBox(box);
     if(box != undefined){
        res.redirect(201, "boxes").json({msg: msgSucesso});//precisa inverter a ordem dos argumentos
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

const createController = {
  create: async (req, res) => {
    const msgSucesso = "Caixa criada com sucesso!";
    const { dateModify, nameDescription, locale, activeCto, networkTechnology } = req.body;

    // Convertendo a data do formato "dd/mm/aaaa" para "aaaa/mm/dd"
    const formattedData = moment(dateModify, 'DD/MM/YYYY').format('YYYY/MM/DD');

    const box = {
      dateModify: formattedData,
      nameDescription,
      locale,
      activeCto,
      networkTechnology
    };

    console.log(box);

    try {
      const response = await createRequest.createBox(box);
      if (box != undefined) {
        res.redirect("boxes").json({ msg: msgSucesso });
      }
      // Resto do código
    } catch (error) {
      // Tratar erros
    }
  }
};

 */