import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    // if (form.invalid) { return; }
    // const { email, password } = form.value;
    // this.userService.login({ email, password }).subscribe({
    //   next: () => {
    //     const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
    //     this.router.navigate([redirectUrl]);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   }
    // });
  }

  loginWithGoogle(): void {
    this.userService.loginWithGoogle();
  }

}
