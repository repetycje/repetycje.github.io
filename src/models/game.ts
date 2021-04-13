export class Game {
    private readonly _alphabet: string;
    private readonly _maxWordLen: number;
    private readonly _maxRounds: number;
    private _word: string;

    constructor(alphabet: string, maxWordLen: number, maxRounds: number) {
        this._alphabet = alphabet;
        this._maxWordLen = maxWordLen;
        this._maxRounds = maxRounds;
        this._word = "";
    }

    public append(char: string): string {
      this._word += char;

      return this._word;
    }

    private _getRepetitionLength(): number {
      const maxLen = Math.floor(this._word.length / 2)
      return 0;
    }

    public makeMove(char:string): string {
        this._word+=char;
        const choice = this._alphabet[0];

        return choice;

    }
}
