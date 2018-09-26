import * as firebase from 'firebase';
// import {config} from './config'

const config = process.env.FB || require('./config')

firebase.initializeApp(config)

const db = firebase.database();
const auth = firebase.auth()

export{
  db,
  auth
}