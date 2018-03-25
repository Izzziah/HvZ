import { Component } from '@angular/core';

import { Router } from "@angular/router";
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  loggedin = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  toLogin() {this.authService.validateToken().subscribe(
    data =>
    {
      this.router.navigate(['/login']);
      this.loggedin = true;
    },
    err => {
      this.loggedin = false;
    });
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
