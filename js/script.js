"use strict";
import  { initSchemeControl } from "./schemecontrol.js";

const ticTacToe0o32 = ( () => {

  const Gameboard = ( () => {
    let board;
    const getBoard = () => board;
    const newBoard = () => board = [ "", "", "", "", "", "", "", "", "" ];
    const setToken = (position, token) => board[position] = token;

    return { getBoard, newBoard, setToken };
  })();

  function Player(name, token) {
    let [ score, wins, losses, draws ] = [ 0, 0, 0, 0 ];
    const getName = () => name;
    const getToken = () => token;
    const getScore = () => score;
    const setScore = () => ++score;
    const setWins = () => ++wins;
    const setLosses = () => ++losses;
    const setDraws = () => ++draws;
    const getStats = () => {
      return { wins, losses, draws };
    };
    const resetScore = () => score = 0;
    const resetStats = () => [ wins, losses, draws ] = [ 0, 0, 0 ];

    return { getName, getToken, getScore, setScore, setWins, setLosses, setDraws, getStats, resetScore, resetStats };
  }

  // --------------------------------------------------------------------------------

  function playGame(player1, player2, board) {
    const boardFields = document.querySelectorAll(".game-board button");
    let players = [player1, player2];
    let isMaximizer = false;
    let moveCount = 0;
    const currentPlayer = () => players[0];
    const swapPlayers = () => [ players[0], players[1] ] = [ players[1], players[0] ];
    const isGoofball = player2.getName() === "GoofyIntelligence";

    document.querySelector(".game-board").addEventListener("click", move);

    function playRound() {
      if (isGoofball && currentPlayer().getName() === "GoofyIntelligence") {
        boardFields[goofyMove()].click();
      } else {
        console.log(`${currentPlayer().getName()}, make your move.`)
      }
    }

    function endRound() {
      if (evaluateMove().isWinner) {
        console.log(`${currentPlayer().getName()} won this round!`);
        console.log(evaluateMove().line);
      } else {
        console.log("No one wins - no one loses");
      }
      document.querySelector(".game-board").removeEventListener("click", move);
    }

    function move(ev) {
      const field = ev.target.value;
      if ( !field || board.getBoard()[field] !== "" ) return;
      moveCount++;
      board.setToken( field, currentPlayer().getToken() );
      boardFields[field].textContent = board.getBoard()[field];
      if ( !evaluateMove().isWinner && moveCount < 9 ) {
        swapPlayers();
        playRound();
      } else {
        endRound();
      }
    }

    const evaluateMove = (() => {
      const winningLines = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
        return () => {
          for (const line of winningLines) {
            if (line.every( number => board.getBoard()[number] === "X")) return { line, minimaxValue: 2, isWinner: true };
            if (line.every( number => board.getBoard()[number] === "O")) return { line, minimaxValue: 0, isWinner: true };
          }
          if (board.getBoard().every( (field) => field !== '')) return { line: [], minimaxValue: 1, isWinner: false };
          return { line: [], minimaxValue: -1, isWinner: false };
        }
    })();

    function goofyMove() {
      const testToken = isMaximizer ? "X" : "O";
      let veryBestMove = isMaximizer ? -Infinity : Infinity;
      let position = 0;
      for (let i = 0; i < 9; i++) {
        if (board.getBoard()[i] === "") {
          board.setToken(i, testToken);
          const newBestMove = minimax();
          if ((isMaximizer && newBestMove > veryBestMove) || (!isMaximizer && newBestMove < veryBestMove)) {
            veryBestMove = newBestMove;
            position = i;
          }
          board.setToken(i, "");
        }
      }
      return position;
    }

    function minimax() {
      if (evaluateMove().minimaxValue !== -1) return evaluateMove().minimaxValue;
      isMaximizer = !isMaximizer;
      let bestMove = isMaximizer ? -Infinity : Infinity;
      for (let i = 0; i < 9; i++) {
        if (board.getBoard()[i] === "") {
          board.setToken(i, isMaximizer ? "X" : "O");
          const minimaxBest = minimax();
          bestMove = isMaximizer ? Math.max(minimaxBest, bestMove) : Math.min(minimaxBest, bestMove);
          board.setToken(i, "");
        }
      }
      isMaximizer = !isMaximizer;
      return bestMove;
    }
    playRound();

  }

  function initGame() {
    const [ player1, player2 ] = [ Player("LastCapricorn", "X"), Player("GoofyIntelligence", "O") ];
    Gameboard.newBoard();
    playGame(player1, player2, Gameboard);
  }

  // --------------------------------------------------------------------------------
  initSchemeControl();
  // --------------------------------------------------------------------------------
  initGame();

})();
