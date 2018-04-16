/**
 * Created by lema on 2018/3/15.
 */


import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy'
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { Badge } from 'antd';

import TimeSeriesData from '../components/TimeSeriesData'


export default class LineChartWithTimeRange extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsWithRange:[],
            totalNum : 0,
            startTime : null,
            endTime : null,
        }
    }

    componentDidMount() {
        axios.post('http://localhost:3000/numberOfRecordsByMonthWithTimeRange', {
            startTime : this.props.startTime === null ? "Mar 1994" : this.props.startTime,
            endTime : this.props.endTime === null ? "Dec 2020" : this.props.endTime,
        })
            .then(res => {
                console.log("received data");
                // this.setState({items:[...this.state.items, res.data]});
                this.setState({ 'itemsWithRange' : res.data.items.reverse()});
                this.setState({'totalNum' : res.data.totalNum})
                this.setState({'startTime' : this.props.startTime});
                this.setState({'endTime' : this.props.endTime})
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startTime === this.state.startTime && nextProps.endTime === this.state.endTime) return;
        this.queryTotalModsWithinTimeRange(nextProps.startTime, nextProps.endTime)
    }

    queryTotalModsWithinTimeRange(startTime , endTime) {
        axios.post('http://localhost:3000/numberOfRecordsByMonthWithTimeRange', {
            startTime :startTime === null ? "Mar 1994" :startTime,
            endTime : endTime === null ? "Dec 2020" : endTime,
        })
            .then(res => {
                console.log("received data");
                // this.setState({items:[...this.state.items, res.data]});
                this.setState({ 'itemsWithRange' : res.data.items.reverse()});
                this.setState({'totalNum' : res.data.totalNum})
                this.setState({'startTime' : startTime});
                this.setState({'endTime' : endTime});
            });
    }

    render () {
        return (
            <div>
            <BarChart width={1000} height={200} data={this.state.itemsWithRange}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="time"/>
                <Tooltip/>
                <ReferenceLine y={0} stroke='#000'/>
                <Bar dataKey= "number of mods" fill="#8884d8" />
            </BarChart>
            </div>


        );
    }
}
