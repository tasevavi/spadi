import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  get isLoggedIn(): boolean {
    return false;
    //return this.userService.isLoggedIn;
  }

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    // this.userService.logout().subscribe(() => {
    //   this.router.navigate(['/']);
    // });
  }
}
