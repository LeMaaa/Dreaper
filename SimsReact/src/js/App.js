import React, { Component } from 'react';
import HomePage from './pages/HomePage'
import CssBaseline from 'material-ui/CssBaseline';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <div>
        <CssBaseline />
          <HomePage />
{/*          <Router>

            <Route path="/" component={ModWrapper}/>
          </Router>*/}
        </div>
        );
  }
}

export default App;