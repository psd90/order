import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


 export const  handleLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);


export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const {uid} = userAuth;
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    if (snapshot.exists) {
        const {dpName, email} = userAuth;
        const timestamp = new DataView();

        try{
            await userRef.set({
                dpName,
                email,
                createdDate: timestamp,
                ...additionalData
            })
        }catch(err){
            console.log(err)
        }
    }
    return userRef;


}
