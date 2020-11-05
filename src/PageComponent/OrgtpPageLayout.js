import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css'
import {
    Button,
    Layout,
    Typography
} from 'antd';

const {Title, Text} = Typography;

function OrgtpPageLayout () {
    return (<>
        <Title level = {4}> 조직유형 </Title>
        <Text> 조직유형을 관리하는 페이지 입니다. </Text>
        <br/>
        <Button type="primary"> 추가 </Button>
        <Button > 삭제 </Button>
    </>);
}

export default OrgtpPageLayout;