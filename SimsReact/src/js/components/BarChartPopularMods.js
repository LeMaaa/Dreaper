import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy'

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ModDialog from "./ModDialog";
import TimeSeriesData from "./TimeSeriesData";

export default class BarChartPopularMods extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topMods:[],
            entry: null,
            open: false
            // itemForTimeSeriesData :[]
        }

        this.fetchData = this.fetchData.bind(this);
        this.renderTimeSeriesData = this.renderTimeSeriesData.bind(this);
        this.renderModList = this.renderModList.bind(this);
        this.handleDialogOpening = this.handleDialogOpening.bind(this);
        this.handleDialogClosing = this.handleDialogClosing.bind(this);

    }

    fetchData(url) {
        console.log(url);
        return axios.get(url)
            .then(res => {
                console.log("received data");
                // this.setState({items:[...this.state.items, res.data]});
                console.log(res.data);
                this.setState({ 'topMods' : res.data });
                // this.setState({'itemForTimeSeriesData' : res.data});
            });
    }

    componentDidMount() {
        const startTimestamp = this.props.startTimestamp === "" ? "1517443200" : this.props.startTimestamp;
        const endTimestamp = this.props.endTimestamp === "" ? "1521504000" : this.props.endTimestamp;
        const keywords = this.props.keywords === "" ? "trait" : this.props.keywords;

        let url = "http://localhost:3000/topmodswithtag?startTime=" + 
        startTimestamp + "&endTime=" + endTimestamp + "&keywords=" + keywords;
        this.fetchData(url);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startTimestamp === this.props.startTimestamp &&
            nextProps.endTimestamp === this.props.endTimestamp &&
            nextProps.keywords === this.props.keywords)
          return;

        const startTimestamp = nextProps.startTimestamp === "" ? "1517443200" : nextProps.startTimestamp;
        const endTimestamp = nextProps.endTimestamp === "" ? "1521504000" : nextProps.endTimestamp;
        const keywords = nextProps.keywords === "" ? "trait" : nextProps.keywords;

        let url = "http://localhost:3000/topmodswithtag?startTime=" + 
        startTimestamp + "&endTime=" + endTimestamp + "&keywords=" + keywords;
        this.fetchData(url);

    }

    changeModDetail(entry) {
        console.log(entry);
        eventProxy.trigger('displayModInfo', entry);
    }

    handleDialogOpening(entry) {
        this.setState({
            open: true,
            entry: entry
        });
    }


    handleDialogClosing() {
        this.setState({
            open: false,
            entry: null
        })
    }

    renderTimeSeriesData() {
        const sort_by_date = (a, b) => {
            const timestamp1 = Date.parse(a['date'])/1000;
            const timestamp2 = Date.parse(b['date'])/1000;

            console.log(timestamp1);
            console.log(timestamp2);
            return timestamp1 - timestamp2;
        }
        return this.state.itemForTimeSeriesData.map((entry, index) => {
            console.log(entry.time_series_data.sort(sort_by_date));
            return <TimeSeriesData itemForTimeSeriesData = {entry.time_series_data.sort(sort_by_date)} key = {index}/>;
        });
    }

    renderModList() {

        return this.state.topMods.map((entry, index) => {
            const stats = "Downloads: " + entry.downloads + " Views: " + entry.views;
            return  <ListItem button onClick={() => this.handleDialogOpening(entry)} key={index}> <ListItemText primary={entry.title} secondary={stats}/> </ListItem>;
        });
    }


    render () {
        return (
            <div>
                <BarChart width={800} height={500} data={this.state.topMods}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <XAxis dataKey="title"/>
                   <YAxis/>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="downloads" fill="#8884d8"  />
                   <Bar dataKey="views" fill="#82ca9d" />
                </BarChart>


                <List>
                {
                    this.renderModList()
                }
                </List>

                <ModDialog
                    entry={this.state.entry}
                    open={this.state.open}
                    onClose={this.handleDialogClosing}
                />



            </div>
        );
    }
}