import React from 'react';
import { storiesOf } from '@storybook/react';

import Counter from '../Chapter01/Counter';

storiesOf('Counter', module).add('기본 설정', () => <Counter/>).add('과연 이게 될까?', () => <Counter square={a=>a*a} />);