import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private userService: UserService) { }

  register(form: NgForm) {
    if (form.invalid) { return; }
    const { email, password, rePassword } = form.value;
    this.userService.registerUserWithEmailAndPassword(email, password)
  }
}