const axios = require("axios");
const defaults = require("./defaults");
const userCreate = "register/create";

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
      url: `${urlFull}/${name}`, // /user/name/:name
    });
  },
  processLogin: async ({ name, password }) => {
    return axios({
      ...defaults,
      method: "post",
      data: { name, password },
      url: `${urlLogin}`, 
    });
  },
  profile: ({ name }) => {
    return axios({
      ...defaults,
      method: "post",
      data: { name },
      url: `${urlProfile}`, // /profile
    });
  },
};

module.exports = userRequest;
