
const { response } = require("express");



function validateQR() {
  let code = document.getElementById("qrValue").value;

  fetch("https://ready2solve.club:8081/api/transaction/entregakit/" + code)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function validarExistencia(){

  let code = document.getElementById("qrValue").value;

  fetch("http://localhost:8087/verificar-existencia/" + code)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.status);
      if (data.status == false) {
        console.log("WORK BUT NOT DISPLAYS");
        alert("Este boleto ya fue registrado.");
        return false;
      }
        return true;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function appendData(data) {
  document.getElementById("idEncoded").value =
    document.getElementById("qrValue").value;
  document.getElementById("nombre").value = data.nombres;
  document.getElementById("apellidos").value = data.apellidos;
  document.getElementById("fechaNacimiento").value = data.fechaNacimiento;
  document.getElementById("correo").value = data.correo;
  if (data.tickets == "696") {
    document.getElementById("categoria").value = data.categoryAvalanche;
  } else {
    document.getElementById("categoria").value = data.categoryTrail;
  }
}
