import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PlayerService } from './player.service';

@Injectable()
export class AdminService {

  constructor(
    private apiService: ApiService,
    private playerService: PlayerService
  ) { }

  createEvent(eName: string, ePoints: number, stunDur: Date, eDesc: string)
  {
    let cmd = 'player/postNewEvent?name=' + encodeURIComponent(eName) + '&points='
    + ePoints + '&stunDur=' + stunDur;
    return this.apiService.Post(cmd, JSON.stringify(eDesc)).share();
  }

  deleteEvent(eventId: number)
  {
    let cmd = 'player/deleteEvent?eventId='+eventId;
    let obser: any = this.apiService.Post(cmd, null).share();
    obser.subscribe(
      null,
      err => {
        console.log('getAllEvents err: ' + err);
      }
    )
    return obser;
  }

  removePlayerFromEvent(playerId: number, eventId: number)
  {
    let cmd='player/removePlayerFromEvent?playerId='+playerId+'&eventId='+eventId;
    let obser: any = this.apiService.Post(cmd, null).share();
    obser.subscribe(
      null,
      err => {
        console.log('getAllEvents err: ' + err);
      }
    )
    return obser;
  }

  deletePlayer(playerId: number)
  {
    let cmd = 'player/deletePlayer?playerId='+playerId;
    let obser: any = this.apiService.Post(cmd, null).share();
    obser.subscribe(
      null,
      err => {
        console.log('getAllEvents err: ' + err);
      }
    )
    return obser;
  }

  infectPlayer(playerId: number)
  {
    let cmd = 'player/infectPlayer?playerId=' + playerId;
    // console.log('validate cmd: ' + cmd);
    return this.apiService.Post(cmd, null).share();
  }

  curePlayer(playerId: number)
  {
    let cmd = 'player/curePlayer?playerId=' + playerId;
    // console.log('validate cmd: ' + cmd);
    return this.apiService.Post(cmd, null).share();
  }

  cureAll()
  {
    let cmd = 'player/cureAll';
    // console.log('validate cmd: ' + cmd);
    return this.apiService.Post(cmd, null).share();
  }

  getAllEvents()
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

  getAllZombies()
  {
    let cmd = 'player/getAllZomb';
    let obser: any = this.apiService.Get(cmd).share();
    obser.subscribe(
      null,
      err => {
        console.log('getAllZomb err: ' + err);
      }
    )
    return obser;
  }

  getAllValidations()
  {
    let cmd = 'player/getAllVer';
    let obser: any = this.apiService.Get(cmd).share();
    obser.subscribe(
      null,
      err => {
        console.log('getAllVerifications err: ' + err);
      }
    )
    return obser;
  }

  verifyPlayer(playerId: number)
  {
    let cmd = 'player/Validate?playerId=' + playerId;
    // console.log('validate cmd: ' + cmd);
    return this.apiService.Post(cmd, null).share();
  }

  inverifyPlayer(playerId: number)
  {
    let cmd = 'player/Invalidate?playerId=' + playerId;
    // console.log('validate cmd: ' + cmd);
    return this.apiService.Post(cmd, null).share();
  }

  checkAdmin(playerId: number)
  {
    console.log('admin? ID: ' + playerId);
    let cmd = 'player/checkAdmin?playerId=' + playerId;
    return this.apiService.Get(cmd).share();
  }

}
