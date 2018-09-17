import {auth} from './firebase'

auth.onAuthStateChanged(user => {})

const signIn = (email, pass) => auth.signInWithEmailAndPassword(email, pass)
const signOut = () => auth.signOut()
// const addUser = (email, pass) => auth.createUserWithEmailAndPassword(email, pass)