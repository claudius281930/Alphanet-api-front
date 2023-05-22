const axios = require("axios");
const defaults = require("../defaults");

const url = "box"; //contexto de negocio

const createRequest = {
  createBox: () =>
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
