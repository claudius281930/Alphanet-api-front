const axios = require("axios");
const defaults = require("./defaults");

const userCreate = "register/create";//antes estava /register/create
const urlGetUser = "user";

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
  loginUser: (user) => {
    return axios({
      ...defaults,
      method: "post",
      data: {
        ...user,
      },
      url: `${urlGetUser}`,
    });
  },
};
module.exports = userRequest;
