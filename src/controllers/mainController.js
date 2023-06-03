const boxRequest = require("../requests/boxRequest");
const fusionRequest = require("../requests/fusionRequest");

const mainController = {
  pageHome: async (req, res) => {
    res.render("home");
  },
  getBoxByNameFromBody: async (req, res) => {
    const name = req.body.name_description;
    try {
      const response = await boxRequest.getBoxName(name);
      let box = response.data;

      if (box) {
        return res.render("boxName", { nameBox: box }); // A Key(nameBox) pode ser qualquer nome
      } else {
        return res.send("Objeto não encontrado ou não existe");
      }
    } catch (error) {
      console.error(error, "Algo deu errado!");
    }
  },
  getDetailBox: async (req, res) => {
    let nameForDetail = req.query.name_description;
    console.log(nameForDetail);
    try {
      let response = await boxRequest.detailBox(nameForDetail);
      let detailForObject = response.data;
      res.render("detail", { details: detailForObject });
    } catch (error) {
      console.error(error);
    }
  },
  getBoxByLocaleFromBody: async (req, res) => {
    const locale = req.body.locale;
    console.log(locale);
    try {
      const response = await boxRequest.getBoxLocale(locale);
      let box = response.data;
      console.log(box);

      if (box) {
        return res.render("boxName", { nameBox: box }); // A Key(nameBox) pode ser qualquer nome
      } else {
        return res.send("Objeto não encontrado ou não existe");
      }
    } catch (error) {
      console.error(error, "Algo deu errado!");
    }
  },
  pageFormCreateBox: (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];
    res.render("create_box_form", { currentDate });
  },
  createBox: async (req, res) => {
    const msgSucesso = "Caixa criada com sucesso!";
    //const formattedData = moment(req.body.dateModify, 'DD/MM/YYYY').format('YYYY-MM-DD');
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
      await boxRequest.createBox(box);
      if (box != undefined) {
        res.redirect(201, "/home"); //precisa inverter a ordem dos argumentos do redirect
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
    const id = req.body.id;
    console.log({ valor: id });
    try {
      const response = await boxRequest.getBoxId(id);
      const box = response.data;
      console.log(box);
      if (!box) {
        return res.render("error", { msg: "caixa não encontrada" });
      } else {
        return res.render("boxId", { idBox: box });
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
    let id = req.body.id;
    try {
      //verificando se o objeto existe na base;
      if (boxRequest.getBoxId(id)) {
        console.log("Objeto encontrado");
      } else {
        console.log("Objeto não encontrado");
      }
      //console.log(id);
      //Pegar os valores passados via body
      let body = {
        dateModify: req.body.dateModify,
        nameDescription: req.body.nameDescription,
        locale: req.body.locale,
        activeCto: req.body.activeCto,
        networkTechnology: req.body.networkTechnology,
      };
      //Armazenar
      let box = body;
      // Chama a função de requisição de atualização
      await boxRequest.updateBox(box, id);
      res.redirect(200, "/home"); //.json({ msg: "Objeto atualizado!" });
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
      await boxRequest.deleteBox(id); //Mesmo parametro da requisisão esperado pelo AXIOS
      res.redirect(200, "/home");
    } catch (error) {
      // Houve um erro na requisição de deleção
      console.error("Erro:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};

module.exports = mainController;
