const axios = require("axios");
const defaults = require("./defaults");

const userCreate = "/register/create";
const urlLogin = "/login";
const urlUser = "/user";
const urlname = "/name";
const urlProfile = "/profile";

const urlFull = urlUser + urlname;

const userRequest = {
  createUser: (user) => {
    return axios({
      ...defaults,
      method: "post",
      data: {
        ...user,
      },
      url: `${userCreate}`,
    });
  },
  findOne: (name) => {
    return axios({
      ...defaults,
      method: "get",
      data: {
        ...name,
      },
      url: `${urlFull}/${name}`,
    });
  },
  processLogin: ({ name, password }) => {
    return axios({
      ...defaults,
      method: "post",
      data: { name, password },
      url: `${urlLogin}`,
      // Adiciona esta opção para enviar o cookie da sessão;
      //withCredentials: true,
    });
  },
  profile: (userToken) => {
    return axios({
      ...defaults,
      method: "get",
      url: `${urlProfile}`,
      headers: { authorization: `Bearer ${userToken}` },
    });
  },
};

module.exports = userRequest;
