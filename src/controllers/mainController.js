const mainController = {
  index: (req, res) => {
    res.render("index");
  },
  postBox: (req, res) => {
    res.render("postBox");
  },
  getBoxes: (req, res) => {
    res.render("getBoxes");
  },
  updateBox: (req, res) => {
    res.render("updateBox");
  },
  deleteBox: (req, res) => {
    res.render("deleteBox");
  },
};
module.exports = mainController;
