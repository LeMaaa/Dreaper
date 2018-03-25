/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

import ModWrapper from '../components/ModWrapper';
import '../../styles/HomePage.css';



export default class HomePage extends React.Component {

    render() {

        return (
            <div className='root'>
                <AppBar position="fixed" className='appBar'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            DREAPER Mods Site Visualization Tool
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                      paper: 'drawerPaper'
                    }}
                >
                    <List>
                        <div>
                            <ListItem button>
                              <ListItemIcon>
                                <InboxIcon />
                              </ListItemIcon>
                              <ListItemText primary="General Trend" />
                            </ListItem>
                            <ListItem button>
                              <ListItemIcon>
                                <StarIcon />
                              </ListItemIcon>
                              <ListItemText primary="Keywords" />
                            </ListItem>
                            <ListItem button>
                              <ListItemIcon>
                                <SendIcon />
                              </ListItemIcon>
                              <ListItemText primary="Top Mods" />
                            </ListItem>
                            <ListItem button>
                              <ListItemIcon>
                                <DraftsIcon />
                              </ListItemIcon>
                              <ListItemText primary="Creators" />
                            </ListItem>
                        </div>
                    </List>
                </Drawer>


                <main className='content'>
                    <ModWrapper />
                </main>
            </div>
        );
    }
}