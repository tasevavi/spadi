import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
//import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditFormComponent } from './profile-edit-form/profile-edit-form.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileEditFormComponent
  ],
  imports: [
    CommonModule,
    // SharedModule, 
    UserRoutingModule, 
    FormsModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
