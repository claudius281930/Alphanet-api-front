const path = require("path");
const fs = require("fs");

const userRequest = require("../requests/userRequest");

const cookieLogin = (req, res, next) => {
  if (req.cookies.logado != undefined && req.session.user == null) {
    let name = req.session.logado;

    let user = JSON.parse(fs.readFileSync(
        path.join(/*userRequest.loginUser*/),
    {encoding:'utf-8'}));
    
    user.forEach(element => {
        element.name == name;
    });
  }
  next();
};
module.exports = cookieLogin;
