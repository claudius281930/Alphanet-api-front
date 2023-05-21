const boxRequest = require("../requests/boxRequest");

const mainController = {
  /*home: (req, res) => {
    boxRequest.gethome()
      res.render("home");
  },*/
  getBoxes: (req, res) => {
    boxRequest
      .getBox()
      .then((result) => {
        const apiBoxes = result.data;
        //console.log(apiBoxes);
        res.render("boxes", { boxesAll: apiBoxes });
      })
      .catch((err) => {
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
      console.log(box)
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
  getBoxByName: async (req, res) => {
    const name = req.params.name_description;
    try {
      const response = await boxRequest.getBoxName(name);
      const box = response.data;
      console.log(box)
      if (!box) {
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
      res.render("error", {  msg: "caixa não encontrada"  });
    }
  },
};
module.exports = mainController;
