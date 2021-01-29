import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config'


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const  FacebookProvider = new firebase.auth.FacebookAuthProvider();
     

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt:'select_account'});



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
