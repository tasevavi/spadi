import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //TODO: find a way to extract uid from url???
  //import the db firebase in another way - check the guide in firebase and refactor initialize app and all imports
  userUID: string = 'cX428KIMg5YhjSscmzOiHFJgGEG3';
  showEditForm: boolean = false;
  userFirstName: string = 'Violeta'
  userLastName: string = 'Taseva'
  userNames: string = this.userFirstName + ' ' + this.userLastName
  userNickName: string = 'tasevaVi'
  userCity: string = 'Sofia'
  userCountry: string = 'Bulgaria'
  profilePictureSrc: string = "https://avatars.githubusercontent.com/u/87774260?v=4"
  userPostings: string = '4'
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    //set all values if they exist
    //add the values in the edit form and manage where it stands if the user doesnt want to use it
  }

  getUserInformation() {
    this.userService.getUserInformation(this.userUID);
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
