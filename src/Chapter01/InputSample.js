import React, {useRef, useState} from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
    const nameInput = useRef();

    const {name, nickname} = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });
        nameInput.current.focus();
    }


    //useRef() 사용시 불러들일 DOM 은 ref 프로퍼티에 넣어주면 됨
    return (
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick = {onReset}> 초기화 </button>
            <div>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;