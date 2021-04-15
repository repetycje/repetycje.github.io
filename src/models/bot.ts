import { Game } from "./game";

export class Bot {
    private game: Game;
    private node: Node

    constructor(alphabet: string, maxRounds: number, maxWordLen: number) {
        this.game = new Game(alphabet, maxWordLen, maxRounds,);
    }

    public makeMove(char: string): string {
        this.node = this.getNode(char);
        const start = new Date().getTime();
        while (new Date().getTime() - start < 800) {
            let node: Node = this.node;
            let game: Game = new Game(this.game.alphabet, this.game.maxWordLen, this.game.maxRounds, this.game.round, this.game.word);

            //selection # keep going down the tree based on best UCB values until terminal or unexpanded node
            while (node.untriedMoves.length === 0 && node.childNodes.length > 0) {
                node = node.selection();
                game.append(node.move)
            }
            //expand
            if (!game.isFinished() && node.untriedMoves.length > 0) {
                const move = this.selectRandom(node.untriedMoves);
                this.removeMove(node, move);
                game.append(move);
                const currNode = node;
                node = new Node(move, currNode, game.alphabet, !currNode.myMove);
                currNode.childNodes.push(node);
            }
            //rollout
            while (!game.isFinished()) {
                const move = this.selectRandom(game.alphabet);
                game.append(move);
            }
            //backpropagate
            const iWon = game.isPlayer2Winner();
            while (node !== null) {
                node.update(iWon);
                node = node.parent;
            }

        }
        let bestNode = this.node.childNodes.reduce((prev, current) => (prev.ucb() > current.ucb()) ? prev : current);
        this.node = bestNode;
        bestNode.parent = null;
        this.game.append(bestNode.move)
        return bestNode.move;

        const choice = this.game.alphabet[0];
        
        return choice;
    }


    
    selectRandom(untriedMoves: string): string {
        return untriedMoves[Math.floor(Math.random() * untriedMoves.length)]
    }
    removeMove(node: Node, move: string) {
        node.untriedMoves = node.untriedMoves.replace(move, '');
    }

    private getNode(lastMove): Node {
        this.game.append(lastMove);
        if (!this.node) {
            return new Node(lastMove, null, this.game.alphabet, false);
        }
        else {
            for (const child of this.node.childNodes) {
                if (child.move === lastMove) {
                    child.parent = null;
                    return child;
                }
            }
            return new Node(lastMove, null, this.game.alphabet, false)
        }
    }
}

class Node {
    parent: Node;
    untriedMoves: string;
    childNodes: Node[];
    won: number;
    lost: number;
    visits: number;
    move: string;
    myMove: boolean;

    constructor(move: string, parent: Node, untriedMoves: string, myMove: boolean) {
        this.parent = parent;
        this.untriedMoves = untriedMoves;
        this.childNodes = [];
        this.won = 0;
        this.lost = 0;
        this.visits = 0;
        this.move = move;
        this.myMove = myMove;
    }

    ucb() {
        if (this.myMove) {
            return this.won / this.visits + Math.sqrt(2 * Math.log(this.parent.visits) / this.visits);
        }
        else {
            return this.lost / this.visits + Math.sqrt(2 * Math.log(this.parent.visits) / this.visits);
        }
    }

    selection() {
        return this.childNodes.reduce((prev, current) => (prev.ucb() > current.ucb()) ? prev : current);
    }

    update(iWon: boolean) {
        if (iWon) {
            this.won++;
        }
        else {
            this.lost++;
        }
        this.visits += 1;
    }
}