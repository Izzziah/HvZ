import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class PlayerService {

  constructor(private apiService: ApiService) { }

    getAllPlayers()
    {
      let cmd = 'player/getAll'
      let obser: any = this.apiService.Get(cmd).share();
      obser.subscribe(
        data => {
          localStorage.setItem('players', JSON.stringify(data));
          return true;
        },
        err => {
          console.log('err: ' + err);
          return false;
        }
      )
      return obser;
    }

    postPlayerScore(playerId: number, newScore: number)
    {
      let cmd = 'player/postScore?playerId=' + playerId + '&newScore=' + newScore;
      console.log('newScore: ' + newScore);
      this.apiService.Post(cmd, null).subscribe(data => {
        console.log('log 2');
        return true;
      },
        err => {
          console.log('err: ' + err);
          return false;
        }
      )
    }
}