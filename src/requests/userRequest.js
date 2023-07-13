const axios = require("axios");
const defaults = require("./defaults");

const userCreate = "register/create";

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
};
module.exports = userRequest;
