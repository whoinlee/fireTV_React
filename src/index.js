import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomeShelvesPane from './components/HomeShelvesPane';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HomeShelvesPane />, document.getElementById('root'));
registerServiceWorker();
