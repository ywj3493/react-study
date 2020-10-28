import React, {useEffect} from 'react';

const User = React.memo(function User({user, onRemove, onToggle}) {
    //컴포넌트 마운트, 언마운트, 업데이트 시 할 작업 설정하는 함수
    //첫번째 파라미터에 함수, 두번째 파라미터에 의존값 배열(deps)
    //deps 배열을 비운채 실행하면, 컴포넌트가 처음 나타날때만 useEffect에 등록한 함수가 호출됨, dep에 들어가면 지정한 값이 바뀔때도 호출됨
    useEffect(() => {
        console.dir('user 값이 설정됨');
        console.dir('컴포넌트 화면에 나타남');
        //cleanUp 함수 deps가 비어있는 경우에는 컴포넌트가 사라질 때 호출 + deps가 바뀌기 전에 return 
        return () => {
            console.dir('user 값 바뀌기 전');
            console.dir('컴포넌트 화면에서 사라짐');
        }
    }, [user]);
    return(
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}
            >{user.username}</b> 
            <span>({user.email})</span>
            <button onClick={()=> onRemove(user.id)}> 삭제 </button>
        </div>
    )
});

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
            {users.map(user => (
                //리액트에서 배열 렌더링 할 때는 key 라는 props를 반드시 설정 해주어야 함
                <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    )
}

export default React.memo(UserList);