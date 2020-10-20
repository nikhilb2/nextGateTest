import firebase from 'firebase'
var firebaseConfig = {
  //this key is not supposed to be here
  apiKey: 'AIzaSyDx6T7w3OYs9Yemtz-HRg6dwFrjqaJur-Q',
  authDomain: 'nextgate-f883f.firebaseapp.com',
  databaseURL: 'https://nextgate-f883f.firebaseio.com',
  projectId: 'nextgate-f883f',
  storageBucket: 'nextgate-f883f.appspot.com',
  messagingSenderId: '650779810142',
  appId: '1:650779810142:web:60b8221c983b0b1bb397cf',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
