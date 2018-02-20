/**
 * Created by lema on 2018/2/13.
 */
require("./mongoose_db.js");
const express = require('express')
const app = express()
var mongoose = require("mongoose");

var Item = require('./mongoose_db').Item;



app.get('/', function(req, res) {
    res.send('Hello World!');
});


app.get('/all', function (req, res, next) {
    Item.find({}, function (err, docs) {
        if (err) {
            res.status(504);
            res.end(err);
        } else {
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
                }
                resArr.push(item_res);
            }
            res.end(JSON.stringify(resArr));
        }
    });
});


app.listen(3000, () => console.log('dbserver listening on port 3000!'))

