export class HistoryItem {
  constructor(
      private _wordBefore: string,
      private _wordAfter: string,
      private _lastMove: string,
      private _playerName: string
  ) { }

  get wordBefore() {
      return this._wordBefore;
  }

  get wordAfter() {
      return this._wordAfter;
  }

  get lastMove() {
      return this._lastMove;
  }

  get playerName() {
      return this._playerName;
  }
}