import React from 'react';
import { storiesOf } from '@storybook/react';

import TicTacToe from '../TicTacToe/TicTacToe';

storiesOf('TicTacToe', module).add('기본 설정', () => <TicTacToe/>)