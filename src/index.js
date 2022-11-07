

import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

//authentication
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//grabbed from firebase website project settings
const firebaseConfig = {
    apiKey: "AIzaSyDVh9GcpgwG2du1JFB8bs67uK-EyvQ-oYk",
    authDomain: "fir-9-66151.firebaseapp.com",
    projectId: "fir-9-66151",
    storageBucket: "fir-9-66151.appspot.com",
    messagingSenderId: "354306728672",
    appId: "1:354306728672:web:d3ffa1f5bcccc73935a685"
    // measurementId: "G-KS5T7P4JGV"
};

// init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

// quieres
// const q = query(colRef, where("author", "==", "Jk rowlings"), orderBy('createdAt'))
const q = query(colRef, orderBy('createdAt'))

// real time collection data
onSnapshot(q, (snapshot) => {
    let books = [];
    // loops snapshot.docs and adds data() method
    //...doc is the spread operator
    //   console.log(snapshot.docs)
    snapshot.docs.forEach((doc) => {
        // pushes to empty books array
        // grabs doc data and doc id
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)

})


// add form eventlisterner
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', addBook)
function addBook(event) {
    event.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            // resets input fields to blank
            addBookForm.reset();
        })

}

// delete document
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 3 parameters 
    // db initilzation
    // 'books' name of database
    // grabs id from database and deletes value
    const docRef = doc(db, 'books', deleteBookForm.id.value)

    //async can add then & catch 
    deleteDoc(docRef)
        .then(() => {
            //resets delete input to blank
            deleteBookForm.reset()
        })
})


//single document
const docRef = doc(db, 'books', 'p3PY6LHVgGITvCI2LhMe')

onSnapshot(docRef, (doc) => {
    // data method to grab data
    // doc.id logs documents id
    console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated title'
    })
        .then(() => {
            updateForm.reset()
        })
})


// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // .email & .password are input name
    // <input name = 'email'>
    const email = signupForm.email.value
    // <input name = 'password'>
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch(err => {
            console.log(err.message)
        })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('user signed out')
        })
        .catch(err => {
            console.log(err.message)
        })
})


const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})


// subscribing to auth changes
onAuthStateChanged(auth, (user) =>{
    console.log('user status changed', user)
})