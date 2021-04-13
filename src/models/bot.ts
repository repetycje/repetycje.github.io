export class Bot {
    private _alphabet: string;
    private _word: string;
    private _maxRounds: number;
    private _maxWordLen: number;

    constructor(alphabet: string, maxRounds: number, maxWordLen:number) {
        this._alphabet = alphabet;
        this._maxRounds = maxRounds;
        this._maxWordLen = maxWordLen;
        this._word = "";
    }

    public makeMove(char: string): string {
        this._word += char;
        const choice = this._alphabet[0];
        this._word += choice;
        return choice;
    }
}