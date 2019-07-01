import firebase from 'firebase/app'
import 'firebase/database'

export type Firebase = firebase.app.App

const config = {
  apiKey: 'AIzaSyDzLDuhoiPYUg1G4QHfjtcdDGL_Igf1VBc',
  authDomain: 'todolist-d0f0e.firebaseapp.com',
  databaseURL: 'https://todolist-d0f0e.firebaseio.com',
  projectId: 'todolist-d0f0e',
  storageBucket: '',
  messagingSenderId: '14332966032',
  appId: '1:14332966032:web:45a897f63e7ce735'
}

export default firebase.initializeApp(config)
