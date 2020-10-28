import React, {useReducer} from 'react';

function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT' :
            return state + 1;
        case 'DECREMENT' :
            return state - 1;
        case 'LOGIC' :
            return action.logic(state);
        default:
            return state;
    }
}

function Counter(props) {
    //useState 예시는 주석처리로 
    //초기값 설정은 useState 에서
    // const [number, setNumber] = useState(0);

    // const onIncrease = () => {
    //     setNumber(prevNumber => prevNumber+1);
    // }

    // const onDecrease = () => {
    //     setNumber(prevNumber => prevNumber-1);
    // }    

    const [number, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({type : 'INCREMENT'});
    };

    const onDecrease = () => {
        dispatch({type : 'DECREMENT'});
    };

    const onLogic = () => {
        dispatch({type : 'LOGIC', logic : props.logic});
    };
    
    return (
        <div>
            <h0>{number}</h0>
            <button onClick = {onDecrease}>-1</button>
            <button onClick = {onIncrease}>+1</button>
            {props.logic && <button onClick = {onLogic}>사용자 정의 버튼</button>}
        </div>
    );
}

export default Counter;