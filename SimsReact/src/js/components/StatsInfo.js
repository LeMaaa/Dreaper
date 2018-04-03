/**
 * Created by lema on 2018/2/23.
 */
import React from 'react';
import axios from 'axios';
import eventProxy from 'react-eventproxy';



class StatsInfo extends React.Component {
    constructor() {
        super();

        this.renderModEntries = this.renderModEntries.bind(this);
    }

    renderModEntries(mod) {
        if (mod !== null && mod !== undefined) {
            const entries = Object.keys(mod).map((key, i) => {
                if (key !== 'description' && key !== "preview_image" 
                    && !Array.isArray(mod[key]) && typeof mod[key] !== 'object') {
                    return (
                        <div className="item_stats" key={i}>
                            <span>{key} : {mod[key].toString()}</span>
                        </div>
                    );
                } else if (key === "preview_image") {
                    const image_url = "http:" + mod["preview_image"];
                    return image_url !== "" ? <img src = {image_url} width={500} height={300} /> : null;
                } else if (key === "description") {
                    return null;
                }
            });

            return entries;
        }
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

export default StatsInfo;