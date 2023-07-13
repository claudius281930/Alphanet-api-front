const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");

const mainRouter = require(path.join(__dirname,"./routes/mainRouter"));
const userRouter = require(path.join(__dirname,"./routes/userRouter"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// rotas da API e Middlewares de aplicação(global);
app.use("/", mainRouter);
app.use("/register", userRouter);

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
