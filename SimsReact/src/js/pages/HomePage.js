/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Dashboard from './Dashboard';
import { Layout } from 'antd';
const { Header, Content } = Layout;


import '../../styles/HomePage.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


export default class HomePage extends React.Component {

    render() {

        return (
            <Router>
            <div className='root'>
                <Layout>
                    <Header className="header">Dreaper the Sims4 Magic Tool</Header>
                    <div className="content-container">
                        <Dashboard/>
                    </div>
                </Layout>
            </div>
            </Router>
        );
    }
}