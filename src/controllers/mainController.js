const boxRequest = require("../requests/boxRequest");

// const fusionRequest = require("../requests/fusionRequest");

const mainController = {
  home: async (req, res) => {
    res.render("home/home"); // A partir do diretorio VIEWS;
  },
  pageSearch: async (req, res) => {
    res.render("find/search"); // A partir do diretorio VIEWS;
  },
  pageFormCreateBox: (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];
    res.render("create/createBox", { currentDate });
  },
  pageFormUpdateBox: async (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const id = req.body.id;
    res.render("update/updateBox", { currentDate, id: id });
  },
  pageFormDeleteBox: (req, res) => {
    const id = req.body.id;
    res.render("delete/deleteBox", { id: id });
  },
  // ********************
  getBoxByNameBody: async (req, res) => {
    const name = req.query.name_description;
    console.log([name]);
    try {
      const response = await boxRequest.getBoxName(name);
      let box = response.data;

      if (!box) {
        return res.send("Objeto não encontrado ou não existe");
      } else {
        return res.render("find/boxName", { nameBox: box });
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
  getDetailBox: async (req, res) => {
    // captura o valor passado no input e adiciona a rota url utilizando o query;
    const boxDetail = req.query.name_description;
    console.log([boxDetail]);
    try {
      //Faz a consulta;
      const response = await boxRequest.detailBox(boxDetail);
      // Obtenha a propriedade "box" do objeto de resposta;
      let box = response.data.box;
      let boxName = response.data.msg;
      //Verifica se os dados do detalhe existem;
      if (box) {
        //Renderiza a pagina de detalhes jutamento com os dados desde detalhe;
        res.render("detail/detail", { detailBox: box, msg: boxName });
        //console.log(nameForDetail)
      } else {
        return res.send("Detalhes do objeto não encontrado ou não existe");
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
  getBoxByLocaleBody: async (req, res) => {
    const locale = req.query.locale;
    //console.log([locale]);
    try {
      const response = await boxRequest.getBoxLocale(locale);
      //console.log(response)
      let box = response.data;
      
      if (box) {
        return res.render("find/boxLocale", { localeBox: box });
      } else {
        return res.send("Objeto não encontrado ou não existe");
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
  getBoxByNetworkTechnologyBody: async (req,res) => {
    // const {query} = req.query;
    // const [locale, networkTechnology] = query.split(' ');
    const networkTechnology = req.query.networkTechnology;
    console.log(networkTechnology);
    try {
      const response = await boxRequest.getBoxNetworkTechnology(networkTechnology);
      console.log(response)
      let box = response.data;
      
      if (box) {
        return res.render("find/boxNetTech", { networkTechnology: box });
      } else {
        return res.send("Objeto não encontrado ou não existe");
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
  getBoxes: async (req, res) => {
    try {
      //Extrai o valor do parâmetro page do objeto (que contém os parâmetros da URL da requisição);
      let { page = 1 } = req.query;
      //Converte o valor de page para um número inteiro usando a função;
      page = parseInt(page);
      //Verifica se o valor de page NÃO é um número válido ou se é menor ou igual a zero;
      if (isNaN(page) || page <= 0) {
        //Se o valor de page não for válido, define o valor padrão como 1;
        page = 1;
      }
      //Define o valor do limite de itens por página;
      const limit = 6;
      //Calcula a paginação com os seus itens de exibição
      let offset = (page * limit) / limit; //(1 * 6) - 6 = 0(padrão)... 6... 12;
      //Faz a requisição GET junto ao controlador back-end passando os parametros necessários e amazena os dados retornados na constante;
      let apiBoxes = await boxRequest.getBox(offset, limit);
      //Extrai os valores boxes e total do objeto apiBoxes.data, que contém os dados retornados da consulta API/
      const { boxes, total } = apiBoxes.data;
      //Acessando os dados: notação de ponto (objeto.chave) ou notação de colchetes (objeto['chave']);
      res.render("find/boxes", {
        //Atribui um àlias a variaveis;
        boxesAll: boxes,
        //Calculando a quantidade de paginas e aredondando para cima o seu numero;
        totalityPage: Math.ceil(total / limit),
        //Pega o valor da página atual;
        currentPage: page,
        //Total de itens;
        total: total,
        //Exibir na view o nome do usuario que esta logado;
        //userLogged:req.session.userLogged,
      });
    } catch (error) {
      //Exibi o erro no terminal
      console.error(error);
      //Renderiza a view de erro, passando um objeto vazio como contexto/
      res.render("err/error", { nameBox: [] });
    }
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
        return res.render("find/boxId", { idBox: box });
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
  // **********************
  createBox: async (req, res) => {
    //const formattedData = moment(req.body.dateModify, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let body = {
      dateModify: req.body.dateModify,
      nameDescription: req.body.nameDescription,
      locale: req.body.locale,
      activeCto: req.body.activeCto,
      networkTechnology: req.body.networkTechnology,
    };
    let box = body;
    //console.log(box);
    try {
      await boxRequest.createBox(box);
      if (box != undefined) {
        //Redirecionado para a rota absoluta (/);
        res.redirect("/search");
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
      //Redirecionado para a rota absoluta (/);
      res.redirect("/search");
    } catch (error) {
      // Houve um erro na requisição de atualização
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
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
  deleteBox: async (req, res) => {
    // Obtém o ID do objeto a ser deletado
    const id = req.body.id;
    try {
      await boxRequest.deleteBox(id);
      //Redirecionado para a rota absoluta (/);
      res.redirect("/search");
    } catch (error) {
      // Houve um erro na requisição de atualização
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
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
  /* // getFusions: (req, res) => {
  //   fusionRequest
  //     .getFusion()
  //     .then((result) => {
  //       const apiFusion = result.data;
  //       console.log(apiFusion);
  //       res.render("fusionAll", { fusions: apiFusion });
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // Erro de resposta da API
  //         console.log(error.response.status);
  //         console.log(error.response.data);
  //         console.log(error.response.headers);
  //       } else if (error.request) {
  //         // Erro de requisição (sem resposta)
  //         console.log(error.request);
  //       } else {
  //         // Outro tipo de erro
  //         console.log("Erro", error.message);
  //       }
  //       res.render("error", { nameBox: [] });
  //     });
  // },
  // getFusionById: async (req, res) => {
  //   const id = req.params.id;
  //   try {
  //     const response = await fusionRequest.getFusionId(id);
  //     const fusion = response.data;
  //     console.log(fusion);
  //     if (!fusion) {
  //       res.render("error", { msg: "caixa não encontrada" });
  //     } else {
  //       res.render("fusionId", { idFusion: fusion });
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       // Erro de resposta da API
  //       console.log(error.response.status);
  //       console.log(error.response.data);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       // Erro de requisição (sem resposta)
  //       console.log(error.request);
  //     } else {
  //       // Outro tipo de erro
  //       console.log("Erro", error.message);
  //     }
  //     res.render("error", { nameBox: [] });
  //   }
  // },
  */
};

module.exports = mainController;
