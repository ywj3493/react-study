import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css'
import {
    Space,
    Button,
    Input,
    Typography,
    Table,
    Modal,
    Select,
    Switch
} from 'antd';

const {Title, Text} = Typography;

const {Search} = Input;

const {Option} = Select;

function OrgtpPageLayout () {
    //state 선언
    const [dat, setDat] = useState(null);
    const [loading, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    //마운트 시에
    const fetchData = async () => {
        console.dir("PageFetchData");
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
    useEffect(() => {
        fetchData();
    }, []);

    //검색 버튼 onClick
    const onClickSearch = async (value) => {
        console.dir("onClickSearch");
        try{
            setDat(null);
            setError(null);
            const response = await axios.put('http://192.168.155.30:14000/HR/Organization/ReadOrgtpList?action=SO', {
                dto:{
                    ORGTP_NM: value
                }
            });
            console.dir(response);
            setDat(response.data.dto.OrgtpDO);
        }catch (e) {
            setError(e);
        }
    }

    //추가 버튼 onClick
    const onClickAdd = () => {
        console.dir("onClickAdd");
        setVisible(true);
    }

    //수정 버튼 onClick
    const onClickUpdate = () => {
        console.dir("onClickUpdate");
        setVisible(true);
        setIsUpdate(true);
    }

    //다이얼로그 OK, Cancel 버튼 onClick
    const onOK = () => {
        console.dir("onOK");
        setVisible(false);
    }

    const onCancel = () => {
        console.dir("onCancel");
        setVisible(false);
    }

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러발생</div>
    return (<>
        <Title level = {4}> 조직유형 </Title>
        <Text> 조직유형을 관리하는 페이지 입니다. </Text>
        {visible ? <OrgtpDialog 
        isUpdate={isUpdate}
        visible={visible}
        onOK={()=>onOK()}
        onCancel={()=>onCancel()}></OrgtpDialog> : null}
        <br/>
        <Space>
            <Button type="primary" onClick={()=>onClickAdd()}>추가</Button>
            <Button >삭제</Button>
            <Button type="primary">가져오기</Button>
            <Button type="primary">내보내기</Button>
            <Search onSearch={(value)=>onClickSearch(value)}></Search>
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
                <>
                    <Button>수정</Button><Button>삭제</Button>
                </>
            )
        },]}>
        </Table>

    </>);
}

function OrgtpDialog (props) {
    const [orgtpParentList, setOrgtpParentList] = useState(null);
    const [orgtpDutyGroupList, setOrgtpDutyGroupList] = useState(null);
    const [orgtpDutyList, setOrgtpDutyList] = useState(null);
    const [orgtpData, setOrgtpData] = useState(
        {
            "ORGTP_CD" : null, //수정일 경우에만
            "ORGTP_PARENT_CD":  null,
            "ORGTP_NM": null,
            "ORGTP_COMMENT": null,
            "ORGTP_CTDT": null, //SQL단에서 추가,수정
            "ORGTP_WTR": null,
            "ORGTP_WRDT": null, //SQL단에서 추가,수정
            //"ORGTP_COSTCENTER_CH": null, //사용 안 함
            "ORGTP_COR_CH": false,
            "DUTY_CD_BOSS": null,
        }
    );
    const [error, setError] = useState(null);

    //마운트 시 불러야 하는 것
    const fetchData = async () => {
        console.dir("DialogFetchData");
        try{
            if(!isUpdate){
                setError(null);
                const parentListResponse = await axios.put('http://192.168.155.30:14000/HR/Organization/ReadOrgtpParentList?action=SO');
                setOrgtpParentList(parentListResponse.data.dto.OrgtpDO);
                const dutyGroupListResponse = await axios.put('http://192.168.155.30:14000/HR/Organization/ReadTableDutyGroup?action=SO');
                setOrgtpDutyGroupList(dutyGroupListResponse.data.dto.DutyGroupList);
                const dutyListResponse = await axios.put('http://192.168.155.30:14000/HR/Organization/ReadTableDuty?action=SO');
                setOrgtpDutyList(dutyListResponse.data.dto.DutyList);
            }else {
                setError(null);
                
            }
        }catch(e) {
            setError(e);
        }
    }
    useEffect(()=>{
        fetchData();
    }, []);

    //selectbox bind
    const fillOrgtpDutyGrSB = () => {
        if(!orgtpDutyGroupList) return null;
        console.dir("fillOrgtpDutyGrSB");
        return orgtpDutyGroupList.map((list)=>{
            return (<Option value={list.DUTYGR_CD}>{list.DUTYGR_NM}</Option>)
        })
    }
    const fillOrgtpDutySB = () => {
        if(!orgtpDutyList) return null;
        console.dir("fillOrgtpDutySB");
        return orgtpDutyList.map((list)=>{
            return (<Option value={list.DUTY_CD}>{list.DUTY_NM}</Option>)
        })
    }
    const fillOrgtpParentSB = () => {
        if(!orgtpParentList) return null;
        console.dir("fillOrgtpParentSB");
        return orgtpParentList.map((list)=>{
            return (<Option value={list.ORGTP_CD}>{list.ORGTP_NM}</Option>)
        })
    }

    //onChange 이벤트
    const onChangeOrgtpNMInput = (e) => {
        setOrgtpData({...orgtpData, ORGTP_NM : e.target.value});
    }
    const onSelectOrgtpDutyGrSB = async (value) => {
        const dutyListResponse = await axios.put('http://192.168.155.30:14000/HR/Organization/ReadTableDuty?action=SO',{
            dto: {
                DUTY_CD: value,
            }
        });
        setOrgtpDutyList(dutyListResponse.data.dto.DutyList);
    }
    const onSelectOrgtpDutySB = (value) => {
        setOrgtpData({
            ...orgtpData, 
            DUTY_CD : value
        });
    }
    const onSelectOrgtpParentSB = (value) => {
        setOrgtpData({
            ...orgtpData, 
            ORGTP_PARENT_CD: value
        });
    }
    const onChangeOrgtpCommentInput = (value) => {
        setOrgtpData({
            ...orgtpData, 
            ORGTP_COMMENT: value
        });
    }

    //onToggle 이벤트
    const onChangeSwitch = (checked) => {
        setOrgtpData({
            ...orgtpData, 
            ORGTP_COR_CH : checked
        });
    }

    //insert 이벤트
    const onOk = async (inputFn) => {
        console.dir("onOK");
        if(!orgtpData.ORGTP_NM) return null;
        if(props.isUpdate&&!orgtpData.ORGTP_CD) return null;
        try{
            //수정이면 업데이트
            const insertResponse = props.isUpdate ? await axios.post('http://192.168.155.30:14000/HR/Organization/InsertOrgtp?action=SO', {
                dto: orgtpData
            }) : await axios.post('http://192.168.155.30:14000/HR/Organization/UpdateOrgtp?action=SO', {
                dto: orgtpData
            });
            console.dir(insertResponse);
            inputFn();
        }catch(e) {
            setError(e);
        }
        
    }

    if(!orgtpParentList) return null;
    if(!orgtpDutyGroupList) return null;
    return (
        <Modal 
        visible={props.visible}
        title='조직유형'
        onOk={()=>onOk(props.onOK)}
        onCancel={()=>props.onCancel()}>
            <Space direction="vertical">
                <Space>조직유형명
                    <Input id="OrgtpNMInput" onChange={onChangeOrgtpNMInput}></Input>
                </Space>
                <Space>조직유형직책그룹
                    <Select id="OrgtpDutyGrSB" defaultValue="조직유형직책그룹" onChange={onSelectOrgtpDutyGrSB}>
                        {fillOrgtpDutyGrSB()}
                    </Select>
                </Space>
                <Space>조직유형직책
                    <Select id="OrgtpDutySB" defaultValue="조직유형직책" onChange={onSelectOrgtpDutySB}>
                        {fillOrgtpDutySB()}
                    </Select>
                </Space>
                <Space>법인여부
                    <Switch defaultChecked onChange={onChangeSwitch}></Switch>
                </Space>
                <Space>상위조직유형
                    <Select id="OrgtpParentSB" defaultValue="상위조직유형" onChange={onSelectOrgtpParentSB}>
                        {fillOrgtpParentSB()}
                    </Select>
                </Space>
                <Space direction="vertical">비고
                    <Input id="OrgtpCommentInput" onChange={onChangeOrgtpCommentInput}></Input>
                </Space>
            </Space>
        </Modal>
    )
}

export default OrgtpPageLayout;