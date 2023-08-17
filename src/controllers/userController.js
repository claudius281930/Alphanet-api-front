const userRequest = require("../requests/userRequest");

const userController = {
  // Renderize a página de login;
  pageLogin: async (req, res) => {
    //Exibe a pagina de Login;
    return res.render("user/login");
  },
  // Processa o LOGIN
  processLogin: async (req, res) => {
    try {
      //Receber os dados via body(corpo da requisição);
      const { name, password } = req.body;

      //Faz a REQUISIÇÃO junto ao AXIOS para o controlador serve-side. Passando os dados a ser consultados;
      const user = await userRequest.processLogin({ name, password });

      // extrai os dados o ususario necessario para criar a sessão;
      const userDataAll = user.data;
      //console.log({ DADOS_DO_USUARIO: userDataAll });
      // Criar uma sessão utilizando o dados vindo da RESPONSE;
      req.session.userDataAll = userDataAll; // O campo da sessão;
      //console.log({ SESSÃO_CRIADA: userDataAll });

      return res.redirect("/profile");
    } catch (error) {
      console.error(error);
      return res.send("Erro: dados incorretos");
    }
  },
  // Renderize a página de perfil. Precisa-se criar uma sessão para que os dados da função processLogin seja utilizados no perfil sem dar erro de "path";
  profile: async (req, res) => {
    try {
      // Lendo a sessão no campo userDataAll;
      const sessionAll = req.session.userDataAll;
      //console.log({ SESSÃO: sessionAll });

      // extrai o TOKEN da SESSÃO;
      const userToken = sessionAll.token;
      //console.log({ SOMENTE_TOKEN: userToken });

      // Verifica se a sessão existe e se o token esta nela;
      if (sessionAll) {
        // Se esiver faz a chamada a rota;
        const profileReq = await userRequest.profile(userToken);
        //console.log("Achado", { sessionJwt: profileReq });

        //Extrai o NAME do usuario da SESSÃO;
        const userDataName = sessionAll.name;
        //console.log({ SOMENTE_NOME: userDataName });

        // Response com um json autorizado;
        return res.render("user/profile", { user: userDataName });
      } else {
        return res.send("Erro: Token inexistente.");
      }
    } catch (error) {
      console.error(error);
      res.redirect(401, "/");
    }
  },
  logout: async (req, res) => {
    try {
      req.session.userDataAll = undefined;
      return res.redirect("/login");
    } catch (error) {
      console.log(error)
      return res.redirect("/");
    }
  },
};

module.exports = userController;
/* 
 console do servidor
{
  sessionToken: {
    status: 200,
    statusText: 'OK',
    headers: AxiosHeaders {
      'x-powered-by': 'Express',
      'content-type': 'application/json; charset=utf-8',
      'content-length': '216',
      etag: 'W/"d8-rP9pyW9aV6PpI5tHf1B2CiZFrNg"',
      date: 'Fri, 11 Aug 2023 13:19:09 GMT',
      connection: 'close'
    },
} 
------------------------------------------
},
 *** sessionID: '8kviKcFA4C_oerWL13g_zYEHnYcE8EwB',
  session: Session {
    cookie: {
      path: '/',
      _expires: 2023-08-09T22:01:58.127Z,
      originalMaxAge: 40000,
      httpOnly: true,
      secure: false
    }
  },
  route: Route {
    path: '/profile',
    stack: [ [Layer] ],
    methods: { get: true }
  },
  [Symbol(kCapture)]: false,
  [Symbol(kHeaders)]: {
    'user-agent': 'PostmanRuntime/7.32.3',
    accept: '*',
  ***  'postman-token': '137a7ca4-aaa1-4d33-8b50-1139df472587',
    host: 'localhost:3001',
    'accept-encoding': 'gzip, deflate, br',
    connection: 'keep-alive'
  },
  [Symbol(kHeadersCount)]: 12,
  [Symbol(kTrailers)]: null,
  [Symbol(kTrailersCount)]: 0,
  [Symbol(RequestTimeout)]: undefined
}
*/
