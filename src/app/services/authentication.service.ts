import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  // Authenticate and load user if valid.
  public player: any = null;
  public _playerId: number;
  public _playerName: string;
  public _playerScore: number;

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
        localStorage.setItem('player', JSON.stringify(data));
        this.player = data;
        this._playerId = data["PlayerId"];
        this._playerName = data["PlayerName"];
        this._playerScore = data["Score"];
        this.loginSet(true);
        console.log('login: ' + this.loggedIn);
        return true;
      },
      err => {
        console.log('err: ' + err);
        this.loginSet(false);
        return false;
      }
    );
    return obser;
  }

  logout()
  {
    this.loginSet(false);
  }

  private loginSet(loggedIn: boolean)
  {
    this.loggedIn = loggedIn;
    // console.log('loginSet(...) ==> ' + this.loggedIn)
    if (this._observer) {
        this._observer.next(this.loggedIn);
    }
  }

  checkLogin(): boolean
  {
    return this.loggedIn;
  }

}
