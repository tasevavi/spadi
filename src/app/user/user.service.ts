import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

const apiURL = environment.apiURL; 
//TODO: move this interface to a interface folder 
interface IUser {
  email: string,
  firstName: string, 
  lastName: string,
  locationCity: string,
  posts: string[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user: IUser | null | undefined = undefined;
  
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

  register(data: { email: string, password: string, rePassword: string }) {
    return this.http.post<IUser>(`${apiURL}/users/register.json`, data, { withCredentials: false }).pipe(
        tap((user) => this.user = user)
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
