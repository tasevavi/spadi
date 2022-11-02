import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore"; 
import { environment } from "src/environments/environment";
import { db } from 'src/main';
import { NgForm } from '@angular/forms';

const apiURL = environment.apiURL; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = getAuth();
  redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
  uid: string | undefined;
  user: User | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private firestore: AngularFirestore
  ) { }

  //Authentication, Register, Login, Logout
  isUserLoggedIn() {
    return !!getAuth().currentUser;
  }

  loginUserWithEmailAndPassword(email: string, password: string) {
    
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => { // Signed in 
        this.user = userCredential.user;
        this.router.navigate([this.redirectUrl]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info
        this.user = result.user;
        //TODO: save user info in DB + check if such user exists and don't save it
        this.router.navigate([this.redirectUrl]);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  registerUserWithEmailAndPassword(email: string, password: string) {

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.uid = userCredential.user.uid;
        return this.firestore.collection('users')
          .doc(userCredential.user.uid)
          .set({email: email});
      })
      .then(() => {
        // Registered, signed in and added to DB collection 'users'
        this.router.navigate([this.redirectUrl]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    );
  }

  logout() {

    signOut(this.auth)
      .then(() => { // Sign-out successful
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    );
  }

  //Get user data - Set an authentication state observer and get user data
  getUserData() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.uid = user.uid;
      } else {
        // User is signed out
        // ...
      }
    });
  }

  //Add user to DB
  async addNewUserToDB() {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: this.user?.email, 
        firstName: null, 
        lastName: null, 
        nickName: null,
        locationCity: null
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  //Find user by UID in DB
  async findUserByUid(uid: any) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      // console.log('No such document!');
      return undefined;
    }
  }

  //Edit user profile information
  editUserProfileInformation(uid: any, form: NgForm) {
    const userRef = doc(db, 'users', uid);
    setDoc(userRef, form, { merge: true });
  }

}