import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { environment } from "src/environments/environment";
import { ActivatedRoute, Router } from '@angular/router';

const apiURL = environment.apiURL; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private http: HttpClient, 
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  registerUserWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
        this.router.navigate([redirectUrl]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    );
  }

  logout() {
    signOut(getAuth());
  }

  authStateObserver(user: any) {
    if (user) {
      const profilePicture = this.getProfilePicUrl();
      const userName = this.getUserName();
    } else {
      //user is not logged in
    }
  }

  getProfilePicUrl() {
    return getAuth().currentUser?.photoURL || '/assets/profile-placeholder.png';
  }

  getUserName() {
    return getAuth().currentUser?.displayName || 'guest';
  }
}
