import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  loading = false;
  errMsg: string;

  constructor(private playerService: PlayerService,
    private router: Router) { }

  ngOnInit() {
  }

  register(playerName: string, password: string, realname: string, email: string)
  {
    this.playerService.postNewPlayer(playerName, password, realname, email, 1); // killer gets 1 point
    this.router.navigate(['/login']);
  }

}
