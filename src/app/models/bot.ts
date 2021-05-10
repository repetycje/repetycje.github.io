import { Game } from "./game";

export class Bot {
    private game: Game;
    private node: Node

    constructor(alphabet: string, maxRounds: number, maxWordLen: number, round: number = 0, word: string = "") {
        this.game = new Game(alphabet, maxWordLen, maxRounds, round, word);
    }

    public init(node: Node) {
        this.node = node;
    }

    public makeMove(char: string): string {
        this.node = this.getNode(char);
        const start = new Date().getTime();
        while (new Date().getTime() - start < 800) {
            let node: Node = this.node;
            let game: Game = this.game.copy();

            //selection # keep going down the tree based on best UCB values until terminal or unexpanded node
            while (node.childNodes.length === node.possibleMoves.length) {
                node = this.selection(node);
                game.append(node.move)
            }
            //expand
            if (!game.isFinished() && node.childNodes.length < node.possibleMoves.length) {
                const move = node.possibleMoves[node.childNodes.length]
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
                this.update(node, iWon);
                node = node.parent;
            }
        }
        let bestNode = this.selection(this.node);
        this.node = bestNode;
        bestNode.parent = null;
        this.game.append(bestNode.move)
        return bestNode.move;
    }
    
    selectRandom(moves: string): string {
        return moves[Math.floor(Math.random() * moves.length)]
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
    
    
    private ucb(node: Node) {
        if (node.myMove) {
            return node.won / node.visits + Math.sqrt(2 * Math.log(node.parent.visits) / node.visits);
        }
        else {
            return node.lost / node.visits + Math.sqrt(2 * Math.log(node.parent.visits) / node.visits);
        }
    }

    private selection(node: Node) {
        return node.childNodes.reduce((prev, current) => (this.ucb(prev) > this.ucb(current)) ? prev : current);
    }

    private update(node: Node, iWon: boolean) {
        if (iWon) {
            node.won++;
        }
        else {
            node.lost++;
        }
        node.visits += 1;
    }
}

class Node {
    parent: Node;
    possibleMoves: string;
    childNodes: Node[];
    won: number;
    lost: number;
    visits: number;
    move: string;
    myMove: boolean;

    constructor(move: string, parent: Node, possibleMoves: string, myMove: boolean) {
        this.parent = parent;
        this.possibleMoves = possibleMoves.split('').sort(function(){return 0.5-Math.random()}).join('');
        this.childNodes = [];
        this.won = 0;
        this.lost = 0;
        this.visits = 0;
        this.move = move;
        this.myMove = myMove;
    }
}