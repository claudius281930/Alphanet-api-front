const axios = require("axios");
const defaults = require("../defaults");

const url = "box"; //contexto de negocio e  Endpoint(http://localhost:3000/box/:id);

const deleteRequest = {
  deleteBox: (id) =>
    axios({
      ...defaults,
      method: "delete",
      url: `${url}/${id}`,
    }),
};
module.exports = deleteRequest;
