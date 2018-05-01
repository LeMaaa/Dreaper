/**
 * Created by lema on 2018/4/12.
 */
/**
 * Created by lema on 2018/4/10.
 */

import React from 'react';
import axios from 'axios';
import {Col, Row} from 'antd'

import ModCard from '../components/ModCard'

export default class TopModsPanel extends React.Component{
    /*
      props:
      topMods - []
     */

    constructor(props){
        super(props);
        this.state = {
            topMods : [],
            topModsSearchBox : [],
        }
    }

    componentDidMount(){


    }

    render() {
        return(
            <Row type="flex" justify="start"  className= "scroll-mod-panel">

                {
                    this.props.topMods.map((entry, index) => {
                        return <Col span={6} key={index} >
                            <ModCard mod={entry} index={entry.rank} />
                        </Col>
                    })
                }
            </Row>
        );
    }
}

