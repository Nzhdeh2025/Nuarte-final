console.log("JS ֆայլը միացված է");
// Firebase SDK-ի ներմուծում CDN-ից
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase-ի կոնֆիգուրացիա (փոխարինիր քո տվյալներով)
const firebaseConfig = {
  apiKey: "ՔՈ-API-KEY-Ը",
  authDomain: "ՔՈ-APP.firebaseapp.com",
  projectId: "ՔՈ-PROJECT-ID",
  storageBucket: "ՔՈ-BUCKET.appspot.com",
  messagingSenderId: "ՔՈ-SENDER-ID",
  appId: "ՔՈ-APP-ID"
};

// Firebase-ի ինիցիալիզացում
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Լեզվի փոխման ֆունկցիա
function changeLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  alert("Լեզուն փոխվեց՝ " + lang);
}

// Մեկնաբանությունների բեռնում
function loadComments(paintingId) {
  const commentsContainer = document.getElementById(`comments-${paintingId}`);
  commentsContainer.innerHTML = "Մեկնաբանությունները բեռնվում են...";

  const q = query(collection(db, "comments"), where("paintingId", "==", paintingId));
  getDocs(q).then(snapshot => {
    commentsContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const p = document.createElement("p");
      p.textContent = `${data.username}: ${data.text}`;
      commentsContainer.appendChild(p);
    });
  });
}

// Մեկնաբանության ավելացման ֆունկցիա
function submitComment(paintingId) {
  const name = document.getElementById(`name-${paintingId}`).value;
  const text = document.getElementById(`comment-${paintingId}`).value;

  if (!name || !text) {
    alert("Խնդրում ենք լրացնել անունն ու մեկնաբանությունը։");
    return;
  }

  addDoc(collection(db, "comments"), {
    paintingId,
    username: name,
    text,
    createdAt: new Date()
  }).then(() => {
    alert("Մեկնաբանությունը ավելացվել է։");
    loadComments(paintingId);
  });
}

// Մեկնաբանությունների ավտոմատ բեռնում
loadComments("1");

// Ֆունկցիաները հասանելի դարձնել գլոբալ տիրույթում
window.changeLanguage = changeLanguage;
window.submitComment = submitComment;
