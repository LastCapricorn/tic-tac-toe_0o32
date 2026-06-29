"use strict";
import  { initSchemeControl } from "./schemecontrol.js";

// const ticTacToe0o32 = ( () => {

  function GameBoard() {
    let board;
    const getBoard = () => board;
    const newBoard = () => board = [ "", "", "", "", "", "", "", "", "" ];
    const setToken = (position, token) => board[position] = token;

    return { getBoard, newBoard, setToken };
  }

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
    let players = [player1, player2]
    let isWinner = false;
    const currentPlayer = () => players[0];
    const swapPlayers = () => [ players[0], players[1] ] = [ players[1], players[0] ];

    function move(field) {
      if (board.getBoard()[field] !== "") return;
      board.setToken( field, currentPlayer().getToken() );
      boardFields[field].textContent = board.getBoard()[field];
      console.log(checkForWinner());
      console.log(isWinner);
      swapPlayers();
    }

    function checkForWinner() {
      const winningLines = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
      const winnerLine = winningLines.filter( line => line.every( number => board.getBoard()[number] === currentPlayer().getToken()));
      if (winnerLine.length) isWinner = true;
      return winnerLine;
    }

    document.querySelector(".game-board").addEventListener("click", ev => {
      if (!ev.target.value) return;
      move(ev.target.value);
    })
  }

  function initGame() {
    const [ Player1, Player2 ] = [ Player("Oli", "X"), Player("Computer", "O") ];
    const gameBoard = GameBoard();
    gameBoard.newBoard();
    playGame(Player1, Player2, gameBoard);
  }

  // --------------------------------------------------------------------------------
  initSchemeControl();
  // --------------------------------------------------------------------------------
  initGame();

// })();
