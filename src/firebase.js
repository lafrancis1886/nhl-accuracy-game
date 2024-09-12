import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import { getFirestore,connectFirestoreEmulator } from 'firebase/firestore'
import { doc, collection, addDoc, setDoc, updateDoc, onSnapshot, getDoc, query, where, limit, getDocs } from 'firebase/firestore'
import { generateId } from './util'


/**
 * Encapsulate firebase calls in firebase.js
 */
let firebaseConfig = {

};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//USE FOR PRODUCTION
/*const db = getFirestore(firebaseApp)*/

//EMULATOR
const db = getFirestore()
connectFirestoreEmulator(db, '127.0.0.1', 8080)


export async function createUser(data) {
    const userData = Object.assign({createtime: Date.now(), modtime: Date.now()}, data)
    //const newUser = doc(db, 'users')

    const docRef = await addDoc(collection(db, "users"), userData)
    if(docRef?.id) {
        const newUserDocRef = doc(db, 'users', docRef.id)
        const newUser = await getDoc(newUserDocRef)
        if(newUser.exists()) {
            return newUser
        }
    }

    return undefined
}

export async function queryForUser(email, password) {
    const userQueryForLogin = query(collection(db, 'users'),
        where("email", "==", email),
        where("password", "==", password),
        limit(1)
    )

    try {
        const userDocRef = await getDocs(userQueryForLogin)
        if(userDocRef.docs?.length === 1) {
            return userDocRef.docs[0]
        }
    } catch(e) {
        console.log(`error logging in: ${e}`)
        return undefined
    }

    return undefined
}


//doc - create a document reference
//arg1 -firestore  db
//arg2 - path to document - collection/doc/collection/doc...
//doc paths even collection paths odd
//const sampleDocument = doc(db, 'collection/doc')

//Writing to docs is async but dont wait for write to finish to hang UI
/*async function writeToSampleDoc() {
    const docData = {

    }
    //create/replace
    try {
        const docRef = await setDoc(sampleDocument, docData)
    } catch(e) {

    }
}

async function updateSampleDoc() {
    const docData = {

    }

    try {
        const docRef = await updateDoc(sampleDoc, docData)

    } catch (e) {

    }
    //keeps everything that is not overwritten but will throw error if doc doesnt exist
}

function createIfNewUpdateIfExists() {
    const docData = {

    }

    setDoc(sampleDoc, docData, {merge: true}).then().catch()
}


async function addNewDocument(collectionRef) {
   try {
    const docRef = await addDoc(collectionRef, docData)

   } catch(e) {

   } 
}


async function readDocument(docRef) {
    const mySnapshot = await getDoc(docRef)
    if(mySnapshot.exists()) {
        const data = mySnapshot.data()
        const id = mySnapshot.id
    }
}


function listenToADocumentChange(docRef) {
    //THis function will listen to changes on the docRef
    //The return function can be called to kill the listener
    const docListenerCancelCall = onSnapshot(docRef, (docSnapshot) => {
        if(docSnapshot.exists()) {
            const newData = docSnapshot.data()
        }
    })

    return docListenerCancelCall
}*/



/*async function queryForDocuments() {
    const q = query(
        collection(db, 'collection-name'),
        //where()
        //orderBy()
        limit(10)
    )

    //also supports listening
    //const cleanUpFunction = onSnapshot(q, (querySnapshots) => {
    //    querySnapshots.docs().map(d => console.log(d.data()))
    //})
    const querySnapshot = await getDocs(q)
    const allDocs = querySnapshot.docs() //forEach on snapshot
}*/