import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWzuD_el1qUPPEiktpf72DDLPJSA5b8Os",
  authDomain: "bbc-by.firebaseapp.com",
  projectId: "bbc-by",
  storageBucket: "bbc-by.firebasestorage.app",
  messagingSenderId: "100301946023",
  appId: "1:100301946023:web:8fb2cbd8da931c29b0af82",
  measurementId: "G-DP8TYHR19X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);