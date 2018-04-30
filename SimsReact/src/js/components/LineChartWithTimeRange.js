/**
 * Created by lema on 2018/3/15.
 */


import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy'
import { ResponsiveContainer, BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
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
        this.queryTotalModsWithinTimeRange(this.props.startTime, this.props.endTime)
        this.setState({"startTime" : this.props.startTime, "endTime" : this.props.endTime})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.startTime === this.state.startTime && nextProps.endTime === this.state.endTime) return;
        this.setState({"startTime" : nextProps.startTime, "endTime" : nextProps.endTime});
        this.queryTotalModsWithinTimeRange(nextProps.startTime, nextProps.endTime)
    }

    queryTotalModsWithinTimeRange(startTime , endTime) {
        axios.post('http://localhost:3000/numberOfRecordsByMonthWithTimeRange', {
            startTime :startTime === null ? "Mar 1994" :startTime,
            endTime : endTime === null ? "Dec 2020" : endTime,
        })
            .then(res => {
                // this.setState({items:[...this.state.items, res.data]});
                this.setState({ 'itemsWithRange' : res.data.items.reverse(),
                    'totalNum' : res.data.totalNum, 'startTime' : startTime, 'endTime' : endTime});
                eventProxy.trigger("totalModsNum", res.data.totalNum);
            });
    }

    renderLineChartView() {
        if(this.state.itemsWithRange.length === 0 || this.state.itemsWithRange === null) {
            return <div>  No Data Available! :(</div>
        } else {
           return <div>
                <ResponsiveContainer width='100%' height={150}>
                    <BarChart data={this.state.itemsWithRange}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="time"/>
                        <Tooltip cursor={false}/>
                        <ReferenceLine y={0} stroke='#000'/>
                        <Bar dataKey= "number of mods" fill="#676979" maxBarSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        }

    }

    render () {
        return (
            this.renderLineChartView()
        );

    }
}
