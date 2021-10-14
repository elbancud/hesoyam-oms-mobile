import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC7j88BG_NTA0sMsdqPLmUN2RFHm1j3lss",
  authDomain: "hesoyam-oms-867e4.firebaseapp.com",
  projectId: "hesoyam-oms-867e4",
  storageBucket: "hesoyam-oms-867e4.appspot.com",
  messagingSenderId: "1065225240501",
  appId: "1:1065225240501:web:7b4f31bad8a2c9d44a23fc",
  measurementId: "G-T9FGXS3E9P"
}
let app
 
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);

} else {
  app = firebase.app()
}

const auth = firebase.auth();

export { auth };
export default firebase;