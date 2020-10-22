import React from 'react';

function Wrapper(props) {
    const style = {
        border: '2px solid black',
        padding: '15px'
    };
    return (
        <div style={style}>
            {/*다른 로직이 있을 때*/}
            {props.isSpecial ? props.children : "평범쓰"}
            {/*단순히 보여주고 안 보여주고 할 때*/}
            {props.isSpecial && "**"}
        </div>
    );
}

export default Wrapper;