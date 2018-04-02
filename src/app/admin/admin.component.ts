import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.service';
import { AdminService } from '../services/admin.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  playername: string;
  playerId: number;
  score: number = -1;
  email: string;

  player = null;
  joinedEvents = null;
  players = null;
  zombies = null;
  events = null;
  model: any = {}

  errMsg: string = null;

  constructor(
    private playerService: PlayerService,
    private adminService: AdminService,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.player = JSON.parse(sessionStorage.getItem("player"));
    if (this.player==null) {
      this.router.navigate['/login'];
    }
    this.refresh();
    if (this.player)
    {
      this.sharedService.change();
    }
    // this.players = JSON.parse(sessionStorage.getItem("players"))
  }

  createNewEvent(eventName: string, eventDesc: string)
  {
    console.log("create event!!!!");
  }

  deleteEvent(eventId: number)
  {
    this.adminService.deleteEvent(eventId).subscribe();
    this.refresh();
  }

  deletePlayer(playerId: number)
  {
    this.adminService.deletePlayer(playerId).subscribe();
    this.refresh();
  }

  removePlayerFromEvent(playerId: number, eventId: number)
  {
    this.adminService.removePlayerFromEvent(playerId, eventId).subscribe();
    this.refresh();
  }

  verify(playerId: number)
  {
    this.adminService.verifyPlayer(playerId).subscribe(null,
    err => {console.log('err')});
    this.refresh();
  }

  inverify(playerId: number)
  {
    this.adminService.inverifyPlayer(playerId).subscribe(
      res => {console.log('res: ' + JSON.stringify(res))}, 
      err => {console.log('err: ' + err)});
    this.refresh();
  }

  infect(playerId: number)
  {
    this.adminService.infectPlayer(playerId).subscribe(null,
    err => {console.log('err')});
    this.refresh();
  }

  cure(playerId: number)
  {
    this.adminService.curePlayer(playerId).subscribe(
      function() {
        console.log('MADE IT');
        this.refresh();
      },
      function() {
        console.log('MADE IT');
        this.refresh();
      },
    function() {
      console.log('MADE IT');
      this.refresh();
    });
  }

  cureAll()
  {
    this.adminService.cureAll().subscribe(
      res => {this.zombies = null;console.log('res: ' + JSON.stringify(res))}, 
      err => {this.zombies = null;console.log('err: ' + err)},
      function() {
        this.refresh();
    });
  }

  createEvent(eName: string, ePoints: number, stunDur: Date, eDesc: string)
  {
    this.adminService.createEvent(eName, ePoints, stunDur, eDesc).subscribe(data=>{
      this.refresh();
    });
  }

  loadPlayerEvents(playerId: number)
  {
    this.playerId = playerId;
    this.playerService.getPlayerEvents(playerId).subscribe(
      events => {this.joinedEvents = events; //console.log('joinedEvents: '+JSON.stringify(events))
    },
      err => {this.joinedEvents = null;console.log('No events')}
    );
  }

  refresh()
  {
    this.refreshValues();
    // console.log('info 1: ' + this.player.Score);
    this.adminService.getAllValidations().subscribe(data => {
      // console.log('players: ' + JSON.stringify(data));
      this.players = data; // get players list
      // console.log('playerName: ' + data[0]["playerName"]);
    },
    err => {
      console.log(err);
    });

    this.adminService.getAllZombies().subscribe(data => {
      // console.log('zombies: ' + JSON.stringify(data));
      this.zombies = data; // get zombies list
    },
    err => {
      console.log(err);
    });

    this.adminService.getAllEvents().subscribe(data => {
      // console.log('events: ' + JSON.stringify(data[0]));
      this.events = data; // get zombies list
    },
    err => {
      console.log(err);
    });
  }

  refreshValues()
  {
    this.playerService.getPlayerById(this.player.PlayerId).subscribe(data => {
      this.player = data; 
      // console.log('data-: ' + JSON.stringify(data));
      sessionStorage.setItem('player', JSON.stringify(data));
      this.playername = this.player.PlayerName;
      this.score = this.player.Score;
      this.email = this.player.Email;
      this.playerId = this.player.PlayerId;
    },
    err => {
      console.log(err);
    });
  }

  evaluate(entry: string)
  {
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
                if ((res != null) && (res["CodeId"] != this.player.CodeId))
                {
                  // this.playerService.deleteCode(res["CodeId"]);
                  this.playerService.setUsedCode(res["CodeId"], this.player.PlayerId);
                  this.playerService.postPlayerScore(this.playerId, res["CodeId"]);
                  this.errMsg = null;
                  this.refresh();
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
