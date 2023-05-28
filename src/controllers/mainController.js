const boxRequest = require("../requests/boxRequest");
const fusionRequest = require("../requests/fusionRequest");

const mainController = {
  pageHome: async (req, res) => {
    res.render("home");
  },
  getBoxByName: async (req, res) => {
    const name = req.query.name_description; // Use req.query para obter o valor do parâmetro de consulta
    // const name = req.params.name_description;
    // const inputName = req.body.nameDescription;
    // console.log(inputName);

    try {
      const response = await boxRequest.getBoxName(name);
      const box = response.data;
      console.log(box);
      if (!box /*=== inputName*/) {
        res.render("error", { msg: "caixa não encontrada" });
      } else {
        res.render("boxName", { nameBox: box });
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
      res.render("error", { msg: "caixa não encontrada" });
    }
  },
  pageFormCreateBox: (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];
    res.render("create_box_form", { currentDate });
  },
  createBox: async (req, res) => {
    const msgSucesso = "Caixa criada com sucesso!";
    //const formattedData = moment(req.body.dateModify, 'DD/MM/YYYY').format('YYYY-MM-DD');

    //Key que precisarão ser passadas lá na view no input com os atributos: name="dateModify" ... name="nameDescription"
    let body = {
      dateModify: req.body.dateModify,
      nameDescription: req.body.nameDescription,
      locale: req.body.locale,
      activeCto: req.body.activeCto,
      networkTechnology: req.body.networkTechnology,
    };
    let box = body;
    console.log(box);
    try {
      /*const response =*/ await boxRequest.createBox(box);
      if (box != undefined) {
        res.redirect(201, "boxes").json({ msg: msgSucesso }); //precisa inverter a ordem dos argumentos do redirect
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
  getBoxes: (req, res) => {
    boxRequest
      .getBox()
      .then((result) => {
        const apiBoxes = result.data;
        //console.log(apiBoxes);
        res.render("boxes", { boxesAll: apiBoxes });
      })
      .catch((error) => {
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
        res.render("error", { nameBox: [] });
      });
  },
  getBoxById: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await boxRequest.getBoxId(id);
      const box = response.data;
      console.log(box);
      if (!box) {
        res.render("error", { msg: "caixa não encontrada" });
      } else {
        res.render("boxId", { idBox: box });
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
      res.render("error", { nameBox: [] });
    }
  },
  getFusions: (req, res) => {
    fusionRequest
      .getFusion()
      .then((result) => {
        const apiFusion = result.data;
        console.log(apiFusion);
        res.render("fusionAll", { fusions: apiFusion });
      })
      .catch((error) => {
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
        res.render("error", { nameBox: [] });
      });
  },
  getFusionById: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await fusionRequest.getFusionId(id);
      const fusion = response.data;
      console.log(fusion);
      if (!fusion) {
        res.render("error", { msg: "caixa não encontrada" });
      } else {
        res.render("fusionId", { idFusion: fusion });
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
      res.render("error", { nameBox: [] });
    }
  },
  pageFormUpdateBox: async (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const id = req.body.id;
    res.render("updateBox", { currentDate, id: id });
  },
  updateBox: async (req, res) => {
    // Obtém o ID do objeto a ser atualizar
    const id = req.body.id;
    //verificando se o objeto existe na base;
    if (boxRequest.getBoxId(id)) {
      console.log("Objeto encontrado");
    } else {
      console.log("Objeto não encontrado");
    }
    console.log(id);
    try {
      const body = {
        dateModify: req.body.dateModify,
        nameDescription: req.body.nameDescription,
        locale: req.body.locale,
        activeCto: req.body.activeCto,
        networkTechnology: req.body.networkTechnology,
      };
      let box = body;
      // Chama a função de requisição de atualização
      /*const response =*/ await boxRequest.updateBox(box, id);
      res.status(200).json({ msg: "Objeto atualizado!" });
    } catch (error) {
      // Houve um erro na requisição de atualização
      console.log("Erro:", error.message);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
  pageFormDeleteBox: (req, res) => {
    const id = req.body.id;
    res.render("deleteBox", { id: id });
  },
  deleteBox: async (req, res) => {
    // Obtém o ID do objeto a ser deletado
    const id = req.body.id;
    try {
      // Chama a função de requisição de deleção
      const response = await boxRequest.deleteBox(id);
      console.log(response);

      // Verifica se a deleção foi bem-sucedida
      if (response.status === 200) {
        // Objeto deletado com sucesso
        res
          .status(200, response.status.success)
          .json({ message: "Objeto deletado com sucesso." });
      } /* if(response) {
        // 'Box' existente e deletado com sucesso
        res.status(200).json({ message: "Box existente e deletada com sucesso!" });
      }*/ else {
        // 'Box' inexistente
        res.status(404).json({ message: "'Box' inexistente!" });
      }
    } catch (error) {
      // Houve um erro na requisição de deleção
      console.log("Erro:", error.message);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};

module.exports = mainController;
