const detailButton = document.querySelector(".detalhe-button");
  detailButton.addEventListener("click", function () {
  const nameForObject = detailButton.dataset.name_description;
  window.location.href = "/detail/" + nameForObject;
});

module.exports = detailButton;
