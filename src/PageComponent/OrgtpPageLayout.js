import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css'
import {
    Space,
    Button,
    Input,
    Typography,
    Table
} from 'antd';

const {Title, Text} = Typography;

function OrgtpPageLayout () {
    const [dat, setDat] = useState(null);
    const [col, setCol] = useState(null);
    const [loading, setLoad] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try{
            setDat(null);
            setCol(null);
            setLoad(true);
            setError(null);
            const response = await axios.get('http://192.168.155.30:14000/HR/Organization/ReadOrgtpList?action=SO');
            setDat(response.data.dto.OrgtpDO);
        }catch (e) {
            setError(e);
        }
        setLoad(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러발생</div>
    if(!dat) return null;
    return (<>
        <Title level = {4}> 조직유형 </Title>
        <Text> 조직유형을 관리하는 페이지 입니다. </Text>
        <br/>
        <Space>
            <Button type="primary">추가</Button>
            <Button >삭제</Button>
            <Button type="primary">가져오기</Button>
            <Button type="primary">내보내기</Button>
            <Input ></Input>
            <Button type="primary">검색</Button>
        </Space>
        <Table datasource={dat} columns={[{
            Title: '조직유형이름',
            dataIndex: 'ORGTP_NM'
        }]}>
        </Table>
    </>);
}

export default OrgtpPageLayout;