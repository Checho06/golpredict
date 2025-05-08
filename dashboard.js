
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const partidosTop = [
  { id: "p1", local: "Real Madrid", visita: "Barcelona" },
  { id: "p2", local: "Boca Juniors", visita: "River Plate" },
  { id: "p3", local: "Manchester City", visita: "Arsenal" },
  { id: "p4", local: "Flamengo", visita: "Palmeiras" },
  { id: "p5", local: "PSG", visita: "Marseille" },
];

const partidoExtra = { id: "p6", local: "Inter", visita: "Milan" }; // Este podría ser reemplazado dinámicamente

function renderMatches(userData) {
  const container = document.getElementById("match-list");
  container.innerHTML = "";

  const clubFavorito = userData.clubFavorito || "";
  let favoritoIncluido = false;

  partidosTop.forEach((partido, index) => {
    const isFavorito = [partido.local, partido.visita].includes(clubFavorito);
    if (isFavorito) favoritoIncluido = true;

    container.innerHTML += `
      <div>
        <p>Partido ${index + 1}: ${partido.local} vs ${partido.visita} ${isFavorito ? '(Tu equipo favorito - vale x2)' : ''}</p>
        <input type="number" id="${partido.id}-local" placeholder="Goles ${partido.local}">
        <input type="number" id="${partido.id}-visit" placeholder="Goles ${partido.visita}">
      </div>
    `;
  });

  // Si el favorito ya estaba, añadimos un sexto partido alternativo
  if (favoritoIncluido) {
    container.innerHTML += `
      <div>
        <p>Partido 6 (Extra): ${partidoExtra.local} vs ${partidoExtra.visita}</p>
        <input type="number" id="${partidoExtra.id}-local" placeholder="Goles ${partidoExtra.local}">
        <input type="number" id="${partidoExtra.id}-visit" placeholder="Goles ${partidoExtra.visita}">
      </div>
    `;
  } else {
    // Si el favorito no estaba, lo añadimos como sexto partido
    container.innerHTML += `
      <div>
        <p>Partido 6 (Tu equipo favorito): ${clubFavorito} vs Rival</p>
        <input type="number" id="fav-local" placeholder="Goles ${clubFavorito}">
        <input type="number" id="fav-visit" placeholder="Goles Rival">
      </div>
    `;
  }
}

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("user-email").innerText = "Usuario: " + user.email;
    const dbRef = ref(db);
    get(child(dbRef, "usuarios/" + user.uid)).then(snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        renderMatches(userData);
      } else {
        alert("No se encontró información del usuario.");
      }
    });
  } else {
    alert("No has iniciado sesión.");
    window.location.href = "index.html";
  }
});

window.submitPredictions = function () {
  const predictions = {};
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
    predictions[input.id] = input.value;
  });

  const user = auth.currentUser;
  if (user) {
    const userRef = ref(db, "predicciones/" + user.uid);
    set(userRef, predictions)
      .then(() => alert("Predicciones guardadas correctamente"))
      .catch(err => alert("Error al guardar: " + err.message));
  } else {
    alert("No estás logueado.");
  }
};
