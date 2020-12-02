import React from 'react';

const testReducer = (state, action) => {
    const {type, ...rest} = action;
    switch(type) {
        case 'SET_STATE' :
            return {...state, ...rest};
        default :
            return state;
    }
}

const Text = React.memo(({text}) => {
    return (
        <div>{text}</div>
    );
});

const ReducerTest = () => {
    const [state, dispatch] = React.useReducer(testReducer, {
        first: 1,
        second: 2,
        third: 3
    });
    const {first, second, third} = state;
    
    return (
        <>
        <Text text={first}></Text>
        <Text text={second}></Text>
        <Text text={third}></Text>
        <button onClick={()=>dispatch({type:'SET_STATE', first: first+1})}>first</button>
        <button onClick={()=>dispatch({type:'SET_STATE', second: second+1})}>second</button>
        <button onClick={()=>dispatch({type:'SET_STATE', third: third+1})}>third</button>
        </>
    );
}

export default React.memo(ReducerTest);