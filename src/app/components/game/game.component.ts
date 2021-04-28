import {Component, OnInit} from '@angular/core';
import {Bot} from 'src/app/models/bot';
import {Game} from 'src/app/models/game';
import {Router} from "@angular/router";
import {GameService} from "../../services/game.service";
import {HistoryItem} from "../../models/history-item";


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    public game: Game;
    public bot: Bot;
    public word: string = "";
    public history: HistoryItem[] = [];
    public canMove: boolean = true;

    private worker: Worker = new Worker('../../workers/bot.worker', {type: 'module'});

    constructor(
        private router: Router,
        private gameService: GameService
    ) { }

    ngOnInit(): void {
        this.setGame();
        this.worker.onmessage = ({data}) => {
            this.canMove = true;
            const symbol = data.symbol;
            this.bot = data.bot;
            const wordBefore = this.word;
            this.word = this.game.append(symbol);
            this.history.push(new HistoryItem(wordBefore, this.word, symbol, "Bot"));
        };
    }

    public setGame() {
        const game = this.gameService.game;
        if (!game) {
            this.router.navigate(['']);
        } else {
            this.game = game;
            this.bot = new Bot(this.game.alphabet, this.game.maxRounds, this.game.maxWordLen);
        }
    }

    public resetGame() {
        this.game = undefined;
        this.bot = undefined;
        this.word = "";
    }

    public userMadeMove(symbol: string) {
        const wordBefore = this.word;
        this.word = this.game.append(symbol);
        this.history.push(new HistoryItem(wordBefore, this.word, symbol, "Player"));
        if (!this.game.isFinished()) {
            this.canMove = false;
            this.worker.postMessage({bot: this.bot, symbol: symbol});
        }
        // setTimeout(() => $event.path[0].value = this.word, 20);

        if (this.game.isFinished()) {
            if (this.game.isPlayer1Winner()) {
                alert('Player 1 won');
            } else {
                alert('Player 2 won');
            }
        }

    }

}
