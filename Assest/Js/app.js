// const getData = async() => {
//     let response  = await fetch('https://fakestoreapi.com/products');
//     let data = await response.json();

//     for(let i = 0; i < data.length; i++){
//         console.log(data[i].category);
//     }
// }
// getData()

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { GoogleAuthProvider,getAuth,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import { getFirestore,collection, addDoc,getDocs,doc, deleteDoc  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAoaXxyrdjzHBB9lgxvZBBBw-MtnlO8PGU",
    authDomain: "fakestore-ecommerce-form.firebaseapp.com",
    projectId: "fakestore-ecommerce-form",
    storageBucket: "fakestore-ecommerce-form.appspot.com",
    messagingSenderId: "756055217773",
    appId: "1:756055217773:web:a28420e2f48fcf3b4fd164",
    measurementId: "G-7M5TNZDG1S"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth();
  const db = getFirestore(app);
  export {getFirestore,db,collection, addDoc,app,getDocs,doc, deleteDoc  }
  auth.languageCode = 'it';

  const provider = new GoogleAuthProvider();


  let withGoogleBtn = document.getElementById('withGoogle');

try{
  withGoogleBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    sessionStorage.setItem('displayName', user.displayName)
    location.href = 'home.html'
  }).catch((error) => {
      console.clear()
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  })


//   Get Inputs
let emailSignUpInput = document.getElementById('emailSignUpInput')
let passwordSignUpInput = document.getElementById('passwordSignUpInput')

let emailSignInInput = document.getElementById('emailSignInInput')
let passwordSignInInput = document.getElementById('passwordSignInInput')

// get Buttons
let signUpBtn = document.getElementById('signUpBtn')
let signInBtn = document.getElementById('signInBtn')

function clear() {
    document.querySelectorAll('input').forEach(inp => {
        inp.value = ''
    })
}

// get Areas

let signUpArea = document.querySelector('.signUp')
let signInArea = document.querySelector('.signIn')

signUpBtn.addEventListener('click', () => {
  createUserWithEmailAndPassword(auth, emailSignUpInput.value, passwordSignUpInput.value)
  .then((userCredential) => {
    sessionStorage.setItem('fakeUserName', document.getElementById('userNameInput').value)
    const user = userCredential.user;
    signUpArea.style.display = 'none'
    signInArea.style.display = 'flex'
    clear()
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})

signInBtn.addEventListener('click', () =>{
    signInWithEmailAndPassword(auth, emailSignInInput.value, passwordSignInInput.value)
  .then((userCredential) => {
    const user = userCredential.user;
    user.displayName = sessionStorage.getItem('fakeUserName')
    sessionStorage.setItem('displayName', user.displayName)
    console.log(user);
    location.href = 'home.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})

// get have or nohave BTN

let have = document.getElementById('have')
let nohave = document.getElementById('nohave')

have.addEventListener('click', () => {
    signUpArea.style.display = 'none'
    signInArea.style.display = 'flex'
})
nohave.addEventListener('click', () => {
    signInArea.style.display = 'none'
    signUpArea.style.display = 'flex'
})
}catch(err){
  console.log(err);
}