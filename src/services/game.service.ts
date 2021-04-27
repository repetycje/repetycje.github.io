import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game = null;

  public get game() {
    return this._game;
  }

  constructor(private router: Router) { }

  updateGame(game: Game) {
    this._game = game;
    this.router.navigate(['/game']);
  }
}
