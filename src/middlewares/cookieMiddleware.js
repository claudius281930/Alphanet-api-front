const userRequest = require("../requests/userRequest");

const cookieLogin = (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.logged != undefined && req.session.userLogged == null) {
    let { name } = req.cookies.logged;

    let userCookie = userRequest.loginUser();
    console.log({ atualCokkie: name });

    if (userCookie.name == name) {
      req.session.userLogged = userCookie;
    }
  }
  next();
};
module.exports = cookieLogin;
