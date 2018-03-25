import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './login/login.component';
import { SharedService } from "./services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ZombiesApp';
  loggedin = false;
  subscription;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private sharedService: SharedService
  ) {
    this.sharedService = sharedService;
  }

  ngOnInit()
  {
    this.subscription = this.sharedService.getEmittedValue().subscribe(
      item => { this.loggedin = item; }
    );
  }

  toLogin() {
    let obser = this.authService.validateToken();
    if (obser != null)
    {
      obser.subscribe(
      data =>
      {
        this.loggedin = true;
      },
      err => {
        this.loggedin = false;
      });
    }
    this.router.navigate(['/login']);
  }

  logout()
  {
    this.authService.logout();
    this.loggedin = false;
    this.router.navigate(['/login']);
  }
}
