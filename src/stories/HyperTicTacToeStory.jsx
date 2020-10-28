import React from 'react';
import { storiesOf } from '@storybook/react';

import HyperTicTacToe from '../TicTacToe/HyperTicTacToe';

storiesOf('HyperTicTacToe', module).add('기본 설정', () => <HyperTicTacToe />)