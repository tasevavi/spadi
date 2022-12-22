import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { collection, addDoc, doc, getDoc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore'; 
import { environment } from 'src/environments/environment';
import { db } from 'src/main';
import { NgForm } from '@angular/forms';
import { from, Observable } from 'rxjs';

const apiURL = environment.apiURL; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = getAuth();
  redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
  uid: any;
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

  getUser() {
    return this.user;
  }

  getUserUid() {
    return this.uid;
  }

  loginUserWithEmailAndPassword(email: string, password: string) {
    
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => { // Signed in 
        this.user = userCredential.user;
        this.uid = this.user.uid;
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
        this.user = result.user;
        this.uid = this.user.uid;
        let checkUserExists = this.findUserByUid(this.uid);
        if (checkUserExists === undefined) {
          this.addNewUserToDB();
        }
        this.router.navigate([this.redirectUrl]);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  registerUserWithEmailAndPassword(email: string, password: string, firstName: string, lastName: string) {

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.uid = userCredential.user.uid;
        return this.firestore.collection('users')
          .doc(userCredential.user.uid)
          .set({email: email, firstName: firstName, lastName: lastName});
      })
      .then(() => {
        // Registered, signed in and added to DB collection 'users'
        this.router.navigate(['users/profile'], { queryParams: {
          id: this.uid
        }});
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
        this.router.navigate(['/']);
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
        nickName: this.user?.displayName,
        locationCity: null, 
        requestedItems: []
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  //Find user by UID in DB
  async findUserByUid(uid: any) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return undefined;
    }
  }

  //Edit user profile information
  editUserProfileInformation(uid: any, form: NgForm) {
    const userRef = doc(db, 'users', uid);
    setDoc(userRef, form, { merge: true });
  }

  //Add an item to user's requests
  async addRequestItemToUserRequests(postId: string) {
    const uid = this.getUserUid();
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      requestedItems: arrayUnion(postId)
    });
  }

  //Get all user requests -> returns an array with requested items' id
  getUserRequests$(): Observable<String[]> {
    const uid = this.getUserUid();
    const userRequests = from(this.findUserByUid(uid)
      .then(user => {
        if (user !== undefined) {
          return user['requestedItems'];
        }
      }));
    return userRequests;
  }

}