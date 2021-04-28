import {Component, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Game} from 'src/app/models/game';
import {GameService} from "../../services/game.service";

@Component({
    selector: 'app-new-game',
    templateUrl: './new-game.component.html',
    styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {

    public alphabetRaw: string = "abcdefghijklmnprqstuvwxyz";
    public alphabet: string = this.alphabetRaw;
    public maxWordLen: number = 10;
    public maxRounds: number = 10;
    public readonly maxSymbolsPerRow: number = 8;

    constructor(
        private gameService: GameService,
        private router: Router
    ) { }

    onSubmit() {
        const game = new Game(this.alphabet, this.maxWordLen, this.maxRounds);
        this.gameService.updateGame(game);
        this.router.navigate(['/game']);
    }

    updateAlphabet() {
        const alphabetList = this.alphabetRaw.split('');
        const alphabetSet = [...new Set(alphabetList)]
        this.alphabet = alphabetSet.join('');
    }

}
