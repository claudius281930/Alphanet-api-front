const axios = require("axios");
const defaults = require("./defaults");

const urlcreate = "create";
const urlbox = "box";
const urlname = "/name";
const urllocale = "/locale";
const urldetail = "detail";
const urlFull = urlbox + urlname;

//const paginationUrl = `/box?page=${page}&limit=${limit}`;

const boxRequest = {
  getBox: (offset,limit) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlbox}?page=${offset}&limit=${limit}`,
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
  getBoxLocale: (locale) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urllocale}/${locale}`,
    });
  },
  createBox: (box) => {
    return axios({
      ...defaults,
      method: "post",
      data: {
        ...box,
      },
      url: `${urlcreate}/${urlbox}`,
    });
  },
  updateBox: (box, id) => {
    return axios({
      ...defaults,
      method: "put",
      data: {
        ...box,
      },
      url: `${urlbox}/${id}`,
    });
  },
  deleteBox: (id) => {
    return axios({
      ...defaults,
      method: "delete",
      url: `${urlbox}/${id}`,
    });
  },
  detailBox: (name_description) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urldetail}/${name_description}`,
    });
  },
};

module.exports = boxRequest;
