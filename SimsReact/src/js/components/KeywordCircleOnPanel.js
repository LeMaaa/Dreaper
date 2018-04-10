/**
 * Created by lema on 2018/2/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Legend, PieChart, Pie, Tooltip, Cell, LabelList} from 'recharts';

const COLORS = ['#a86f72','#263163', '#00C49F', '#d7cce5', '#97a5e5', '#FFBB28',  '#ff47d1', '#6dbcb3','#ff6d70', '#3b41dd',  '#c85bff',
    '#e82573', '#ed9044' ,'#0088FE', '#FF8042', '#06d0db',];

export default class KeywordCircleOnPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsByKey:[]
        }
    }

    // componentDidMount() {
    //     axios.post('http://localhost:3000/getKeyWordWithThreshold', {
    //
    //             startTime: this.props.startTime === null ? "Mar 1994" : this.props.startTime,
    //             endTime: this.props.endTime === null ? "Dec 2020" : this.props.endTime,
    //     })
    //         .then(res => {
    //             console.log("received data");
    //             // console.log(res.data);
    //             this.setState({ 'itemsByKey' : res.data})
    //         });
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.startTime=== this.props.startTime &&
    //         nextProps.endTime === this.props.endTime)
    //         return;
    //
    //     let nextStartTime = nextProps.startTime === null ? "Mar 1994" : nextProps.startTime;
    //     let nextEndTime = nextProps.endTime === null ? "Dec 2020" : nextProps.endTime;
    //
    //     axios.post('http://localhost:3000/getKeyWordWithThreshold', {
    //             startTime: nextStartTime ,
    //             endTime: nextEndTime,
    //     })
    //         .then(res => {
    //             console.log("received data next props");
    //             // console.log(res.data);
    //             this.setState({ 'itemsByKey' : res.data})
    //         });
    // }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({"itemsByKey": nextProps.items})
    // }


    render() {
        return (
            <PieChart width={280} height={280}>
                {/*<Legend verticalAlign="bottom" height={50}/>*/}
                <Pie isAnimationActive={false} data={this.props.items} dataKey="value" nameKey="name"
                     cx={140} cy={140} outerRadius={100} fill="#8884d8" labelLine={false}>
                    {this.state.itemsByKey.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
                    <LabelList dataKey="name" position="inside" />
                </Pie>
                <Tooltip/>
            </PieChart>
        );
    }
}

