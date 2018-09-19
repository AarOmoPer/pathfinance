import {auth} from './firebase'

export const square = num => num * num

export const signIn = (email, pass) => console.log
// export const signIn = (email, pass) => auth.signInWithEmailAndPassword(email, pass)
export const signOut = () => auth.signOut()
// const addUser = (email, pass) => auth.createUserWithEmailAndPassword(email, pass)