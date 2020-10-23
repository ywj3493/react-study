import React from 'react';
import { storiesOf } from '@storybook/react';

import UserList from '../Chapter01/UserList';

storiesOf('UserList', module).add('기본 설정', () => <UserList/>)