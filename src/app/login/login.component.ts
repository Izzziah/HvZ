import { Component, OnInit } from '@angular/core';

import { Response } from '@angular/http';

import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'app/services/authentication.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  errMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private navService: NavService
    // ,private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  login(username: string, password: string)
  {
    this.loading = true;
    // console.log('1 loggedin? -- ' + this.authenticationService.checkLogin());
    try {
      this.authenticationService.login(username, password)
        .subscribe(
          data => {
            this.loginSuccess(data);
          },
          err => this.loginError(<any>err)
        );
    }
    catch (ex) {
      console.error('Error loggin in: ' + ex);
    }
    // console.log('loggedIn: ' + this.authenticationService.loggedIn())
    // console.log('2 loading? -- ' + this.loading);
    // console.log('2 loggedin? -- ' + this.authenticationService.checkLogin());
  }

  private loginSuccess(data)
  {
    this.loading = false;
    // console.log('3a loggedin? -- ' + this.authenticationService.checkLogin());
    this.navService.navTo('/userhome');
  }

  private loginError(err)
  {
    let errMsg = 'Username or password is incorrect';
    // console.log('3b loggedin? -- ' + this.authenticationService.checkLogin());
    if (err instanceof Response) {
        let resp: Response = err;
        let body = resp.json();
        if (body.Message) {
            errMsg = body.Message;
        }
    }
    this.errMsg = errMsg;
    this.loading = false;
  }

}
