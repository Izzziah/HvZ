import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  playername: string;
  playerId: number;
  score: number = -1;
  email: string;
  player = null;
  players = null;

  errMsg: string = null;

  constructor(
    private playerService: PlayerService,
    private apiService: ApiService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.player = JSON.parse(sessionStorage.getItem("player"));
    this.refreshUser(this.player);
    this.refresh();
    // this.players = JSON.parse(sessionStorage.getItem("players"))
  }

  refresh()
  {
    this.refreshUser(this.player);
    // console.log('info 1: ' + this.player.Score);
    // if ()
    this.playerService.getAllPlayers().subscribe(data => {
      this.players = data;
    },
    err => {
      console.log(err);
    });
  }

  refreshUser(cur_usr: any)
  {
    this.playername = cur_usr.PlayerName;
    this.score = cur_usr.Score;
    this.email = cur_usr.Email;
    this.playerId = cur_usr.PlayerId;
  }

  validateToken()
  {
    if (sessionStorage.getItem("player") != (undefined || null))
    {
      return true;
    }
    return false; // need to update
  }

  evaluate(entry: string)
  {
    console.log('starting evaluation...');
    // console.log('this.authService.validateToken(): ' + 
    //   this.authService.validateToken());
    this.authService.validateToken().subscribe(data =>
    {
      console.log('token valid...');
      let obser = this.playerService.checkCode(entry);
      if (obser != null)
      {
          obser.subscribe(
          res => {
              if (res != null)
              {
                this.playerService.deleteCode(res["CodeId"]);
                this.playerService.postPlayerScore(this.playerId, this.score + res["Score"]);
                this.errMsg = null;
              }
              else
              {
                  console.log('null returned...');
              }
          },
          err => {
              console.log('error in user-home.evaluate: ' + err);
              this.errMsg = "Incorrect code entered.";
          });
      }
      else
      {
          console.log('Null code response');
      }
      while (this.playerService.isBusy());
      this.refresh();
    },
    err => {
      this.errMsg = "Please log in.";
    });
  }

}
