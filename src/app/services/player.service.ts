import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import { AdminService } from './admin.service';

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

    getCodeById(codeId: number)
    {
      let cmd = 'player/GetCodeById?codeId=' + codeId;
      let obser: any = this.apiService.Get(cmd).share();
      obser.subscribe(null,
        err => {
          console.log('getCodeById err: ' + err);
        }
      )
      return obser;
    }

    postNewPlayer(playerName: string, password: string, realname: string, email: string, points: number)
    {
        let cmd = 'player/postNewPlayer?playerName=' + encodeURIComponent(playerName) + '&password=' 
                  + encodeURIComponent(password) + '&realname=' + encodeURIComponent(realname) + '&email=' + encodeURIComponent(email) + '&points=' + points;
        this.apiService.Post(cmd, null).subscribe(null,
            err => {
                console.log('player.service.postNewPlayer err: ' + err);
            });
    }

    postPlayerScore(playerId: number, scoreId: number)
    {
        this.lock();
        let cmd = 'player/postScore?playerId=' + playerId + '&newScoreId=' + scoreId;
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

    // deleteCode(codeId: number)
    // {
    //     let cmd = 'player/deleteCode?codeId=' + codeId;
    //     console.log('delete: ' + cmd);
    //     // looks like we need to subscribe to get the request to go through
    //     this.apiService.Post(cmd, null).subscribe(null, 
    //       err => {
    //           console.log('player.service.deleteCode err: ' + err);
    //       });
    // }

    setUsedCode(codeId: number, userId: number)
    {
        let cmd = 'player/setUsedCode?codeId=' + codeId + '&userId=' + userId;
        console.log('setUsedCode: ' + cmd);

        // looks like we need to subscribe to get the request to go through
        this.apiService.Post(cmd, null).subscribe(null, 
          err => {
              console.log('player.service.setUsedCode err: ' + err);
          });
    }

    getEvents()
    {
      let cmd = 'player/getAllEvents';
      let obser: any = this.apiService.Get(cmd).share();
      obser.subscribe(
        null,
        err => {
          console.log('getAllEvents err: ' + err);
        }
      )
      return obser;
    }

    getPlayerEvents(playerId: number)
    {
      let cmd = 'player/getEventsByPlayerId?playerId='+playerId;
      let obser: any = this.apiService.Get(cmd).share();
      obser.subscribe(
        null,
        err => {
          console.log('getAllEvents err: ' + err);
        }
      )
      return obser;
    }

    joinEvent(eventId: number, playerId)
    {
      let cmd = 'player/joinEvent?eventId='+eventId+'&playerId='+playerId;
      console.log('playerId: ' + playerId);
      return this.apiService.Post(cmd, null).share();
    }
    
    // mutex-ish
    lock() { this.busy = true; }
    unlock() { this.busy = false; }
    isBusy() { return this.busy; }
}