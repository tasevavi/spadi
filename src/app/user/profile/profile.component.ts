import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'firebase/auth';
import { UserInformation } from 'src/app/types/userInformation';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  currentUser: User | undefined;
  profilePictureSrc: string = "https://avatars.githubusercontent.com/u/87774260?v=4"
  showEditForm: boolean = false;
  user: any = new UserInformation()
  userUID: string | undefined;

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.currentUser = this.userService.user;
    this.userUID = this.currentUser?.uid;
    this.setCurrentUserInformation();
  }

  setCurrentUserInformation() {
    this.userService.findUserByUid(this.userUID).then(data => {
      if (data !== undefined) {
        Object.keys(data).forEach(key => {
          this.user[key] = data[key];
        });
      }
    });
  }

  changeUserInformation(form: NgForm) {
    console.log('changeUserInformation in profile component:', form);
    if (form.invalid) { 
      //TODO remove in the end -> only for debugging
      console.log('invalid form');
      return; 
    }
    this.showOrHideEditForm();
  }

  showOrHideEditForm() {
    this.showEditForm = !this.showEditForm;
  }

}