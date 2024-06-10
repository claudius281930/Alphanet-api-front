function actialyHour() {
  const horaLocalInput = document.getElementById("hoursLocal");

  //Obtenha a data e hora local atual
  const dataHoraLocal = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  //Defina o valor do campo de entrada como a hora local atual.
  horaLocalInput.value = dataHoraLocal;
}
// Chame a função para atualizar a hora imediatamente
actialyHour();

// Configura um intevalo para atualizar a hora imediatamente.
setInterval(actialyHour, 1000);
