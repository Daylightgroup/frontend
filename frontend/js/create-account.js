import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
getAuth,
signInWithPopup,
GoogleAuthProvider,
FacebookAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyB9OW5e5qWAfqe2bqtAMDPANO4Pxj2860Q",
authDomain: "nile-global-refinery-co-ltd.firebaseapp.com",
projectId: "nile-global-refinery-co-ltd",
storageBucket: "nile-global-refinery-co-ltd.appspot.com",
messagingSenderId: "1059815032120",
appId: "1:1059815032120:web:13f231e950d0afc2ed6dcd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* ---------- FORM SWITCH ---------- */

window.showForm = function(type){

let login=document.getElementById("loginForm")
let signup=document.getElementById("signupForm")

let tabs=document.querySelectorAll(".tab")

tabs.forEach(tab=>tab.classList.remove("active"))

if(type==="login"){
login.classList.remove("hidden")
signup.classList.add("hidden")
tabs[0].classList.add("active")
}
else{
signup.classList.remove("hidden")
login.classList.add("hidden")
tabs[1].classList.add("active")
}

}


/* ---------- GOOGLE LOGIN ---------- */

const googleProvider = new GoogleAuthProvider();

window.googleLogin = function(){

signInWithPopup(auth, googleProvider)
.then(()=>{
window.location.href="dashboard.html"
})
.catch((error)=>{
alert(error.message)
})

}


/* ---------- FACEBOOK LOGIN ---------- */

const facebookProvider = new FacebookAuthProvider();

window.facebookLogin = function(){

signInWithPopup(auth, facebookProvider)
.then(()=>{
window.location.href="dashboard.html"
})
.catch((error)=>{
alert(error.message)
})

}


/* ---------- SIGNUP ---------- */

window.signup = function(){

let email = document.getElementById("signupEmail").value;
let password = document.getElementById("signupPassword").value;

createUserWithEmailAndPassword(auth,email,password)
.then(()=>{
alert("Account created successfully")
window.location.href="dashboard.html"
})
.catch((error)=>{
alert(error.message)
})

}


/* ---------- LOGIN ---------- */

window.login = function(){

let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;

signInWithEmailAndPassword(auth,email,password)
.then(()=>{
window.location.href="dashboard.html"
})
.catch((error)=>{
alert(error.message)
})

}