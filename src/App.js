import React from 'react';
import Hello from './Chapter01/Hello';
import Wrapper from './Chapter01/Wrapper';
import Counter from './Chapter01/Counter';


import './App.css';

function App() {
  return (
    <div className="App">
      <Wrapper isSpecial>
        <Hello name = "woongjae" color="blue" />
      </Wrapper>
      <Wrapper>
        <Hello name = "woongjae" color="green"/>
      </Wrapper>
      <Counter/>
    </div>
  );
}

export default App;
