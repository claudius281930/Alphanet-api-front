const axios = require("axios");
const defaults = require("./defaults");

const urlBox = "box";
const urlCreate = "create";
const urlUpdate = "/update";
const urlDelete = "/delete";
const urlName = "/name";
const urlLocale = "/locale";
const urlNetworkTechnology = "/net";
const urlDetail = "/detail";
// ********************************************************************
const urlPageSearch = "/search";
const urlPageCreate = "/box//create";
const urlPageUpdate = "/box//update";
const urlPageDelete = "/box//delete";

// *******************************************************************
const urlFullName = urlBox + urlName;
const urlFullLocale = urlBox + urlLocale;
const urlDetailFull = urlBox + urlDetail;
const urlNetworkTechnologyFull = urlBox + urlNetworkTechnology;
const urlUpdateFull = urlBox + urlUpdate;
const urlDeleteFull = urlBox + urlDelete;

const boxRequest = {
  pagesearch: (sessionJwt) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlPageSearch}`,
      headers: { authorization: `Bearer ${sessionJwt}` },
    });
  },
  pageCreateBox: (sessionJwt) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlPageCreate}`,
      headers: { authorization: `Bearer ${sessionJwt}` },
    });
  },
  pageUpdate: (sessionJwt) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlPageUpdate}`,
      headers: { authorization: `Bearer ${sessionJwt}` },
    });
  },
  pageDelete: (sessionJwt) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlPageDelete}`,
      headers: { authorization: `Bearer ${sessionJwt}` },
    });
  },
  // ******************************************************************
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
      url: `${urlBox}/${urlCreate}`, // /box/create
    });
  },
  updateBox: (box, id) => {
    return axios({
      ...defaults,
      method: "put",
      data: {
        ...box,
      },
      url: `${urlUpdateFull}/${id}`, // /box/update/:id
    });
  },
  deleteBox: (id) => {
    return axios({
      ...defaults,
      method: "delete",
      url: `${urlDeleteFull}/${id}`, // /box/delete/:id
    });
  },
};

module.exports = boxRequest;
