/**
 * Created by lema on 2018/2/13.
 */
require("./mongoose_db.js");
const moment = require('moment');


const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Item = require('./mongoose_db').Item;


app.get('/', (req, res) => {
    res.send('Hello World!');
});


// TEST API, return all of the records
app.get('/all', (req, res, next) => {
    // get all records

    Item.find({}, (err, docs) => {
        if (err) {
            res.status(504);
            res.end(err);
        } else {
            console.log(docs.length);
            var resArr = [];
            for (var i = 0; i < docs.length; i++) {
                console.log('title:', docs[i].title);

                var item_res = {
                    title: docs[i].title,
                    artist: docs[i].artist,
                    artist_url: docs[i].artist_url,
                    publish_date: docs[i].publish_date,
                    downloads:docs[i].downloads,
                    views: docs[i].views,
                    favourited:docs[i].favourited,
                    thanks: docs[i].thanks,
                    description:docs[i].description,
                    url: docs[i].url,
                    tags: docs[i].tags,
                    types:docs[i].types,
                    category: docs[i].category,
                    game_version: docs[i].game_version,
                    preview_image: docs[i].preview_image,
                    pack_requirement: docs[i].pack_requirement,
                    comments_cnt: docs[i].comments_cnt,
                    comments: docs[i].comments,
                    files: docs[i].files,
                    time_series_data: docs[i].time_series_data,
                }

                resArr.push(item_res);
            }
            res.json(resArr);
        }
    });
});


app.get('/traits', (req, res, next) => {
    console.log("called");

    // filter for tags that appear more than 30 times
    Item.find({category : 'Overrides - Tuning Mods'}).limit(30).exec((err, docs) => {
        if(err) {
            console.log("called2");
            res.status(504);
            res.end(err);
        } else {
            console.log("called3");
            console.log(docs);
            var resArr = [];
            for(var i = 0; i < docs.length; i++) {
                console.log(':', docs[i].title);
                var item_res = {
                    title: docs[i].title,
                    artist: docs[i].artist,
                    artist_url: docs[i].artist_url,
                    publish_date: docs[i].publish_date,
                    downloads:docs[i].downloads,
                    views: docs[i].views,
                    favourited:docs[i].favourited,
                    thanks: docs[i].thanks,
                    description:docs[i].description,
                    url: docs[i].url,
                    tags: docs[i].tags,
                    types:docs[i].types,
                    category: docs[i].category,
                    game_version: docs[i].game_version,
                    preview_image: docs[i].preview_image,
                    pack_requirement: docs[i].pack_requirement,
                    comments_cnt: docs[i].comments_cnt,
                    comments: docs[i].comments,
                    files: docs[i].files,
                    time_series_data: docs[i].time_series_data,
                }
                resArr.push(item_res);
            }
            res.end(JSON.stringify(resArr));
        }
    });
});

// return number of created records per month

app.get('/numberOfRecordsByMonth', (req, res, next) => {
    console.log("numberOfRecordsByMonth _ called");
    const data = {};

    Item.find({}).sort({'publish_date' : -1}).exec((err, docs) => {
        if(err) {
            res.status(504);
            res.end(err);
        } else {

            docs.forEach((doc) => {
                const key = moment(doc.publish_date).format("MMM YY");
                data[key] = data[key] === undefined ? 1 : data[key]+1;
            })

            const r = [];

            Object.keys(data).forEach(key => {
                // console.log(key);          // the name of the current key.
                // console.log(myObj[key]);   // the value of the current key.
                const item = {
                    "time": key,
                    "num": data[key]
                };

                r.push(item);
            });

            res.json(r);
        }
    });
});


// return downloads per tag
// in certain time (TODO)
app.get('/downloadsOfKey', (req, res, next) => {

    const data = {};

    // probably can just query for tags
    Item.find({}).exec((err, docs) => {
        if(err) {
            res.status(504);
            res.end(err);
        } else {
            docs.forEach(doc => {
                if (doc.tags !== null && doc.tags.length !== 0) {
                    doc.tags.forEach(tag => {
                        const key = tag.toLowerCase();
                        data[key] = data[key] === undefined ? 1 : data[key]+1;
                    })
                }
            })

            const r = [];
            Object.keys(data).forEach(key => {
                if (data[key] < 10)
                    return;

                const item = {
                    "x": key,
                    "y": data[key]
                };

                r.push(item);
            });

            res.json(r);
        }
    });
});




app.listen(3000, () => console.log('dbserver listening on port 3000!'))

