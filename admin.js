import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase կոնֆիգ
const firebaseConfig = {
  apiKey: "ՔՈ-API-KEY-Ը",
  authDomain: "ՔՈ-APP.firebaseapp.com",
  projectId: "ՔՈ-PROJECT-ID",
  storageBucket: "ՔՈ-BUCKET.appspot.com",
  messagingSenderId: "ՔՈ-SENDER-ID",
  appId: "ՔՈ-APP-ID"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("addImageBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();

  if (!title || !description || !imageUrl) {
    document.getElementById("status").textContent = "Խնդրում ենք լրացնել բոլոր դաշտերը։";
    return;
  }

  try {
    await addDoc(collection(db, "paintings"), {
      title,
      description,
      imageUrl,
      createdAt: new Date()
    });

    document.getElementById("status").textContent = "Նկարը հաջողությամբ ավելացվել է։";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("imageUrl").value = "";
  } catch (e) {
    document.getElementById("status").textContent = "Սխալ տեղի ունեցավ։";
    console.error(e);
  }
});
