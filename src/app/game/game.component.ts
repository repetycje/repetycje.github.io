import { Component, OnInit } from '@angular/core';
import { Bot } from 'src/models/bot';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public game: Game;
  public bot: Bot;
  public word: string = "";
  public wordsHistory: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public setGame($event: Game) {
    this.game = $event;
    this.bot = new Bot(this.game.alphabet, this.game.maxRounds, this.game.maxWordLen);
  }

  public resetGame() {
    this.game = undefined;
    this.bot = undefined;
    this.word = "";
  }


  public userMadeMove($event: any) {
    if (![...this.game.alphabet].some(l => l === $event.key)) {
      setTimeout(() => $event.path[0].value = this.word, 20);
      return;
    }
    this.word = this.game.append($event.key);
    this.wordsHistory.push(this.word);
    if (!this.game.isGameFinished()) {
      const letter = this.bot.makeMove($event.key);
      let afterBotMove = this.word + letter;
      this.wordsHistory.push(afterBotMove);

      this.word = this.game.append(letter);
      if (this.word.length < afterBotMove.length){
        this.wordsHistory.push(this.word);
      }
    }
    setTimeout(() => $event.path[0].value = this.word, 20);

    if (this.game.isGameFinished()) {
      if (this.game.isPlayer1Winner()) {
        alert('Player 1 won');
      }
      else {
        alert('Player 2 won');
      }
    }

  }

}
