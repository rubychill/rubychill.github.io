/* @refresh reload */
import { render } from 'solid-js/web';

import './reset.css';
import './index.css';
import App from './App';
import { Router } from '@solidjs/router';

render(() => <App />, document.getElementById('root') as HTMLElement);
