import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public game: Game | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public setGame($event:Game){
    this.game = $event;
  }

}
