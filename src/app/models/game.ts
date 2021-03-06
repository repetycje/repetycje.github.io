export class GameFinishedError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, GameFinishedError.prototype);
  }
}

export class Game {
  public readonly alphabet: string;
  public readonly maxWordLen: number;
  public readonly maxRounds: number;
  private _word: string;
  private _round: number;

  public get round() {
    return this._round;
  }

  public get word() {
    return this._word;
  }

  constructor(alphabet: string, maxWordLen: number, maxRounds: number, round: number = 0, word: string = "") {
    this.alphabet = alphabet;
    this.maxWordLen = maxWordLen;
    this.maxRounds = maxRounds;
    this._round = round
    this._word = word
  }

  public copy(): Game {
    return new Game(this.alphabet, this.maxWordLen, this.maxRounds, this.round, this.word);
  }

  public reset() {
    this._word = "";
    this._round = 0;
  }

  public append(char: string): string {
    if (this.isFinished()) {
      throw new GameFinishedError("Game already finished!")
    }
    this._word += char;
    this._round++;
    this._checkRepetition()
    return this._word;
  }

  public isPlayer1Winner(): boolean {
    return this._word.length >= this.maxWordLen
  }

  public isPlayer2Winner(): boolean {
    return !this.isPlayer1Winner() && this._round >= this.maxRounds
  }

  public isFinished(): boolean {
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
