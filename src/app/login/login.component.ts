import { Component } from '@angular/core';

import { Response } from '@angular/http';

import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'app/services/authentication.service';
import { SharedService } from '../services/shared.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};
  loading = false;
  errMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private adminService: AdminService,
    private sharedService: SharedService
  ) {
    this.sharedService = sharedService;
  }

  login(username: string, password: string)
  {
    this.loading = true;
    // console.log('1 loggedin? -- ' + this.authenticationService.validateToken());
    try {
      this.authenticationService.login(username, password)
        .subscribe(
          data => {
            this.loginSuccess(data);
            // sessionStorage.setItem('player', JSON.stringify(data));
            this.sharedService.change();
          },
          err => this.loginError(<any>err)
        );
    }
    catch (ex) {
      console.error('Error loggin in: ' + ex);
    }
  }

  private loginSuccess(data)
  {
    this.loading = false;
    // console.log('> data -- ' + JSON.stringify(data));
    sessionStorage.setItem("player", JSON.stringify(data));
    this.adminService.checkAdmin(data["PlayerId"]).
    subscribe(data => {
      console.log('admin');
      this.router.navigate(['/admin']);
    }, err => {
      console.log('regular');
      this.router.navigate(['/userhome']);
    });
    
  }

  private loginError(err)
  {
    let errMsg = 'Username or password is incorrect';
    // console.log('3b loggedin? -- ' + this.authenticationService.validateToken());
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
