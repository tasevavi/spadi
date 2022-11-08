import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  showEditProfilePictureForm: boolean = false;
  user: any = new UserInformation()
  userUID: string | undefined;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      if (data['id'] !== undefined) {
        this.userUID = data['id']
      } else {
        this.currentUser = this.userService.user;
        this.userUID = this.currentUser?.uid;
      }
      if (this.userUID !== undefined) {
        this.setCurrentUserInformation();
      }
    })
  }

  setCurrentUserInformation() {
    this.userService.findUserByUid(this.userUID).then(data => {
      if (data !== undefined) {
        Object.keys(data).forEach(key => {
          if (key !== undefined) {
            this.user[key] = data[key];
          }
        });
      }
    });
  }

  changeUserInformation(form: NgForm) {
    if (form.invalid) { 
      console.log('Invalid form!')
      return; 
    }
    this.userService.editUserProfileInformation(this.userUID, form);
    this.showOrHideEditForm();
    this.setCurrentUserInformation();
  }

  showOrHideEditForm() {
    this.showEditForm = !this.showEditForm;
  }

  changeUserPhoto(event: any) {

    this.showOrHideEditProfilePictureForm();
  }

  openEditProfilePictureForm() {
    this.showEditProfilePictureForm = true;
  }

  showOrHideEditProfilePictureForm() {
    this.showEditProfilePictureForm = !this.showEditProfilePictureForm;
  }
}