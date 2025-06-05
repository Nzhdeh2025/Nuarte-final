// Լեզվի փոխման գործառույթ
function changeLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  // Այստեղ կարելի է ավելացնել թարգմանությունների բեռնում կամ լեզվային փոփոխություններ
  alert("Language switched to: " + lang);
}

// Պատկերի քոմենտարիաների բեռնում (եթե Firebase է միացված)
function loadComments(paintingId) {
  const commentsContainer = document.getElementById(`comments-${paintingId}`);
  commentsContainer.innerHTML = "Loading comments...";

  // Firebase Firestore-ից բեռնել comments
  import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
  const db = getFirestore();

  const q = query(collection(db, "comments"), where("paintingId", "==", paintingId));
  getDocs(q).then(snapshot => {
    commentsContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const p = document.createElement("p");
      p.textContent = data.username + ": " + data.text;
      commentsContainer.appendChild(p);
    });
  });
}

// Նոր քոմենտարիա ավելացնել
function submitComment(paintingId) {
  const name = document.getElementById(`name-${paintingId}`).value;
  const text = document.getElementById(`comment-${paintingId}`).value;

  if (!name || !text) {
    alert("Խնդրում ենք լրացնել անունն ու մեկնաբանությունը։");
    return;
  }

  import { getFirestore, collection, addDoc } from "firebase/firestore";
  const db = getFirestore();

  addDoc(collection(db, "comments"), {
    paintingId: paintingId,
    username: name,
    text: text,
    createdAt: new Date()
  }).then(() => {
    alert("Մեկնաբանությունը ավելացվել է։");
    loadComments(paintingId);
  });
}
