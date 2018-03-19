import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ModWrapper from './ModWrapper'



class Main extends React.Component {
    render() {
        return (
            <div>
            <ModWrapper/>
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);