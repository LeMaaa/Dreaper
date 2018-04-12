/**
 * Created by lema on 2018/4/10.
 */

import React from 'react';
import {Col, Row} from 'antd'
import CreatorCard from '../components/CreatorCard'

export default class CreatorsPanel extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("crreators");
        console.log(this.props.creators);
    }

    render() {
        return(
            <Row type="flex" justify="space-around" >

                {
                    this.props.creators.map((entry, index) => {
                        return <Col span={6} key = {index} >
                            <CreatorCard creatorEntry = {entry} index = {index + 1}/>
                        </Col>
                    })
                }
            </Row>
        );
    }
}
