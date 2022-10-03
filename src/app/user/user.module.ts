import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
//import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
//import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    // RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    // SharedModule, 
    UserRoutingModule, 
    FormsModule,
    MatIconModule,
  ],
  //exports: [UserRoutingModule],
  providers: [
    UserService
  ]
})
export class UserModule { }
