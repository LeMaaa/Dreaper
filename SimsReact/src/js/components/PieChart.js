/**
 * Created by lema on 2018/2/19.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {VictoryPie} from 'victory';

export default class PieChart extends React.Component {
    render() {
        return (
            <div width={80}>
                <VictoryPie
                    data = {this.props.itemsByKey}
                    colorScale = {["tomato", "orange", "gold", "cyan", "navy", "red", "grey","pink","yellow", "green" ]}
                    width={150}
                    style={{ labels: { fill: "black", fontSize: 3}}}
                />
            </div>
        );
    }
}


