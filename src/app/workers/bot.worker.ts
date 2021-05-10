/// <reference lib="webworker" />

import {Bot} from "../models/bot";

addEventListener('message', ({ data }) => {
  const game = data.bot.game;
  const node = data.bot.node;
  const bot = new Bot(game.alphabet, game.maxRounds, game.maxWordLen, game._round, game._word);
  bot.init(node);
  const symbol = data.symbol;
  const botSymbol = bot.makeMove(symbol);
  postMessage({symbol: botSymbol, bot: bot});
});
