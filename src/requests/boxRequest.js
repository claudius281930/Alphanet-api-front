const axios = require("axios");
const def = require("./default");

const url = "box"; //contexto de negocio

const boxRequest = {
  getBox: () => axios({
      ...def,
      method: "get",
      url: `${url}/`,
    }),

  getBox: (id) => axios({
      ...def,
      method: "get",
      url: `${url}/${id}`,
    }),

  createBox: (box) => axios({
      ...def,
      method: "post",
      data: {
        ...box,
      },
      url: `${url}/`,
    }),

  updateBox: (id) => axios({
      ...def,
      method: "update",
      url: `${url}/${id}`,
    }),

  deleteBox: (id) => axios({
      ...def,
      method: "delete",
      url: `${url}/${id}`,
    }),
};

module.exports = boxRequest;
