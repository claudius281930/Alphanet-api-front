const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const mainRouter = require(path.join(__dirname, "./routes/mainRouter"));
const registerRouter = require(path.join(__dirname, "./routes/registerRouter"));
const userRouter = require(path.join(__dirname, "./routes/userRouter"));
const cookieMiddleware = require("./middlewares/cookieLogin");

const app = express();

//View engine setup;
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

/*app.use(cookieParser("meuProjeto"));*/
/*app.use(session({
    secret: "meuProjeto",
    resave: false,
    saveUninitialized: false,
  })
);*/
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
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
