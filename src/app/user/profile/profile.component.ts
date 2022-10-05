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
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    //set all values if they exist
    //add the values in the edit form and manage where it stands if the user doesnt want to use it
  }

  getUserInformation() {
    this.userService.getUserInformation(this.userUID);
  }

  changeUserInformation(form: NgForm) {
    if (form.invalid) { 
      //TODO remove in the end -> only for debugging
      console.log('invalid form');
      return; 
    }
    const { email, firstName, lastName } = form.value;
    this.userService.setUserName(email, firstName, lastName, this.userUID);
    //redirect to profile here or in the service?
  }

  showOrHideEditForm() {
    this.showEditForm = !this.showEditForm;
  }

}
