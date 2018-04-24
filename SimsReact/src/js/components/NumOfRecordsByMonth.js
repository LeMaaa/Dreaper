/**
 * Created by lema on 2018/2/28.
 */

import React from 'react';
import eventProxy from 'react-eventproxy'
import axios from 'axios';

import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from 'recharts';


class NumOfRecordsByMonth extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            itemsPerMonth:[]
        }
    }

    changeModDetail(entry){
        console.log(entry);
        eventProxy.trigger('displayModInfo', entry);
    }

    componentDidMount() {
        console.log("calling to get per month data");

        axios.get('http://localhost:3000/numberOfRecordsByMonth')
            .then(res => {
                console.log("received data");
                // this.setState({items:[...this.state.items, res.data]});
                console.log(res.data);
                this.setState({ 'itemsPerMonth' : res.data.reverse()});
            });
    }

    render () {
        return (
            <LineChart width={600} height={300} data={this.state.itemsPerMonth}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="time"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="number of mods" stroke="#8884d8" activeDot={{r: 8}} />
            </LineChart>
        );
    }
};

export default NumOfRecordsByMonth;

