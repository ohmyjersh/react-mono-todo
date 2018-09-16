import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {TodoConnect} from 'shared';

ReactDOM.render(<TodoConnect><App /></TodoConnect>, document.getElementById('root'));
registerServiceWorker();
