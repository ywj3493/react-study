import React, {useState} from 'react';

function Counter(props) {
    //초기값 설정은 useState 에서
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(prevNumber => prevNumber+1);
    }

    const onDecrease = () => {
        setNumber(prevNumber => prevNumber-1);
    }

    const onSquare = () => {
        setNumber(props.square);
    }
    
    return (
        <div>
            <h0>{number}</h0>
            <button onClick = {onDecrease}>-1</button>
            <button onClick = {onIncrease}>+1</button>
            {props.square && <button onClick = {onSquare}>^2</button>}
        </div>
    );
}

export default Counter;