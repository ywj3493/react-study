import React from 'react';
import { storiesOf } from '@storybook/react';

import AxiosTest from '../Chapter04/AxiosTest';

storiesOf('AxiosTest', module).add('기본 설정', () => <AxiosTest/>)