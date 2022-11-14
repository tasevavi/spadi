import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    authenticationRequired: false,
                    authenticationFailureRedirectUrl: '/',
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    authenticationRequired: false,
                    authenticationFailureRedirectUrl: '/',
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
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