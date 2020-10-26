import React, { useRef, useState, useMemo } from 'react';
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
    const onChange = e => {
        const { name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
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
        active: true
      },
      {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active: true
      }
    ]);
  
    const nextId = useRef(4);
    const onCreate = () => {
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
    }

    const onRemove = id => {
      setUsers(users.filter(user => user.id !== id));
    }

    const onToggle = id => {
      setUsers(users.map(user =>
        user.id === id ? {...user, active: !user.active } : user
      ));
    }
    
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
  