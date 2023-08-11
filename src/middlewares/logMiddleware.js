const eUser = {
  eUser: async (req, res, next) => {
    // Verifica se o cookie da sessão está presente na RESPONSE;
    if (req.document.cookie.includes("connect.sid")) {
      // O usuário está autenticado;
      
      return next();
    } else {
      // O usuário não está autenticado, redirecionar para a página de login ou exibir mensagem de erro;
      return res.send("Você não tem privilegios para acessar está página. Login necessário.")//.redirect("/login");
    } 
  },
};

module.exports = eUser;