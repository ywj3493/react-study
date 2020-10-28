import React , {useState, useEffect} from 'react';

function Square(props) {
    
    return (
        <button 
            onClick={props.onClick}
        > 
            {props.value}
        </button>
    );
}

function Board() {
    const [setting, setSetting] = useState({
            squares: Array(9).fill('-'),
            xIsNext: true,
        }
    );
    
    const handleClick = (i) => {
        const newSquares = setting.squares.slice();
        if(calculateWinner(newSquares) != '-' || newSquares[i]!= '-') {
            return ;
        }
        newSquares[i] = setting.xIsNext ? 'X' : 'O';
        setSetting({
            squares : newSquares,
            xIsNext: !setting.xIsNext
        });
    }

    const renderSquare = (i) => {
        return <Square 
            value={setting.squares[i]} 
            //위대한 개발자 김은현의 해결 방안
            onClick={()=>handleClick(i)}
        />;
    }

    const winner = calculateWinner(setting.squares);
    let status = (winner != '-') ? ('Winner: ' + winner) : ('Next player: ' + (setting.xIsNext ? 'X' : 'O'));

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
}

function Game() {
    return (
        <div>
            <div>
                <Board />
            </div>
            <div>
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
      </div>
    );
}

function TicTacToe() {
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

export default TicTacToe;