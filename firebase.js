
// Importar e inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDySt7-TI2tkI7fKAYrOof_dkELZmzK62Y",
  authDomain: "golpredict-52124.firebaseapp.com",
  databaseURL: "https://golpredict-52124-default-rtdb.firebaseio.com",
  projectId: "golpredict-52124",
  storageBucket: "golpredict-52124.firebasestorage.app",
  messagingSenderId: "478232274376",
  appId: "1:478232274376:web:6b72eb245a08b010c28cfd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
