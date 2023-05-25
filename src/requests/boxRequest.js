const axios = require("axios");
const defaults = require("./defaults");

const urlcreate = "create";
const urlbox = "box"; //contexto de negocio
const urlname = "/name"; // parametrização de rota
const urlFull = urlbox + urlname; // necesssaria para construir a rota /name/name_description

const boxRequest = {
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
  createBox: (box) => {
    axios({
      ...defaults,
      method: "post",
      data: {
        ...box,
      },
      url: `${urlcreate}/${urlbox}`,
    });
  },
  updateBox: (box, id) => {
    axios({
      ...defaults,
      method: "put",
      data: {
        ...box,
      },
      url: `${urlbox}/${id}`,
    });
  },
  deleteBox: (id) => {
    axios({
      ...defaults,
      method: "delete",
      url: `${urlbox}/${id}`,
    });
  },
};

module.exports = boxRequest;
