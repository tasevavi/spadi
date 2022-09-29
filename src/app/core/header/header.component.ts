import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

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

  logout(): void {
    this.userService.logout();
    // this.userService.logout().subscribe(() => {
    //   this.router.navigate(['/']);
    // });
  }
}
