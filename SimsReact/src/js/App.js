import React, { Component } from 'react';
import HomePage from './pages/HomePage'
import 'antd/dist/antd.css';
import 'react-dates/lib/css/_datepicker.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Redirect from="*" to="/" />
              <Route component={HomePage} />
            </Switch>
          </div>
        </Router>
        );
  }
}

export default App;