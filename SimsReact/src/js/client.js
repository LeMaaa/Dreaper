import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import App from './App';
// import ModWrapper from './components/ModWrapper'



class Main extends React.Component {
    render() {
        return (
            <div>
              <App />
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);