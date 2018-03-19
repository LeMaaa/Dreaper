/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import eventProxy from 'react-eventproxy'
import {ScatterChart, Scatter, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts';

import TwoLevelPieChart from './TwoLevelPieChart'
import PieChart from './PieChart'

class ModChart extends React.Component{

    changeModDetail(entry){
        console.log(entry);
        eventProxy.trigger('displayModInfo', entry);
    }

    render () {
        const colors = ['red', 'green', 'pink', 'yellow', 'black', 'blue', 'pink', 'brown', 'grey', 'ruby'];
        return (
            <ScatterChart width={1000} height={600} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <XAxis dataKey={'downloads'} type = "number" name = 'downloads' />
                <YAxis dataKey={'views'} type = "number" name='views'/>
                <CartesianGrid />
                <Scatter name='Mods' data = {this.props.items} fill='#8884d8' >
                    {
                        this.props.items.map((entry, index) => {

                            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} onClick = {this.changeModDetail.bind(this, entry)} />
                        })
                    }
                </Scatter>
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            </ScatterChart>
        );
    }
};

export default ModChart;
