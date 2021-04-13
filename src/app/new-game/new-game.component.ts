import { Component, EventEmitter, Output } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {

  public alphabet: string = "asd";
  public maxWordLen: number = 10;
  public maxRounds: number = 10;

  @Output() newGame = new EventEmitter<Game>();


  onSubmit() {
    this.newGame.next(new Game(this.alphabet, this.maxWordLen, this.maxRounds));
  }

}
