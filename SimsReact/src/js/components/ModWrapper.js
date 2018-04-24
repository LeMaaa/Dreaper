/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import axios from 'axios';
import eventProxy from 'eventproxy'

import StatsInfo from './StatsInfo'
import ModChart from './ModChart'
import NumOfRecordsByMonth from "./NumOfRecordsByMonth"
import PieChart from "./KeywordPieChart"
import LineChartWithTimeRange from "./LineChartWithTimeRange";


export default class ModWrapper extends React.Component {
    constructor () {
        super()
        // this.state = {
        //     items:[],
        //     itemsPerMonth:[],
        //     itemsByKey:[],
        // }
    }

    // componentDidMount() {
    //     console.log("aaa");
    //     axios.get('http://dreaper.etc.cmu.edu:3000/all')
    //         .then(res => {
    //             console.log("call to get data");
    //             // this.setState({items:[...this.state.items, res.data]});
    //             this.setState({ 'items' : this.state.items.concat(res.data)})
    //         });

    //     axios.get('http://dreaper.etc.cmu.edu:3000/numberOfRecordsByMonth')
    //         .then(res => {
    //             console.log("call to get per month data");
    //             // this.setState({items:[...this.state.items, res.data]});
    //             this.setState({ 'itemsPerMonth' : this.state.itemsPerMonth.concat(res.data.reverse())})
    //         });

    //     axios.get('http://dreaper.etc.cmu.edu:3000/downloadsOfKey')
    //         .then(res => {
    //             console.log("call to get downloads of per key ");
    //             this.setState({ 'itemsByKey' : this.state.itemsByKey.concat(res.data)})
    //         });
    // }


    render() {
        // const item_stat = this.state.items.map((per_item, i) => {
        //     return (
        //         <div className="item_stats" key={i}>
        //             <StatsInfo key = {i}  item = {per_item}/>
        //         </div>
        //     );
        // });

        return (
            <div >
                {/*<ModChart items ={ this.state.items}/>*/}
                {/*<StatsInfo/>*/}
                <NumOfRecordsByMonth />
                <PieChart />
                <LineChartWithTimeRange />

            </div>
        );
    }
}