

import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, 
    addDoc, deleteDoc, doc
} from 'firebase/firestore'
// import { env } from 'process';

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

// collection ref
const colRef = collection(db, 'books')

// real time collection data
onSnapshot(colRef, (snapshot)=>{
      let books = [];
      // loops snapshot.docs and adds data() method
      //...doc is the spread operator
    //   console.log(snapshot.docs)
      snapshot.docs.forEach((doc)=>{
          // pushes to empty books array
          // grabs doc data and doc id
          books.push({...doc.data(), id: doc.id})
      })
      console.log(books)

  })


  // add form eventlisterner
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', addBook)
function addBook(event){
    event.preventDefault(); 
    
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(()=>{
        // resets input fields to blank
      addBookForm.reset();
    })

}

// delete document
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // 3 parameters 
    // db initilzation
    // 'books' name of database
    // grabs id from database and deletes value
    const docRef = doc(db, 'books', deleteBookForm.id.value) 

    //async can add then & catch 
    deleteDoc(docRef)
        .then(()=>{
            //resets delete input to blank
            deleteBookForm.reset()
        })
})