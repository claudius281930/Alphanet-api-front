const axios = require("axios");
const defaults = require("./defaults");


const urlbox = "box"; //contexto de negocio
const urlfusion = "fusion"; // parametrização de rota
const urlcolor = "color";
const urllinki = "link";

const createRequest = {

  updateBox: (box,id) => axios({
      ...defaultConfig,
      method: "update",
      url: `${url}/${id}`,
      ...box
    }),

  /*deleteBox: (id) => axios({
      ...defaultConfig,
      method: "delete",
      url: `${url}/${id}`,
    }),*/
};

module.exports = createRequest;
