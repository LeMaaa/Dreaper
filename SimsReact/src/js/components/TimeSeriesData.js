/**
 * Created by lema on 2018/3/31.
 */
import React from 'react';
import moment from 'moment';
import eventProxy from 'react-eventproxy'
import {Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Line, LineChart} from 'recharts';

const colors = ['red', 'green', 'pink', 'yellow', 'black', 'blue', 'pink', 'brown', 'grey', 'ruby'];

class TimeSeriesData extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            timeSeriesData:[],
        }
        this.populateNewTimeSeriesData = this.populateNewTimeSeriesData.bind(this);
    }

    populateNewTimeSeriesData() {
        const arr = this.props.itemForTimeSeriesData;
        let res = [];
        if(this.props.itemForTimeSeriesData === null || this.props.itemForTimeSeriesData.length === 0) return;
        let i = 1;
        let before = moment(this.props.itemForTimeSeriesData[0].date);

        while(i < this.props.itemForTimeSeriesData.length) {
            let cur = moment(this.props.itemForTimeSeriesData[i].date)
            let today = before.clone().add(1,"days");

            if(cur.format("YYYY-MM-DD") === today.format("YYYY-MM-DD") ) {
                res.push(this.props.itemForTimeSeriesData[i - 1]); // before
                before = cur.clone();
                i++;
            }else if (today.format("YYYY-MM-DD") < cur.format("YYYY-MM-DD")){
                res.push({
                    date : moment(today).format("YYYY-MM-DD"),
                    downloads : 0,
                    views : 0,
                });
                before = today.clone();
            }else {
                before = today.clone();
                i++;
            }
        }
        if(i !== 1) {
            res.push( this.props.itemForTimeSeriesData[ this.props.itemForTimeSeriesData.length - 1]);
        }

        this.setState({"timeSeriesData" :  res});

    }

    render() {
        return (
            <LineChart width={500} height={140} data={this.props.itemForTimeSeriesData}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="downloads" stroke="#8884d8" dot={false} />
                <Line type="monotone" dataKey="views" stroke="#82ca9d" dot={false} />
            </LineChart>

        );
    }
}

export default TimeSeriesData;

