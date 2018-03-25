/**
 * Created by lema on 2018/2/19.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {VictoryPie} from 'victory';

export default class PieChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsByKey:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/downloadsOfKey')
            .then(res => {
                console.log("call to get downloads of per key ");
                // console.log(res.data);
                this.setState({ 'itemsByKey' : this.state.itemsByKey.concat(res.data)})
            });
    }

    render() {
        return (
            <div width={80}>
                <VictoryPie
                    data = {this.state.itemsByKey}
                    colorScale = {["tomato", "orange", "gold", "cyan", "navy", "red", "grey","pink","yellow", "green" ]}
                    width={150}
                    style={{ labels: { fill: "black", fontSize: 3}}}
                />
            </div>
        );
    }
}


