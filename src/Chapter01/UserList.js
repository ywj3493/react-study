import React from 'react';

function User({user, onRemove}) {
    return(
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}
            >{user.username}</b> <span>({user.email})</span>
            <button onClick={()=> onRemove(user.id)}> 삭제 </button>
        </div>
    )
}

function UserList({users, onRemove}) {
    return (
        <div>
            {users.map(user => (
                //리액트에서 배열 렌더링 할 때는 key 라는 props를 반드시 설정 해주어야 함
                <User user={user} key={user.id} onRemove={onRemove}/>
            ))}
        </div>
    )
}

export default UserList;