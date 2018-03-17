import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PlayerService } from '../services/player.service';

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
  players = null;

  constructor(
    private authService: AuthenticationService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    let cur_usr = JSON.parse(localStorage.getItem("player"));
    this.playername = cur_usr.PlayerName;
    this.score = cur_usr.Score;
    this.email = cur_usr.Email;
    this.playerId = cur_usr.PlayerId;
    // console.log("log 1")
    this.playerService.getAllPlayers();
    // console.log(localStorage.getItem('players'));
    this.players = JSON.parse(localStorage.getItem("players"))
    console.log(cur_usr.Email)
    // Note: Enable generated session token logged-in checking
    console.log("Logged in? -- " + this.authService.checkLogin());
  }

  evaluate(entry: number)
  {
    this.playerService.postPlayerScore(this.playerId, entry);
  }

}
