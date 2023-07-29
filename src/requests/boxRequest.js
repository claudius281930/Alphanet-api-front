const axios = require("axios");
const defaults = require("./defaults");

const urlcreate = "create";
const urlBox = "box";
const urlName = "/name";
const urlLocale = "/locale";
const urlNetworkTechnology = "/net";
const urlDetail = "/detail";

// ******************
const urlFullName = urlBox + urlName; // /box/name/:name_description;
const urlFullLocale = urlBox + urlLocale;
const urlDetailFull = urlBox + urlDetail;
const urlNetworkTechnologyFull = urlBox + urlNetworkTechnology;

const boxRequest = {
  getBox: (offset, limit) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlBox}?page=${offset}&limit=${limit}`,
    });
  },
  getBoxId: (id) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlBox}/${id}`,
    });
  },
  getBoxName: (name) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlFullName}/${name}`,
    });
  },
  getBoxLocale: (locale) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlFullLocale}/${locale}`, // /box/locale/:locale;
    });
  },
  getBoxNetworkTechnology: (networkTechnology) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlNetworkTechnologyFull}/${networkTechnology}`, // /box/net/:networkTechnology;
    });
  },
  detailBox: (boxDetail) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlDetailFull}/${boxDetail}`, // box/detail/:name_description;
    });
  },
  createBox: (box) => {
    return axios({
      ...defaults,
      method: "post",
      data: {
        ...box,
      },
      url: `${urlcreate}/${urlBox}`,
    });
  },
  updateBox: (box, id) => {
    return axios({
      ...defaults,
      method: "put",
      data: {
        ...box,
      },
      url: `${urlBox}/${id}`,
    });
  },
  deleteBox: (id) => {
    return axios({
      ...defaults,
      method: "delete",
      url: `${urlBox}/${id}`,
    });
  },
};

module.exports = boxRequest;
