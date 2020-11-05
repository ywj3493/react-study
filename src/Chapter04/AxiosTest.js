import axios from 'axios';
import React, { useState, useEffect } from 'react';

function AxiosTest () {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
 
    const fetchData = async () => {
        try{
            setError(null);
            setData(null);
            setLoading(true);
            const response = await axios.get('http://192.168.155.30:14000/HR/Organization/ReadOrgtpList?action=SO');
            setData(response.data.dto.OrgtpDO);
        } catch(e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러발생</div>;
    if(!data) return null;
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

export default AxiosTest;