import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import App from './App';

import 'react-dates/initialize';



class Main extends React.Component {
    render() {
        return (
              <App />
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);