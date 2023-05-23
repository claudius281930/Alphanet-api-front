const axios = require("axios");
const defaults = require("./defaults");

//const urlhome = 'home/';
const urlbox = "box"; //contexto de negocio
const urlname = "/name"; // parametrização de rota
const urlFull = urlbox + urlname;

const boxRequest = {
  /*gethome:() =>
    axios({
      ...defaults,
      method: "get",
      url: `${urlhome}`,
    }),*/

  getBox: () => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlbox}/`,
    });
  },

  getBoxId: (id) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlbox}/${id}`,
    });
  },

  getBoxName: (name_description) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlFull}/${name_description}`,
    });
  },
};

module.exports = boxRequest;
