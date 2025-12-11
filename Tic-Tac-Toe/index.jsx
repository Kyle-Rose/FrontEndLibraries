const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(s => s !== null);

  function handleClick(i) {
    if (squares[i] !== null || winner) return;

    setSquares(prev => {
      const next = [...prev];
      next[i] = xIsNext ? "X" : "O";
      return next;
    });

    setXIsNext(prev => !prev);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div>
      <div className="board">
        {squares.map((value, i) => (
          <button
            key={i}
            className="square"
            onClick={() => handleClick(i)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="status">
        {winner && <p>Winner: {winner}</p>}
        {!winner && isDraw && <p>It's a draw!</p>}
        {!winner && !isDraw && <p>Next player: {xIsNext ? "X" : "O"}</p>}
      </div>

      <button id="reset" onClick={reset}>Reset</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
