export default function ({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's Draw</p>}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
