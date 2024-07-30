import { useState } from "react";
import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATION } from "./components/winning-combination";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let curPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    curPlayer = "O";
  }
  return curPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "PLayer 2",
  });
  const [gameTurns, setGameturns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATION) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));

    setGameturns((prevTurns) => {
      const curPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: curPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameturns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            inititalName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            inititalName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <Gameboard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
