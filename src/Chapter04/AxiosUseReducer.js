import React, {useEffect, useReducer} from 'react';
import axios from 'axios';

function reducer(state, action) {
    switch (action.type) {
        case 'NOPRESS' :
            return {
                loading: false,
                data: null,
                error: null
            };
        case 'LOADING' : 
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS' : 
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR' :
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default: 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function AxiosUseReducer() {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchData = async () => {
        dispatch({type : 'LOADING'});
        try {
            const response = await axios.get('http://192.168.155.30:14000/HR/Organization/ReadOrgtpList?action=SO');
            dispatch({type:'SUCCESS', data: response.data.dto.OrgtpDO});
        } catch (e) {
            dispatch({type:'ERROR', error: e});
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const {loading, data, error} = state;

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러발생</div>;
    if(!data) return <div><button onClick = {fetchData}>불러오기</button></div>;
    return (
        <>
        <ul>
            {data.map(list => (
                <li>
                    {list.ORGTP_NM} ({list.ORGTP_CD})
                </li>
            ))}
        </ul>
        <button onClick = {fetchData}> 다시 불러오기 </button>
        </>
    );
}

export default AxiosUseReducer;