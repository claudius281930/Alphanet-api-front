const axios = require("axios");
const defaults = require("./defaults");

const url = 'box'; //contexto de negocio

const boxRequest = {
  getBox: () =>
    axios({
      ...defaults,
      method: "get",
      url: `${url}/`,
    }),

  /*getBoxId: (id) =>
    axios({
      ...defaults,
      method: "get",
      url: `${url}/${id}`,
    }),*/

  /*createBox: (box) => axios({
      ...defaultConfig,
      method: "post",
      data: {
        ...box,
      },
      url: `${url}/`,
    }),*/

  /*updateBox: (box,id) => axios({
      ...defaultConfig,
      method: "update",
      url: `${url}/${id}`,
      ...box
    }),*/

  /*deleteBox: (id) => axios({
      ...defaultConfig,
      method: "delete",
      url: `${url}/${id}`,
    }),*/
};

module.exports = boxRequest;
