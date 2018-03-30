import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlayerService {
  private loggedIn = false;
  loggedIn$: Observable<any>;
  private _observer: Observer<boolean>;
  busy: boolean = false;
  
  constructor(private apiService: ApiService) 
  {
    this.loggedIn$ = new Observable(observer => this._observer = observer).share();
  }

    getAllPlayers()
    {
      let cmd = 'player/getAll';
      let obser: any = this.apiService.Get(cmd).share();
      obser.subscribe(
        null,
        err => {
          console.log('getAllPlayers err: ' + err);
        }
      )
      return obser;
    }

    getPlayerById(playerId: number)
    {
      let cmd = 'player/getPlayerById?playerId=' + playerId;
      let obser: any = this.apiService.Get(cmd).share();
      obser.subscribe(null,
        err => {
          console.log('getPlayerById err: ' + err);
        }
      )
      return obser;
    }

    postNewPlayer(playerName: string, password: string, realname: string, email: string, points: number)
    {
        let cmd = 'player/postNewPlayer?playerName=' + playerName + '&password=' 
                  + password + '&realname=' + realname + '&email=' + email + '&points=' + points;
        this.apiService.Post(cmd, null).subscribe(null,
            err => {
                console.log('player.service.postNewPlayer err: ' + err);
            });
    }

    postPlayerScore(playerId: number, newScore: number)
    {
        this.lock();
        let cmd = 'player/postScore?playerId=' + playerId + '&newScore=' + newScore;
        // console.log('newScore: ' + newScore);
        this.apiService.Post(cmd, null).subscribe(data => null,
            err => {
              console.log('err: ' + err);
            }
        );
        this.unlock();
    }

    checkCode(code: string): any
    {
        this.lock();
        let cmd = 'player/checkCode?code=' + code;
        let obser: any = this.apiService.Get(cmd).share();
        let _data = null;
        obser.subscribe(
            data => data,
            err => {
                console.log('err: ' + err);
              });
        this.unlock();
        return obser;
    }

    deleteCode(codeId: number)
    {
        let cmd = 'player/deleteCode?codeId=' + codeId;
        console.log('delete: ' + cmd);
        // looks like we need to subscribe to get the request to go through
        this.apiService.Post(cmd, null).subscribe(null, 
          err => {
              console.log('player.service.deleteCode err: ' + err);
          });
    }

    setUsedCode(codeId: number, userId)
    {
        let cmd = 'player/setUsedCode?codeId=' + codeId + 'userId' + userId;
        console.log('delete: ' + cmd);
        // looks like we need to subscribe to get the request to go through
        this.apiService.Post(cmd, null).subscribe(null, 
          err => {
              console.log('player.service.deleteCode err: ' + err);
          });
    }
    
    // mutex-ish
    lock() { this.busy = true; }
    unlock() { this.busy = false; }
    isBusy() { return this.busy; }
}