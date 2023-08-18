const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const path = require("path");

const mainRouter = require(path.join(__dirname, "./routes/mainRouter"));
const registerRouter = require(path.join(__dirname, "./routes/registerRouter"));
const userRouter = require(path.join(__dirname, "./routes/userRouter"));

const app = express();

// Configuração da Sessão;
app.use(
  session({
    // Uma chave secreta usada para assinar o cookie da sessão
    secret: "m3uPr0j3tOPr0v1dEr",
    //garantir que a sessão não expire enquanto o usuário está ativo no site;
    resave: false,
    // Permite que uma sessão seja criada mesmo para solicitações que não têm dados da sessão
    saveUninitialized: true,
    cookie: {
      // Tempo de vida do cookie da sessão em milissegundos (1 hora neste caso);
      maxAge:24 * 60 * 60 * 1000,
      // Define TRUE se o cookie só pode ser enviado através de conexões HTTPS;
      secure: false,
      // TRUE: Impede que o cookie seja acessado pelo JavaScript do cliente
      httpOnly: true,
    },
  })
);

//View engine setup;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

//Middleware de autenticação usando cookies
//app.use(cookieMiddleware);

// rotas da API e Middlewares de aplicação(global);
app.use("/", mainRouter);
app.use("/", registerRouter);
app.use("/", userRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

// inicia o servidor na porta especificada
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

module.exports = app;
