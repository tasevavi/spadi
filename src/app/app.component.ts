import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

//TODO: move this interface to a interface folder 
interface IUser {
  email: string,
  firstName: string, 
  lastName: string,
  locationCity: string,
  posts: string[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.users = firestore.collection('users').valueChanges();
  }

  title = 'spadi';
}
//TODO add icon.io
//TODO change title
//TODO add terms and services
//TODO add About
//TODO in assets create Home folder for all images for the home page