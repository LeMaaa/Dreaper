/**
 * Created by lema on 2018/3/25.
 */

import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy'


export default class KeywordTimeRange extends React.Component {



    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            startTime: '',
            endTime: '',
        };
    }


    // componentDidMount() {
    //     axios.get('http://dreaper.etc.cmu.edu:3000/getTimeRangeThreshold')
    //         .then(res => {
    //             console.log("received data - getTimeRangeThreshold");
    //             console.log(res.data);
    //             this.setState({ 'TimeRangeThreshold' : this.state.TimeRangeThreshold.concat(res.data)})
    //         });
    // }


    onChange(e) {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state
        // var that = this;
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    changeKeyWordMod(entry){
        eventProxy.trigger('changeKeyWordMod', entry);
    }

    onSubmit (e)  {
        e.preventDefault();

        axios.post('http://dreaper.etc.cmu.edu:3000/getKeyWordWithThreshold', {

                startTime : this.state.startTime,
                endTime : this.state.endTime

        })
            .then((result) => {
                this.changeKeyWordMod(result.data);
            });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <span> startTime(MMM YY): </span>
                <input type="text" name="startTime" value={this.state.startTime} onChange={this.onChange} />
                <span> endTime(MMM YY):</span>
                <input type="text" name="endTime" value={this.state.endTime} onChange={this.onChange} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}




