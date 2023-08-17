const axios = require("axios");
const defaults = require("./defaults");

const urlBox = "box";
const urlCreate = "create";//box/create
const urlUpdate = "box/update";
const urlDelete = "/delete";//box/delete/:id
const urlName = "/name";
const urlLocale = "/locale";
const urlNetworkTechnology = "/net";
const urlDetail = "/detail";
// ********************************************************************
// Exibição, somente, das paginas;
const urlPageSearch = "/search";
const urlPageCreate = "/box//create";
const urlPageUpdate = "/box//update";
const urlPageDelete = "/box//delete";

// *******************************************************************
const urlFullName = urlBox + urlName;
const urlFullLocale = urlBox + urlLocale;
const urlDetailFull = urlBox + urlDetail;
const urlNetworkTechnologyFull = urlBox + urlNetworkTechnology;
const urlDeleteFull = urlBox + urlDelete;

const boxRequest = {
  pageSearch: (userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlPageSearch}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  pageCreateBox: (userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlPageCreate}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  pageUpdate: (userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlPageUpdate}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  pageDelete: (userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlPageDelete}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  // ******************************************************************
  getBox: (offset, limit, userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlBox}?page=${offset}&limit=${limit}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  getBoxName: (name, userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlFullName}/${name}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  getBoxLocale: (locale, userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlFullLocale}/${locale}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  getBoxNetworkTechnology: (networkTechnology, userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlNetworkTechnologyFull}/${networkTechnology}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  detailBox: (boxDetail, userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlDetailFull}/${boxDetail}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  createBox: (box, userToken) => {
    return axios({
      ...defaults,
      method: "post",
      data: {
        ...box,
      },
      url: `${urlBox}/${urlCreate}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  getBoxId: (id, userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlBox}/${id}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  updateBox: (box, id, userToken) => {
    return axios({
      ...defaults,
      method: "put",
      data: {
        ...box,
      },
      url: `${urlUpdate}/${id}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
  deleteBox: (id, userToken) => {
    return axios({
      ...defaults,
      method: "delete",
      url: `${urlDeleteFull}/${id}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
};

module.exports = boxRequest;
