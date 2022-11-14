import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonateComponent } from './donate/donate.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full', 
    component: HomeComponent
  }, 
  {
    path: 'donate', 
    component: DonateComponent,
    canActivate: [AuthGuard],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/login',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
