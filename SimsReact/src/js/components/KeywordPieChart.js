/**
 * Created by lema on 2018/2/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Legend, PieChart, Pie, Tooltip, Cell} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#d7cce5', '#FFBB28', '#FF8042', '#ff47d1', '#6dbcb3','#ff6d70', '#3b41dd', '#06d0db', '#c85bff',
    '#e82573', '#2c6587', '#263163', '#97a5e5' ,'#ed9044', '#a86f72'];

export default class KeywordPieChart extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     itemsByKey:[]
        // }
    }

    // componentDidMount() {
    //     axios.get('http://localhost:3000/downloadsOfKey')
    //         .then(res => {
    //             console.log("received data");
    //             // console.log(res.data);
    //             this.setState({ 'itemsByKey' : this.state.itemsByKey.concat(res.data)})
    //         });
    // }



    // @@@@ Piechart use VictoryChart

    // render() {
    //     return (
    //         <div width={80}>
    //             <VictoryPie
    //                 data = {this.props.itemsByKey}
    //                 labelRadius={20}
    //                 colorScale = {["tomato", "orange", "gold", "cyan", "navy", "red", "grey","pink","yellow", "green" ]}
    //                 width={130}
    //                 style={{ labels: { fill: "black", fontSize: 2, } }}
    //             />
    //         </div>
    //     );
    // }


    render() {
        return (
            <PieChart width={1200} height={800}>
                <Legend verticalAlign="bottom" height={50}/>
                <Pie isAnimationActive={false} data={this.props.itemsByKey} dataKey="value" nameKey="name" cx={240} cy={240} outerRadius={160} fill="#8884d8" label>
                    {this.props.itemsByKey.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
                </Pie>
                <Tooltip/>
            </PieChart>
        );
    }





}


