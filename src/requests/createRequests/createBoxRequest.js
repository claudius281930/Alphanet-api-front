const axios = require("axios");
const defaults = require("../defaults");

const url = "create/box"; //contexto de negocio e Endpoint;

const createRequest = {
  createBox: (box) =>
    axios({
      ...defaults,
      method: "post",
      data: {
        ...box,
      },
      url: `${url}/`,
    }),
};

module.exports = createRequest;
