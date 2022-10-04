import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: Observable<any[]>;
  constructor(userService: UserService) { 
    this.users = userService.getUsersFromDatabase();
  }

  
  ngOnInit(): void {
    
  }

}
