import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'firebase/auth';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  profilePictureSrc: string = "https://avatars.githubusercontent.com/u/87774260?v=4"
  showEditForm: boolean = false;
  user: User | undefined;
  userUID: string | undefined;
  userFirstName: string = ''
  userLastName: string = ''
  userNames: string = this.userFirstName + ' ' + this.userLastName
  userNickName: string = 'tasevaVi'
  userCity: string = 'Sofia'
  userCountry: string = 'Bulgaria'
  userPostings: string = '4'
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.user = this.getUserInformation();
    this.userUID = this.user?.uid;
    console.log('onInit in profile component-user:', this.user)
    //const currentUser = this.userService.findUserByUid(this.userUID);
  }

  getUserInformation() {
    return this.userService.user;
  }

  changeUserInformation(form: NgForm) {
    console.log('changeUserInformation in profile component:', form);
    if (form.invalid) { 
      //TODO remove in the end -> only for debugging
      console.log('invalid form');
      return; 
    }
    //this.userService.setUserName(firstName, lastName, city, country, this.userUID);
    this.showOrHideEditForm();
  }

  showOrHideEditForm() {
    this.showEditForm = !this.showEditForm;
  }

}
