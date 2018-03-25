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
  }

  private loginSet(loggedIn: boolean)
  {
    this.loggedIn = loggedIn;
    if (this._observer) {
        this._observer.next(this.loggedIn);
    }
  }

  // validateTokenOld(): boolean
  // {
  //   this.player = JSON.parse(sessionStorage.getItem('player'));
  //   // console.log('player: ' + JSON.stringify(this.player));
  //   if (this.player == null)
  //   {
  //     return false;
  //   }
  //   var tokenUri = encodeURIComponent(this.player["AccessToken"]);
  //   console.log("access token uri: " + tokenUri);
  //   this.apiService.Get('/verifyToken?playerId=' + this.player["PlayerId"]
  //     + '&token=' + tokenUri).subscribe(data => {
  //       console.log('data: ' + JSON.stringify(data));
  //       return true;
  //     },
  //     err => {return false;}
  //     );
  // }

  validateToken()
  {
    this.player = JSON.parse(sessionStorage.getItem('player'));
    var tokenUri = encodeURIComponent(this.player["AccessToken"]);
    console.log('player: ' + JSON.stringify(this.player));
    return this.apiService.Get('/verifyToken?playerId=' + this.player["PlayerId"]
      + '&token=' + tokenUri);
  }

}
