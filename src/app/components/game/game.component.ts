import {Component, OnInit, ViewChild} from '@angular/core';
import {Bot} from 'src/app/models/bot';
import {Game} from 'src/app/models/game';
import {Router} from "@angular/router";
import {GameService} from "../../services/game.service";
import {HistoryItem} from "../../models/history-item";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


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

    @ViewChild('end') endModal;

    constructor(
        private router: Router,
        private gameService: GameService,
        private modalService: NgbModal
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
            this.checkGameStatus();
        };
    }

    public setGame() {
        const game = this.gameService.game;
        if (!game) {
            this.router.navigate(['']);
        } else {
            this.game = game;
            this.game.reset();
            this.bot = new Bot(this.game.alphabet, this.game.maxRounds, this.game.maxWordLen);
            this.word = "";
            this.history = [];
        }
    }


    public userMadeMove(symbol: string) {
        const wordBefore = this.word;
        this.word = this.game.append(symbol);
        this.history.push(new HistoryItem(wordBefore, this.word, symbol, "Player"));
        this.checkGameStatus()
        if (!this.game.isFinished()) {
            this.canMove = false;
            this.worker.postMessage({bot: this.bot, symbol: symbol});
        }
    }

    public resetGame() {
        this.setGame();
    }

    public newGame() {
        this.router.navigate(['/new-game'])
    }

    private checkGameStatus() {
        if (this.game.isFinished()) {
            this.modalService.open(this.endModal, { centered: true }).result.then(
                result => { result == 'restart' ? this.resetGame() : this.newGame() },
                _ => this.newGame()
            );
        }
    }

}
