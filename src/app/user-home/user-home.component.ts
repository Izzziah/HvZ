import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';

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
  model: any = {};

  errMsg: string = null;

  constructor(
    private playerService: PlayerService,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.player = JSON.parse(sessionStorage.getItem("player"));
    this.refresh();
    this.refreshUser(this.player);
    if (this.player)
    {
      this.sharedService.change();
    }
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
    this.playerService.getPlayerById(this.playerId).subscribe(data => {
      this.player = data;
      sessionStorage.setItem('player', JSON.stringify(data));
    },
    err => {
      console.log(err);
    });
    this.playername = this.player.PlayerName;
    this.score = this.player.Score;
    this.email = this.player.Email;
    this.playerId = this.player.PlayerId;
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
    // console.log('starting evaluation...');
    // console.log('this.authService.validateToken(): ' + 
    //   this.authService.validateToken());
    let ob = this.authService.validateToken();
    if (ob != null)
    {
      ob.subscribe(data =>
      {
        // console.log('token valid...');
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
    else
    {
      this.errMsg = "Please log in.";
    }
  }

}
