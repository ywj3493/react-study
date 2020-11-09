import React, {createRef, useEffect} from 'react';
import './Sheep.css';
 
function Sheep() {
    let canvas;
    const canvasRef = createRef();
    let ctx;
    useEffect(() => {
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        canvas.addEventListener
    })

    return (
        <canvas ref={canvasRef} className='sheep'/>
    )
}

export default Sheep;