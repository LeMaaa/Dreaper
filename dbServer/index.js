/**
 * Created by lema on 2018/2/13.
 */
require("./mongoose_db.js");

var Map = require("collections/map");
var sortedMap = require("collections/sorted-map")
var moment = require('moment');


const express = require('express')
const app = express()


var mongoose = require("mongoose");

var Item = require('./mongoose_db').Item;

var time_map = new sortedMap({"Jan": 1, "Feb": 2, "Mar":3, "Apr": 4, "May":5, "Jun" : 6,
    "July":7, "Aug" : 8, "Sep" : 9, "Oct":10, "Nov":11, "Dec":12});




app.get('/', function(req, res) {
    res.send('Hello World!');
});


app.get('/all', function (req, res, next) {
    Item.find({}, function (err, docs) {
        if (err) {
            res.status(504);
            res.end(err);
        } else {
            console.log(docs.length);
            var resArr = [];
            for (var i = 0; i < docs.length; i++) {
                console.log('user:', docs[i].title);

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


app.get('/traits', function (req, res, next) {
    console.log("called");
    Item.find({category : 'Overrides - Tuning Mods'}).limit(30).exec(function (err, docs) {
        if(err) {
            console.log("called2");
            res.status(504);
            res.end(err);
        }else {
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


app.get('/numberOfRecordsByMonth', function (req, res, next) {
    console.log("numberOfRecordsByMonth _ called");
    var map = new Map();
    Item.find({}).sort({'publish_date' : -1}).exec(function (err, docs) {
        if(err) {
            res.status(504);
            res.end(err);
        }else {
            for(var i = 0; i < docs.length; i++) {
                var key = moment(docs[i].publish_date).format("MMM YY");
                if(map.has(key)) {
                    map.add(map.get(key) + 1, key);
                }else {
                    map.set(key, 1);
                }
            }
            var r = [];
            map.forEach(function (value, key2, iter) {
                var item = {
                    "time" : key2,
                    "num" : value
                }
                r.push(item);

            });
            console.log(r);
            res.end(JSON.stringify(r));
        }
    });
});


app.get('/downloadsOfKey', function (req, res, next) {
    console.log("numberOfRecordsByMonth _ called");
    var map = new Map();
    Item.find({}).exec(function (err, docs) {
        if(err) {
            res.status(504);
            res.end(err);
        }else {
            for(var i = 0; i < docs.length; i++) {
                if(docs[i].tags === null || docs[i].tags.length === 0) continue;
                for(var j = 0; j < docs[i].tags.length; j++) {
                    var key = docs[i].tags[j].toLowerCase();
                    if(map.has(key)) {
                        map.add(map.get(key) + 1, key);
                    }else {
                        map.set(key, 1);
                    }
                }
            }
            var r = [];
            map.forEach(function (value, key2, iter) {
                if(value > 10) {
                    var item = {
                        "x" : key2,
                        "y" : value
                    }
                    r.push(item);
                }
            });
            res.end(JSON.stringify(r));
        }
    });
});




app.listen(3000, () => console.log('dbserver listening on port 3000!'))

