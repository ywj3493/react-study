import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.dir('활성 사용자 수를 세는 중 ...');
  return users.filter(user=>user.active).length;
}

function ArrayWrapper() {
    const [inputs, setInputs] = useState({
        username:'',
        email:''
    });
    const {username, email} = inputs;
    // 함수들도 컴포넌트가 리렌더링 될 때 마다 새로 만들어짐
    // 나중에 컴포넌트에서 props 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링 하는 것 조차 하지 않고, 컴포넌트의 결과물을 재사용 하는 작업을 할 것임
    // 이 작업을 하려면, 함수를 재사용 하는 것이 필수
    const onChange = useCallback(e => {
        const { name, value} = e.target;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
      },
      [users]
    );
    const [users, setUsers] = useState([
      {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true
      },
      {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active: false
      },
      {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: false
      }
    ]);
    
    // useRef 에 인자를 넣으면 current에 들어감
    const nextId = useRef(4);

    const onCreate = useCallback(
      () => {
        const user = {
            id: nextId.current,
            username,
            email
        };
        setUsers([...users, user]);
        
        setInputs({
            username: '',
            email: ''
        });
        nextId.current += 1;
      },
      [username, email]
    );

    const onRemove = useCallback(id => {
        setUsers(users.filter(user => user.id !== id));
      },[users]);

    const onToggle = useCallback(id => {
        setUsers(users.map(user =>
          user.id === id ? {...user, active: !user.active } : user
        )
      );
    },[users]);
    
    // 첫번째 파라미터는 어떻게 연산할지 정의하는 함수, 두번째 파라미터는 deps 배열
    // 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산 해주고, 만약 내용이 바뀌지 않았다면, 이전에 연산한 값을 재사용 하게됨
    const count = useMemo(() => countActiveUsers(users), [users]);
    //const count = countActiveUsers(users);

    return (
      <div>
        <CreateUser 
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users = {users} onRemove={onRemove} onToggle={onToggle}/>
        <div>활성 사용자 수 : {count}</div>
      </div>
    );
  }
  
  export default ArrayWrapper;
  