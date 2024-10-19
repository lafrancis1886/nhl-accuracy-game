import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import { getFirestore,connectFirestoreEmulator } from 'firebase/firestore'
import { doc, collection, addDoc, setDoc, updateDoc, onSnapshot, getDoc, query, where, limit, getDocs, orderBy } from 'firebase/firestore'
import { generateId } from './util'


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

export async function updateUser(currentDoc, newData) {
    const docRef = doc(db, "users", currentDoc.id)

    try {
        const updateCall = await updateDoc(docRef, {...newData, modtime: Date.now()})
        const updatedRef = await getDoc(docRef)
        if(updatedRef) {
            return updatedRef
        }
    } catch(e) {
        console.log(`Error updating user document: ${e}`)
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

export async function queryForPlayersOrderedByGoals(lim) {
    const playerQuery = query(collection(db, "players"), 
        orderBy("goals", "desc"),
        limit(lim)
    )

    try {
        const playerRefs = await getDocs(playerQuery)
        if(playerRefs?.docs?.length > 0) {
            return playerRefs.docs
        }
    } catch(e) {
        console.log(e)
    }
    return undefined
}


export async function queryForFilterData() {
    const filterDoc = doc(db, 'filters/iCoCxoATVdGBgflPxSJZ')
    try {
        const docSnapshot = await getDoc(filterDoc)
        if(docSnapshot.exists()) {
            return docSnapshot
        }
    } catch(e) {
        console.log(`Error fetching filters: ${e}`)
    }
    return undefined
}

export async function queryForPlayerWithName(name) {
    const cleanName = name.trim().toUpperCase()
    const nameQuery = query(collection(db, 'players'), where("1", "==", "1"), limit(50))

    try {
        const playerRefs = await getDocs(nameQuery)
        if(playerRefs?.docs?.length > 0) {
            const filteredPlayers = playerRefs.docs.map(p => p.data()).filter(player => player.skaterFullName.toUpperCase().startsWith(cleanName))
            return filteredPlayers
        }
    } catch (e) {
        console.log(`Unable to fetch players by name with value: ${name}. Exception: ${e}`)
        return undefined
    }
    return undefined
}
