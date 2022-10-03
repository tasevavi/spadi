import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

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
