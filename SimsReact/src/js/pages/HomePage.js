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

import TopModsPage from './TopModsPage';
import TrendPage from './TrendPage';
import KeywordsPage from './KeywordsPage';
import CreatorsPage from './CreatorsPage'
import ModDetailPage from './ModDetailPage'



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
                            <Link to="/trend">
                                <ListItem button>
                                  <ListItemIcon>
                                    <InboxIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="General Trend" />
                                </ListItem>
                            </Link>
                            <Link to="/keywords">
                                <ListItem button>
                                  <ListItemIcon>
                                    <StarIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Keywords" />
                                </ListItem>
                            </Link>
                            <Link to="/topmods">
                                <ListItem button>
                                  <ListItemIcon>
                                    <SendIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Top Mods" />
                                </ListItem>
                            </Link>
                            <Link to="/creators">
                                <ListItem button>
                                  <ListItemIcon>
                                    <DraftsIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Creators" />
                                </ListItem>
                            </Link>
                            <Link to="/mods_detail">
                                <ListItem button>
                                  <ListItemIcon>
                                    <DraftsIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="Mod Detail" />
                                </ListItem>
                            </Link>
                        </div>
                    </List>
                </Drawer>


                <main className='content'>
                    <div>
                      <Route exact path="/trend" component={TrendPage} />
                      <Route path="/keywords" component={KeywordsPage} />
                      <Route path="/topmods" component={TopModsPage} />
                      <Route path="/creators" component={CreatorsPage} />
                      <Route path="/mods_detail" component={ModDetailPage} />

                    </div>
               
                </main>
            </div>
            </Router>
        );
    }
}