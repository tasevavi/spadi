import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthActivate } from '../core/guards/auth.activate';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                //canActivate: [AuthActivate],
                data: {
                    authenticationRequired: false,
                    authenticationFailureRedirectUrl: '/',
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                //canActivate: [AuthActivate],
                data: {
                    authenticationRequired: false,
                    authenticationFailureRedirectUrl: '/',
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                //canActivate: [AuthActivate],
                data: {
                    authenticationRequired: true,
                    authenticationFailureRedirectUrl: '/login',
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }