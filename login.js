
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      alert("Sesión iniciada");
      window.location.href = "dashboard.html";
    })
    .catch(error => alert("Error: " + error.message));
}

window.register = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(user => {
      alert("Registro exitoso");
    })
    .catch(error => alert("Error: " + error.message));
}
