import React, {useState, useEffect, useRef} from 'react';
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
    const [loading, setLoad] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try{
            setDat(null);
            setLoad(true);
            setError(null);
            const response = await axios.get('http://192.168.155.30:14000/HR/Organization/ReadOrgtpList?action=SO');
            setDat(response.data.dto.OrgtpDO);
        }catch (e) {
            setError(e);
        }
        setLoad(false);
    }

    const onClickSearch = async () => {
        try{
            setError(null);
            const response = await axios.get('http://192.168.155.30:14000/HR/Organization/ReadOrgtpList?action=SO', {
                "header": {
                    "DATA_TYPE": "J"
                },
                "dto": {
                    "ORGTP_NM": "영업"
                }
            });
            setDat(response.data.dto.OrgtpDO);
        }catch (e) {
            setError(e);
        }
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
            <Button type="primary" onClick={()=>onClickSearch()}>검색</Button>
        </Space>
        <Table dataSource={dat} columns={[
        {
            title: '조직유형이름',
            dataIndex: 'ORGTP_NM',
            key: 'ORGTP_NM'
        },
        {
            title: '조직유형직책',
            dataIndex: 'DUTY_NM',
            key: 'DUTY_NM'
        },
        {
            title: '상위조직유형이름',
            dataIndex: 'ORGTP_PARENT_NM',
            key: 'ORGTP_PARENT_NM'
        },
        {
            title: '법인여부',
            dataIndex: 'ORGTP_COR_CH',
            key: 'ORGTP_COR_CH',
            render: (ORGTP_COR_CH) => (
                <>
                    {ORGTP_COR_CH==1?'예':'아니오'}
                </>
            )
        },
        {
            title: '작성일',
            dataIndex: 'WRDTSTART',
            key: 'WRDTSTART'
        },
        {
            title: '작성자',
            dataIndex: 'ORGTP_WTR_NM',
            key: 'ORGTP_WTR_NM'
        },
        {
            title: '비고',
            dataIndex: 'ORGTP_COMMENT',
            key: 'ORGTP_COMMENT'
        },
        {
            title: '',
            dataIndex: 'div',
            key: 'div',
            render: () => (
                <Space>
                    <Button>수정</Button><Button>삭제</Button>
                </Space>
            )
        },
    ]}>
        </Table>
    </>);
}

export default OrgtpPageLayout;