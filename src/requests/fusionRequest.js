const axios = require("axios");
const defaults = require("./defaults");

const url = "fusion"; //contexto de negocio

const fusionRequest = {
    getFusion: () => {
        return axios({
          ...defaults,
          method: "get",
          url: `${url}/`,
        });
      },

      getFusionId: (id) => {
        return axios({
          ...defaults,
          method: "get",
          url: `${url}/${id}`,
        });
      },
}
module.exports = fusionRequest;