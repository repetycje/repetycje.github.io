export class GameFinishedError extends Error {
  constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, GameFinishedError.prototype);
    }
}

export class Game {
    private readonly _alphabet: string;
    private readonly _maxWordLen: number;
    private readonly _maxRounds: number;
    private _word: string = "";
    private _round: number = 0;

    constructor(alphabet: string, maxWordLen: number, maxRounds: number) {
        this._alphabet = alphabet;
        this._maxWordLen = maxWordLen;
        this._maxRounds = maxRounds;
    }

    public append(char: string): string {
      if (this.isGameFinished()) {
        throw new GameFinishedError("Game already finished!")
      }
      this._word += char;
      this._round++;
      this._checkRepetition()
      return this._word;
    }

    public isPlayer1Winner(): boolean {
      return this._word.length >= this._maxWordLen
    }

    public isPlayer2Winner(): boolean {
      return !this.isPlayer1Winner() && this._round >= this._maxRounds * 2
    }

    public isGameFinished(): boolean {
      return this.isPlayer1Winner() || this.isPlayer2Winner()
    }

    private _checkRepetition() {
      const repetitionLength = this._getRepetitionLength()
      if (repetitionLength > 0) {
        const wordLen = this._word.length
        this._word = this._word.substr(0, wordLen - repetitionLength)
      }
    }

    private _getRepetitionLength(): number {
      const wordLen = this._word.length
      const maxLen = Math.floor(wordLen / 2);

      for (let len = maxLen; len > 0; len--) {
        const subWord1 = this._word.substr(wordLen - len, len)
        const subWord2 = this._word.substr(wordLen - 2 * len, len)
        if (subWord1 === subWord2) {
          return len;
        }
      }

      return 0;
    }
}
