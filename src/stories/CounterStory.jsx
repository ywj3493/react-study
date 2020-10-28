import React from 'react';
import { storiesOf } from '@storybook/react';

import Counter from '../Chapter01/Counter';

storiesOf('Counter', module)
.add('기본 설정', () => <Counter/>)
.add('LOGIC TEST1', () => <Counter logic={a=>a*a} />)
.add('LOGIC TEST2', () => <Counter logic={a=>a*2} />);