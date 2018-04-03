import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme'

import {white, red, grey, amber} from 'material-ui/colors'

import createPalette from 'material-ui/styles/createPalette'
import 'react-dates/initialize';

const muiTheme = createMuiTheme({
  palette: createPalette({
    primary: white,
    accent: amber,
    error: red
  })
})


class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={muiTheme}>
              <App />
            </MuiThemeProvider>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);