import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Response } from '@angular/http';
import { NavService } from '../services/nav.service';

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
    private navService: NavService) { }

  ngOnInit() {
  }

  register(playerName: string, password: string, email: string)
  {
    this.playerService.postNewPlayer(playerName, password, email);
    this.navService.navTo('/login');
  }

}
