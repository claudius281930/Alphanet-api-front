const deleteRequest = require("../requests/deleteRequests/deleteRequest");

const deleteController = {
    deleteBox: async (req, res) => {
    try {
      const id = req.body.id; // Obtém o ID do objeto a ser deletado

      // Chama a função de requisição de deleção
      const response = await deleteRequest.deleteBox(id);
      console.log(response)
      // Verifica se a deleção foi bem-sucedida
      if (response.status === 200) {
        // Objeto deletado com sucesso
        res.status(200,response.status.success).json({ message: "Objeto deletado com sucesso." });
      } else {
        // Houve um erro na deleção
        res.status(response.status).json({ message: "Erro ao deletar objeto." });
      }
    } catch (error) {
      // Houve um erro na requisição de deleção
      console.log("Erro:", error.message);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};
module.exports = deleteController;
