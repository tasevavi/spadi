import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }

  navigateToProfile() {
    if (this.isLoggedIn()) {
      const currentUser = this.userService.user;
      const userUID = currentUser?.uid;
      this.router.navigate(['users/profile'], { queryParams: {
        id: userUID
      }});
    }
  }

  logout(): void {
    this.userService.logout();
  }
}
