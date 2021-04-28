import { Injectable } from '@angular/core';
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: Game = null;

  public get game() {
    return this._game;
  }

  updateGame(game: Game) {
    this._game = game;
  }
}
