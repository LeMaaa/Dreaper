/**
 * Created by lema on 2018/2/13.
 */
require("./mongoose_db.js");
const moment = require('moment');
const bodyParser = require('body-parser');


const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Item = require('./mongoose_db').Item;
const Keyword = require('./mongoose_db').Keyword;
const Creator = require('./mongoose_db').Creator;
const async = require('async');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {

    res.send('Hello World!');
});


// TEST API, return all of the records
app.get('/all', (req, res, next) => {
    // get all records
    console.log(Item.collection.name);
    Item.find({}, (err, docs) => {
        if (err) {
            console.log(err);
            res.status(504).send("Oh uh, something went wrong");
        } else {

            console.log(docs.length);
            var resArr = [];
            for (var i = 0; i < docs.length; i++) {
                console.log('title:', docs[i]);

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
            console.log(err);
            res.status(504).send("Oh uh, something went wrong");
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
            console.log(err);
            res.status(504).send("Oh uh, something went wrong");
            // res.end(err);
        } else {
            docs.forEach((doc) => {
                console.log(doc.time_series_data);
                const key = moment(doc.publish_date).format("MMM YYYY");
                data[key] = data[key] === undefined ? 1 : data[key]+1;
            })

            const r = [];
            var totalNum = 0;

            Object.keys(data).forEach(key => {
                // console.log(key);          // the name of the current key.
                // console.log(myObj[key]);   // the value of the current key.
                const item = {
                    "time": key,
                    "num": data[key]
                };
                totalNum += data[key];

                r.push(item);
            });

            ret = {
                items :r,
                totalNum : totalNum
            }

            res.json(ret);
        }
    });
});


// return apperance time per tag
// in certain time (TODO)
app.get('/downloadsOfKey', (req, res, next) => {

    var data = [];

    Keyword.find({}).sort({ 'value' : -1}).limit(10).exec((err, docs) => {
        if(err) {
            console.log(err);
            res.status(504).send("Oh uh, something went wrong");
        }else {
            docs.forEach(doc => {
                var cur = {
                    keyword : doc._id,
                    mods : []
                }
                Item.find({'doc.keywords' : doc._id}).exec((err, mod) => {
                    if(err) {
                        console.log("No matching mod for current keyword");
                    }else if(mod) {
                        cur.mods.push(mod);
                    }
                    data.push(cur);
                });
            });
            res.json(data);
        }

    });

    // probably can just query for tags
    Item.find({}).exec((err, docs) => {
        if(err) {
            console.log(err);
            res.status(504).send("Oh uh, something went wrong");
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
                if (data[key] < 20)
                    return;

                const item = {
                    "name": key,
                    "value": data[key]
                };

                r.push(item);
            });
            res.json(r);
        }
    });
});

// returns top mods with certain tag between certain time
app.get('/topmodswithtag', (req, res, next) => {

    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    const keywords = req.query.keywords

    const startDate = new Date(startTime*1000);
    const endDate = new Date(endTime*1000);
    // console.log(startTime);
    // console.log(endTime);
    // console.log(keywords);

    const data = {};

    // probably can just query for tags
    Item.find({ 
            tags: keywords,
            publish_date: {
                $gte: startDate,
                $lte: endDate
            } 
        }).sort({'downloads': -1}).exec((err, docs) => {
        if(err) {
            console.log(err);
            res.status(504).send("Oh uh, something went wrong");
        } else {
            res.json(docs);
        }
    });
});

app.get('/getTimeRangeThreshold', (req, res, next) => {
    console.log("getTimeRangeThreshold _ called");
    var data = [];

    Item.find({}).sort({'publish_date' : -1}).exec((err, docs) => {
        if(err) {
            console.log(err);
            res.status(504).send("Oh uh, something went wrong -- geTimeRangeThreshold");
        }else {
            docs.forEach((doc) => {
                var key = (1900 + doc.publish_date.getYear()) * 100  + doc.publish_date.getMonth() + 1;

                if(!data.includes(key)) {
                    data.push(key);
                    console.log(key);
                }
            });
        }
        res.json(data.reverse());
    });
    console.log(" data for time range!");
    console.log(JSON.stringify(data));
});


app.post('/getModByName', (req, res, next) => {
    console.log("getModByName _ called");

    console.log("ModName :" + req.body.modName.length);
    var ModNames = req.body.modName;
    var ret = [];


    async.each(ModNames, function(name, callback) {
        // if you really want the console.log( 'dropped' ),
        // replace the 'callback' here with an anonymous function

        Item.findOne({'title': name}).exec((err, docs) => {
                if(err) {
                    return callback(err);
                }else {
                    ret.push(docs);
                    callback();
                }
            }
        );
    }, function(err) {
        if( err ) { return console.log(err); }
        console.log("res");
        console.log(res);
        res.json(ret);
        console.log('all dropped');
    });

});

app.post('/getKeyWordWithThreshold', (req, res, next) => {
    console.log("getKeyWordWithThreshold _ called");
    var startTime = Date.parse(req.body.startTime)/1000;
    console.log(startTime);
    var endTime =  Date.parse(req.body.endTime)/1000;
    console.log(endTime);

    var query = { '$or': [{
        "value.startDate": { $gte: startTime, $lt: endTime },
        "value.endDate": { $gte: startTime, $lt: endTime }
        }] 
    };

    Keyword.find(query).sort({ 'value.count' : -1}).limit(50).exec((err, docs) => {
        if (err) {
            console.log(err);
            res.status(504).send("Oh uh, something went wrong");
        } else {
            res_docs = docs.map((doc, index) => {
                doc.set('value', doc.value.count, {strict: false});
                doc.set('rank', index+1, {strict: false});
                return doc;
            });
            res.json(res_docs);
        }
    });
});

app.post('/getCreators', (req, res, next) => {
    console.log("getCreators _ called");

    Creator.find({}).sort({ 'value.downloads' : -1}).limit(50).exec((err, docs) => {
        if (err) {
            console.log(err);
            res.status(504).send("Oh uh, something went wrong");
        } else {
            res_docs = docs.map((doc, index) => {
                doc.set('rank', index+1, {strict: false});
                return doc;
            });
            res.json(res_docs);
        }
    });
});

app.post('/getModsWithKeyword', (req, res, next) => {
    console.log("getModsWithKeyword _ called");
    console.log(req)

    var startTime = new Date(moment(req.body.startTime).format("MMM YYYY"));
    console.log(startTime)
    var endTime =  new Date(moment(req.body.endTime).format("MMM YYYY"));
    console.log(endTime);

    // var query = "keywords." +req.body.keyword + '';

    var val = req.body.keyword;
    var query = {};
    query["keywords." + val] = {$exists : true};
    query["publish_date"] = {
        $gte: startTime,
        $lt: endTime,
    };


    Item.find(query).limit(30).exec((err, mods) => {
        if (err) {
            console.log("No matching mod for current keyword");
            res.status(500).send("Oh uh, something went wrong");
        } else {
            console.log("checking current mods");
            console.log(mods)
            var totalDownloads = 0;
            var totalViews = 0;
            mods.map((mod) => {
                totalDownloads = totalDownloads + mod.downloads;
                totalViews = totalViews + mod.views;
            });
            res.json({mods : mods, totalDownloads : totalDownloads, totalViews : totalViews});
        }
    });
});

app.post('/getModsWithCreator', (req, res, next) => {
    console.log("getModsWithCreator _ called");
    console.log(req)

    var startTime = new Date(moment(req.body.startTime).format("MMM YYYY"));
    console.log(startTime)
    var endTime =  new Date(moment(req.body.endTime).format("MMM YYYY"));
    console.log(endTime);

    // var query = "keywords." +req.body.keyword + '';

    var val = req.body.keyword;
    var query = {};
    query["keywords." + val] = {$exists : true};
    query["publish_date"] = {
        $gte: startTime,
        $lt: endTime,
    };

    Item.find(query).limit(30).exec((err, mods) => {
        if (err) {
            console.log("No matching mod for current keyword");
            res.status(500).send("Oh uh, something went wrong");
        } else {
            console.log("checking current mods");
            console.log(mods)
            res.json(mods);
        }
    });
});

app.post('/topModsWithDownloads', (req, res, next) => {
    console.log("getModsWithKeyword _ called");

    var startTime = new Date(moment(req.body.startTime).format("MMM YYYY"));
    console.log(startTime)
    var endTime =  new Date(moment(req.body.endTime).format("MMM YYYY"));
    console.log(endTime);

    // var query = "keywords." +req.body.keyword + '';

    var val = req.body.keyword;
    var query = {};
    query["publish_date"] = {
        $gte: startTime,
        $lt: endTime,
    };

    Item.find(query).sort({'downloads': -1}).limit(50).exec((err, mods) => {
        if (err) {
            console.log("No top mods found");
            res.status(500).send("Oh uh, something went wrong");
        } else {
            console.log("finding top mods");
            res_mods = mods.map((doc, index) => {
                doc.set('rank', index+1, {strict: false});
                return doc;
            });
            res.json(res_mods);
        }
    });
});

app.listen(3000, () => console.log('dbserver listening on port 3000!'))

