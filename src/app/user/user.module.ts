import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditFormComponent } from './profile-edit-form/profile-edit-form.component';
import { MatCardModule } from '@angular/material/card';
import { DonationEditFormComponent } from './donation-edit-form/donation-edit-form.component';
import { SharedModule } from "../shared/shared.module";
import { UploadPictureComponent } from './upload-picture/upload-picture.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        ProfileEditFormComponent,
        DonationEditFormComponent,
        UploadPictureComponent
    ],
    providers: [
        UserService
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        MatIconModule,
        MatCardModule,
        SharedModule,
    ]
})
export class UserModule { }
