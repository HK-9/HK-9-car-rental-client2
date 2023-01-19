import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'


const config = {
    apiKey: "AIzaSyDbAK6iz2O6lcVJpa6wKkDQR0YAgfKP-S0",
    authDomain: "rentx-740a4.firebaseapp.com",
    projectId: "rentx-740a4",
    storageBucket: "rentx-740a4.appspot.com",
    messagingSenderId: "509160802339",
    appId: "1:509160802339:web:de0686a8cefad944b0c996"
}

//const provider=new GoogleAuthProvider()
export default firebase.initializeApp(config);