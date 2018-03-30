import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  // Authenticate and load user if valid.
  public player: any = null;

  private loggedIn: boolean = false;
  private loggedIn$: Observable<any>;
  private _observer: Observer<boolean>;

  constructor(private apiService: ApiService) {
    this.loggedIn$ = new Observable(oberver => this._observer = oberver);
  }

  login(username: string, password: string)
  {
    let cmd = 'player/login?playerName=' + username + '&password=' + password;
    let obser: any = this.apiService.Get(cmd).share();
    obser.subscribe(
      data => {
        this.player = data;
        this.loginSet(true);
        // console.log('login: ' + this.loggedIn);
      },
      err => {
        console.log('err: ' + err);
        this.loginSet(false);
      }
    );
    return obser;
  }

  getplayer()
  {
    return this.player;
  }

  logout()
  {
    this.loginSet(false);
    sessionStorage.clear();
  }

  private loginSet(loggedIn: boolean)
  {
    this.loggedIn = loggedIn;
    if (this._observer) {
        this._observer.next(this.loggedIn);
    }
  }

  validateToken()
  {
    // console.log('validating...');
    this.player = JSON.parse(sessionStorage.getItem('player'));
    if (this.player != null)
    {
      var tokenUri = encodeURIComponent(this.player["Token"]);
      // console.log('player: ' + JSON.stringify(this.player));
      // console.log('token: ' + tokenUri)
      return this.apiService.Get('/verifyToken?playerId=' + this.player["PlayerId"]
        + '&token=' + tokenUri);
    }
    return null;
  }

}
