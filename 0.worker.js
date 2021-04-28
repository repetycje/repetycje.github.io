/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "hUQG");
/******/ })
/************************************************************************/
/******/ ({

/***/ "ORlT":
/*!********************************!*\
  !*** ./src/app/models/game.ts ***!
  \********************************/
/*! exports provided: GameFinishedError, Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameFinishedError", function() { return GameFinishedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
class GameFinishedError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, GameFinishedError.prototype);
    }
}
class Game {
    constructor(alphabet, maxWordLen, maxRounds, round = 0, word = "") {
        this.alphabet = alphabet;
        this.maxWordLen = maxWordLen;
        this.maxRounds = maxRounds;
        this._round = round;
        this._word = word;
    }
    get round() {
        return this._round;
    }
    get word() {
        return this._word;
    }
    copy() {
        return new Game(this.alphabet, this.maxWordLen, this.maxRounds, this.round, this.word);
    }
    reset() {
        this._word = "";
        this._round = 0;
    }
    append(char) {
        if (this.isFinished()) {
            throw new GameFinishedError("Game already finished!");
        }
        this._word += char;
        this._round++;
        this._checkRepetition();
        return this._word;
    }
    isPlayer1Winner() {
        return this._word.length >= this.maxWordLen;
    }
    isPlayer2Winner() {
        return !this.isPlayer1Winner() && this._round >= this.maxRounds;
    }
    isFinished() {
        return this.isPlayer1Winner() || this.isPlayer2Winner();
    }
    _checkRepetition() {
        const repetitionLength = this._getRepetitionLength();
        if (repetitionLength > 0) {
            const wordLen = this._word.length;
            this._word = this._word.substr(0, wordLen - repetitionLength);
        }
    }
    _getRepetitionLength() {
        const wordLen = this._word.length;
        const maxLen = Math.floor(wordLen / 2);
        for (let len = maxLen; len > 0; len--) {
            const subWord1 = this._word.substr(wordLen - len, len);
            const subWord2 = this._word.substr(wordLen - 2 * len, len);
            if (subWord1 === subWord2) {
                return len;
            }
        }
        return 0;
    }
}


/***/ }),

/***/ "fni4":
/*!*******************************!*\
  !*** ./src/app/models/bot.ts ***!
  \*******************************/
/*! exports provided: Bot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bot", function() { return Bot; });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "ORlT");

class Bot {
    constructor(alphabet, maxRounds, maxWordLen, round = 0, word = "") {
        this.game = new _game__WEBPACK_IMPORTED_MODULE_0__["Game"](alphabet, maxWordLen, maxRounds, round, word);
    }
    init(node) {
        this.node = node;
    }
    makeMove(char) {
        this.node = this.getNode(char);
        const start = new Date().getTime();
        while (new Date().getTime() - start < 800) {
            let node = this.node;
            let game = this.game.copy();
            //selection # keep going down the tree based on best UCB values until terminal or unexpanded node
            while (node.childNodes.length === node.possibleMoves.length) {
                node = this.selection(node);
                game.append(node.move);
            }
            //expand
            if (!game.isFinished() && node.childNodes.length < node.possibleMoves.length) {
                const move = node.possibleMoves[node.childNodes.length];
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
        this.game.append(bestNode.move);
        return bestNode.move;
    }
    selectRandom(moves) {
        return moves[Math.floor(Math.random() * moves.length)];
    }
    getNode(lastMove) {
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
            return new Node(lastMove, null, this.game.alphabet, false);
        }
    }
    ucb(node) {
        if (node.myMove) {
            return node.won / node.visits + Math.sqrt(2 * Math.log(node.parent.visits) / node.visits);
        }
        else {
            return node.lost / node.visits + Math.sqrt(2 * Math.log(node.parent.visits) / node.visits);
        }
    }
    selection(node) {
        return node.childNodes.reduce((prev, current) => (this.ucb(prev) > this.ucb(current)) ? prev : current);
    }
    update(node, iWon) {
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
    constructor(move, parent, possibleMoves, myMove) {
        this.parent = parent;
        this.possibleMoves = possibleMoves.split('').sort(function () { return 0.5 - Math.random(); }).join('');
        this.childNodes = [];
        this.won = 0;
        this.lost = 0;
        this.visits = 0;
        this.move = move;
        this.myMove = myMove;
    }
}


/***/ }),

/***/ "hUQG":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js??ref--7-0!./node_modules/@ngtools/webpack/src/ivy!./src/app/workers/bot.worker.ts ***!
  \******************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_bot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/bot */ "fni4");
/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
    const game = data.bot.game;
    const node = data.bot.node;
    const bot = new _models_bot__WEBPACK_IMPORTED_MODULE_0__["Bot"](game.alphabet, game.maxRounds, game.maxWordLen, game._round, game._word);
    bot.init(node);
    const symbol = data.symbol;
    const botSymbol = bot.makeMove(symbol);
    postMessage({ symbol: botSymbol, bot: bot });
});


/***/ })

/******/ });
//# sourceMappingURL=0.worker.js.map