const boxRequest = require("../requests/boxRequest");

const mainController = {
  home: async (req, res) => {
    res.render("home/home"); // A partir do diretorio VIEWS;
  },
  pageSearch: async (req, res) => {
    try {
      // Lendo a sessão no campo userDataAll;
      const sessionAll = await req.session.userDataAll;

      // extrai o TOKEN da SESSÃO;
      const userToken = sessionAll.token;

      // Verifica se a sessão existe e se o token esta nela;
      if (sessionAll) {
        // Se esiver faz a chamada a rota;
        const profileReq = await boxRequest.pageSearch(userToken);

        //Extrai o NAME do usuario da SESSÃO;
        const userDataName = sessionAll.name;

        // Response com um json autorizado;
        return res.render("find/search", { user: userDataName });
      } else {
        return res.send("Erro: Token inexistente.");
      }
    } catch (error) {
      console.error(error);
      res.redirect(401, "/");
    }
  },
  pageFormCreateBox: async (req, res) => {
    try {
      // Lendo a sessão no campo userDataAll;
      const sessionAll = req.session.userDataAll;

      // Verifica se a sessão existe;
      if (sessionAll) {
        // extrai o TOKEN da SESSÃO;
        const userToken = sessionAll.token;

        // Se esiver faz a chamada a rota;
        const profileReq = await boxRequest.pageCreateBox(userToken);

        const currentDate = new Date().toISOString().split("T")[0];

        return res.render("create/createBox", { currentDate });
      } else {
        return res.send("Erro: Token inexistente.");
      }
    } catch (error) {
      console.error(error);
      res.redirect(401, "/");
    }
  },
  pageFormUpdateBox: async (req, res) => {
    try {
      // Lendo a sessão no campo userDataAll;
      const sessionAll = await req.session.userDataAll;

      // Verifica se a sessão existe;
      if (sessionAll) {
        // extrai o TOKEN da SESSÃO;
        const userToken = sessionAll.token;

        // Se esiver faz a chamada a rota;
        const profileReq = await boxRequest.pageUpdate(userToken);

        // Constante que cria uma instacia da data para ser adicionada no fomrato correto na pagina ejs
        const currentDate = new Date().toISOString().split("T")[0];
        const id = req.body.id;
        // Response com um json autorizado;
        return res.render("update/updateBox", { currentDate, id: id });
      } else {
        return res.send("Erro: Token inexistente.");
      }
    } catch (error) {
      console.error(error);
      res.redirect(401, "/");
    }
  },
  pageFormDeleteBox: async (req, res) => {
    const id = req.body.id;
    try {
      // Lendo a sessão no campo userDataAll;
      const sessionAll = await req.session.userDataAll;

      // Verifica se a sessão existe e se o token esta nela;
      if (sessionAll) {
        // extrai o TOKEN da SESSÃO;
        const userToken = sessionAll.token;

        // Se esiver faz a chamada a rota;
        const profileReq = await boxRequest.pageDelete(userToken);

        //Extrai o NAME do usuario da SESSÃO;
        const userDataName = sessionAll.name;

        // Response com um json autorizado;
        return res.render("delete/deleteBox", {
          id: id,
          userName: userDataName,
        });
      } else {
        return res.res.redirect(404, "/");;
      }
    } catch (error) {
      console.error(error);
      res.redirect(401, "/");
    }
  },
  //***************************************

  
  getBoxByNameBody: async (req, res) => {
    const name = req.query.name_description;
    //console.log([name]);
    try {
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
        const response = await boxRequest.getBoxName(name);
        let box = response.data;

        if (!box) {
          return res.send("Objeto não encontrado ou não existe");
        } else {
          return res.render("find/boxName", { nameBox: box });
        }
      } else {
        return res.send(
          "Usuário: login necessário para acessar a página pro tipo 'Nome'."
        );
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
    //console.log([boxDetail]);
    try {
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
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
      } else {
        return res.send(
          "Usuário: login necessário para acessar a página com os 'Detalhes'."
        );
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
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
        const response = await boxRequest.getBoxLocale(locale);
        //console.log(response)
        let box = response.data;

        if (box) {
          return res.render("find/boxLocale", { localeBox: box });
        } else {
          return res.send("Objeto não encontrado ou não existe");
        }
      } else {
        return res.send(
          "Usuário: login necessário para acessar a página por tipo 'Localidade'."
        );
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
  getBoxByNetworkTechnologyBody: async (req, res) => {
    const networkTechnology = req.query.networkTechnology;
    //console.log(networkTechnology);
    try {
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
        const response = await boxRequest.getBoxNetworkTechnology(
          networkTechnology
        );
        console.log(response);
        let box = response.data;

        if (box) {
          return res.render("find/boxNetTech", { networkTechnology: box });
        } else {
          return res.send("Objeto não encontrado ou não existe");
        }
      } else {
        return res.send(
          "Usuário: login necessário para acessar a página de busca por 'Tipo de Rede'."
        );
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
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
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
        });
      } else {
        return res.send("Usuário: login necessário para acessar as 'Páginas'.");
      }
    } catch (error) {
      //Exibi o erro no terminal
      console.error(error);
      //Renderiza a view de erro, passando um objeto vazio como contexto/
      res.render("err/error" /*{ nameBox: [] }*/);
    }
  },
  getBoxById: async (req, res) => {
    const id = req.body.id;
    // console.log({ valor: id });
    try {
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
        const response = await boxRequest.getBoxId(id);
        const box = response.data;
        console.log(box);
        if (!box) {
          return res.render("error", { msg: "caixa não encontrada" });
        } else {
          return res.render("find/boxId", { idBox: box });
        }
      } else {
        return res.send(
          "Usuário: login necessário para acessar a página 'Buscar por ID'."
        );
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
  createBox: async (req, res) => {
    //const formattedData = moment(req.body.dateModify, 'DD/MM/YYYY').format('YYYY-MM-DD');
    try {
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
        let body = {
          dateModify: req.body.dateModify,
          nameDescription: req.body.nameDescription,
          locale: req.body.locale,
          activeCto: req.body.activeCto,
          networkTechnology: req.body.networkTechnology,
        };
        let box = body;
        await boxRequest.createBox(box);
        if (box != undefined) {
          //Redirecionado para a rota absoluta (/);
          res.redirect("/profile");
        }
      } else {
        return res.send(
          "Usuário: login necessário para acessar a página 'Criar os dados'."
        );
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
    try {
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
        let id = req.body.id;
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
      } else {
        return res.send(
          "Usuário: login necessário para acessar a página 'Atualizar os dados'."
        );
      }
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
    try {
      const existSessionUser = req.session.cookie;
      if (existSessionUser) {
        const id = req.body.id;
        await boxRequest.deleteBox(id);
        //Redirecionado para a rota absoluta (/);
        res.redirect("/search");
      } else {
        return res.send(
          "Usuário: login necessário para acessar a página 'Deletar os dados'."
        );
      }
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
};

module.exports = mainController;
