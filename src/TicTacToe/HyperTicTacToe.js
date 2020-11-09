import React , {useState, useEffect} from 'react';

function Square(props) {
    return (
        <button 
            onClick={props.onClick}
        > 
            {props.value}
        </button>
    );
};

function Board(props) {
    const renderSquare = (i) => {
        return <Square 
            value={props.squares[i]} 
            //위대한 개발자 김은현의 해결 방안
            onClick={()=>props.onClick(i)}
        />;
    }

    return (
        <div>
            <div>{status}</div>
            <div>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            </div>
            <div>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            </div>
            <div>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
            </div>
      </div>
    );
};

function Game() {
    const [state, setState] = useState({
        history: [{
            squares: Array(9).fill('-'),
        }],
        stepNumber: 0,
        xIsNext: true
    });

    const handleClick = (i) => {
        const newHistory = state.history.slice(0, state.stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const newSquares = current.squares.slice();
        if(calculateWinner(newSquares) != '-' || newSquares[i]!= '-') {
            return ;
        }
        newSquares[i] = state.xIsNext ? 'X' : 'O';
        setState({
            history: [
                ...newHistory,
                {
                    squares: newSquares,
                }
            ],
            stepNumber: newHistory.length,
            xIsNext: !state.xIsNext,
        });
    }

    const jumpTo = (step) => {
        setState({
            ...state,
            stepNumber: step,
            xIsNext: (step % 2) ===0,
        })
    }

    const tempHistory = state.history.slice(0, state.stepNumber + 1);
    const current = tempHistory[state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status = (winner != '-') ? ('Winner: ' + winner) : ('Next player: ' + (state.xIsNext ? 'X' : 'O'));

    const moves = tempHistory.map((step, move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    return (
        <div>
            <div>
                <Board 
                squares={current.squares}
                onClick={(i) => handleClick(i)}/>
            </div>
            <div>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
      </div>
    );
};

function HyperTicTacToe() {
    return (
        <Game/>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a]) {
        return squares[a];
      }
    }
    return '-';
  }

export default HyperTicTacToe;