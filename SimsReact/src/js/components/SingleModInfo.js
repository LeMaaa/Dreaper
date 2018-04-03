/**
 * Created by lema on 2018/4/2.
 */
import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy';



class SingleModInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            modEntry : null,
            modName : "",
        }
        this.renderModEntries = this.renderModEntries.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modName === null || nextProps.modName.length === 0
            || nextProps.modName === this.state.modName) return;

        let modName = nextProps.modName;

        axios.post('http://localhost:3000/getModByName', {
           modName : modName
        })
            .then(res => {
                console.log("received data next props");
                // console.log(res.data);
                this.setState({ 'itemsByKey' : res.data})
            });
    }


    render() {
        const { entry } = this.props;

        return (
            <div>
                {this.renderModEntries(entry)}
            </div>
        );
    }
}

export default SingleModInfo;
