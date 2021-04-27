import { Component, EventEmitter, Output } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {

  public alphabetRaw: string = "asd";
  public alphabet: string = this.alphabetRaw;
  public maxWordLen: number = 10;
  public maxRounds: number = 10;

  @Output() newGame = new EventEmitter<Game>();


  onSubmit() {
    this.newGame.next(new Game(this.alphabet, this.maxWordLen, this.maxRounds));
  }

  updateAlphabet() {
    const alphabetList = this.alphabetRaw.split('');
    const alphabetSet = [...new Set(alphabetList)]
    this.alphabet = alphabetSet.join('');
  }

}
