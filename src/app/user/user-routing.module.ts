import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthActivate } from '../core/guards/auth.activate';
//import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
//import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: 'users',
        children: [
            // {
            //     path: 'register',
            //     component: RegisterComponent,
            //     //canActivate: [AuthActivate],
            //     data: {
            //         authenticationRequired: false,
            //         authenticationFailureRedirectUrl: '/',
            //     }
            // },
            {
                path: 'login',
                component: LoginComponent,
                //canActivate: [AuthActivate],
                data: {
                    authenticationRequired: false,
                    authenticationFailureRedirectUrl: '/',
                }
            },
            // {
            //     path: ':id',
            //     component: ProfileComponent,
            //     //canActivate: [AuthActivate],
            //     data: {
            //         authenticationRequired: true,
            //         authenticationFailureRedirectUrl: '/login',
            //     }
            // }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }