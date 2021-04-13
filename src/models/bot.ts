export class Bot {
    private _alphabet: string;
    private _word: string;

    constructor(alphabet: string) {
        this._alphabet = alphabet;
        this._word = "";
    }

    public makeMove(char: string): string {
        this._word += char;
        const choice = this._alphabet[0];
        this._word += choice;
        return choice;
    }
}