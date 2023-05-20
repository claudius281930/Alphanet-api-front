const fs = require("fs");
const path = require("path");

const boxRequest = require("../requests/boxRequest");

/*const boxesFilePath = path.join(__dirname, "../config/config.json");
let initialBoxes = JSON.parse(fs.readFileSync(boxesFilePath, "utf-8"));*/

const mainController = {
  getBoxes: (req, res) => {
    boxRequest.getBox()
      .then((result) => {
        const apiBoxes  = result.data;
        console.log(apiBoxes );
        res.render("index", { boxes: apiBoxes  } );
      })
      .catch((err) => {
        console.log(err);
        res.render("index", { boxes: [] }); // Em caso de erro, você pode passar um array vazio ou algum outro valor padrão para o template
      });
  }
};
module.exports = mainController;
