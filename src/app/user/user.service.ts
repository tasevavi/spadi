import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

const apiURL = environment.apiURL; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';

  constructor(
    private http: HttpClient, 
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private firestore: AngularFirestore
  ) { }

  initFirebaseAuth() {
    onAuthStateChanged(getAuth(), this.authStateObserver);
  }

  isUserLoggedIn() {
    return !!getAuth().currentUser;
  }
  
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  loginUserWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.router.navigate([this.redirectUrl]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  registerUserWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    );
  }

  authStateObserver(user: any) {
    if (user) {
      const profilePicture = this.getProfilePicUrl();
      const userName = this.getUserName();
    } else {
      //user is not logged in
    }
  }

  getUsersFromDatabase(): Observable<any[]> {
    const users: Observable<any[]> = this.firestore.collection('users').valueChanges();
    return users;
  }

  getUserInformation(userUID: string) {
    //this is repeated code -> refactor and move to the top
    const usersReference = this.firestore.collection('users');
    //const queryReference = usersReference.where('id', '==', userUID);
  }

  getProfilePicUrl() {
    return getAuth().currentUser?.photoURL || '/assets/profile-placeholder.png';
  }

  getUserName() {
    return getAuth().currentUser?.displayName || 'guest';
  }

  async setUserName(email: string, firstName: string, lastName: string, userUID: string) {
    const usersReference = this.firestore.collection('users');
    await usersReference.doc(userUID).set({
      email: email,
      firstName: firstName, 
      lastName: lastName
    });
  }
}
