/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import ModWrapper from '../components/ModWrapper';
import '../../styles/HomePage.css';



export default class HomePage extends React.Component {

    render() {

        return (
            <div className='root'>
                <AppBar position="absolute" className='appBar'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            DREAPER Mods Site Visualization
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                      paper: 'drawerPaper'
                    }}
                >
                    test drawer
                </Drawer>
                <main className='content'>
                    <ModWrapper />
                </main>
            </div>
        );
    }
}