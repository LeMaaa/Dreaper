/**
 * Created by lema on 2018/2/13.
 */

const moment = require('moment');
const bodyParser = require('body-parser');


const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Item = require('./mongoose_db').Item;
const Keyword = require('./mongoose_db').Keyword;
const Creator = require('./mongoose_db').Creator;
const async = require('async');

const dateFormat = 'MM/DD/YYYY';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/numberOfRecordsByMonthWithTimeRange', (req, res, next) => {
    
    const data = {};
    var dataDay = {};
    var startTime;
    var endTime;
    let dateFormatForTimeRange = "month";

    if(req.body.startTime === null || req.body.startTime.length === 0) {
        startTime = new Date("2000/01/01");
    }else {
        startTime = new Date(req.body.startTime);
    }

    if(req.body.endTime === null || req.body.endTime.length === 0) {
        endTime = new Date();
    }else {
        endTime = new Date(req.body.endTime);
    }

    var query = {};
    query["publish_date"] = {
        $gte: startTime,
        $lt: endTime,
    };

    Item.find(query, 'title publish_date').sort({'publish_date' : -1}).exec((err, docs) => {
        if (err) {
            res.status(500).send("Oh uh, something went wrong");
        } else {
                docs.forEach((doc) => {
                    const key = moment(doc.publish_date).format("MMM YYYY");
                    const keyDay = moment(doc.publish_date).format("MM/DD/YYYY");
                    data[key] = data[key] === undefined ? 1 : data[key]+1;
                    dataDay[keyDay] = dataDay[keyDay] === undefined ? 1 : dataDay[keyDay]+1;
                });

                const r = [];
                var totalNum = 0;

                if (Object.keys(data).length > 10) {
                    dateFormatForTimeRange = "month";
                    Object.keys(data).forEach(key => {
                        const item = {
                            "time": key,
                            "number of mods": data[key]
                        };
                        totalNum += data[key];

                        r.push(item);
                    });
                } else {
                    dateFormatForTimeRange = "day";
                    Object.keys(dataDay).forEach(key => {
                        const item = {
                            "time": key,
                            "number of mods": dataDay[key]
                        };
                        totalNum += dataDay[key];
                        r.push(item);
                    });

                }

                var ret = {
                    items :r,
                    totalNum : totalNum,
                    dateFormatForTimeRange : dateFormatForTimeRange,
                }

                res.json(ret);
        }
    });
});



app.get('/trendingModsOfLastWeek', (req, res, next) => {
    
    const data = {};
    let today = moment().format("YYYY-MM-DD").toString();
    let oneWeekBefore  = moment().subtract(7,'d').format("YYYY-MM-DD").toString();

    let pipeline = [
        {
            "$match": {
                "time_series_data.date": { $gte: oneWeekBefore, $lt: today}
            }
        },
        { "$unwind": "$time_series_data" },
        {
            "$match": {
                "time_series_data.date": { $gte: oneWeekBefore, $lt: today}
            }
        },
        { "$group": {
            "_id": "$title",
            "total": { "$sum": "$time_series_data.downloads" }
        }},
        {
            "$sort" : {
                "total" : -1
            }
        }
    ];

    Item.aggregate(pipeline, function (err, docs) {
        if(err) {
            res.status(500).send("Something went wrong");
        } else {
            
            res.json(docs.slice(0,50));
        }
    });
});

// return number of created records per month
app.get('/numberOfRecordsByMonth', (req, res, next) => {
    
    const data = {};

    Item.find({}).sort({'publish_date' : -1}).exec((err, docs) => {
        if(err) {
            
            res.status(504).send("Oh uh, something went wrong");
            // res.end(err);
        } else {
            docs.forEach((doc) => {
                
                const key = moment(doc.publish_date).format("MMM YYYY");
                data[key] = data[key] === undefined ? 1 : data[key]+1;
            })

            const r = [];
            var totalNum = 0;

            Object.keys(data).forEach(key => {
                const item = {
                    "time": key,
                    "number of mods": data[key]
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

app.get('/downloadsOfKey', (req, res, next) => {

    var data = [];

    Keyword.find({}).sort({ 'value' : -1}).limit(10).exec((err, docs) => {
        if(err) {
            
            res.status(504).send("Oh uh, something went wrong");
        }else {
            docs.forEach(doc => {
                var cur = {
                    keyword : doc._id,
                    mods : []
                }
                Item.find({'doc.keywords' : doc._id}).exec((err, mod) => {
                    if(err) {
                        
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

    const data = {};

    Item.find({ 
            tags: keywords,
            publish_date: {
                $gte: startDate,
                $lte: endDate
            } 
        }).sort({'downloads': -1}).exec((err, docs) => {
        if(err) {
            
            res.status(504).send("Oh uh, something went wrong");
        } else {
            res.json(docs);
        }
    });
});

app.get('/getTimeRangeThreshold', (req, res, next) => {
    
    var data = [];

    Item.find({}).sort({'publish_date' : -1}).exec((err, docs) => {
        if(err) {
            
            res.status(504).send("Oh uh, something went wrong -- geTimeRangeThreshold");
        }else {
            docs.forEach((doc) => {
                var key = (1900 + doc.publish_date.getYear()) * 100  + doc.publish_date.getMonth() + 1;

                if(!data.includes(key)) {
                    data.push(key);
                    
                }
            });
        }
        res.json(data.reverse());
    });
    
    
});


// get mods by mod titles
app.post('/getModByName', (req, res, next) => {
    
    var ModNames = req.body.modName;
    var ret = [];

    async.each(ModNames, function(name, callback) {
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
        if( err ) { return  }
        
        
        res.json(ret);
        
    });

});

// get a single mod by its title
app.post('/getHotModByName', (req, res, next) => {
    
    let hotModName = req.body.modName;

    Item.findOne({'title': hotModName}).exec((err, doc) => {
                if(err) {
                    res.status(504).send("Oh uh, something went wrong");
                }else {
                    
                    res.json(doc);
                }
            }
        );
});


// get 50 keywords matching user provided term
// in a timerange
app.get('/getMatchingKeyword', (req, res, next) => {

    let startTime = "";
    let endTime = "";
    let search_term = req.query.keyword;

    if (search_term === undefined || search_term.length === 0) {
        res.status(500).send("term to search cannot be empty");
    }

    if(req.query.startTime === undefined || req.query.startTime.length === 0) {
        startTime = Date.parse("2000/01/01")/1000;
    }else {
        startTime = Date.parse(req.query.startTime)/1000;
    }

    let today = new Date();

    if(req.query.endTime === undefined || req.query.endTime.length === 0) {
        endTime = Date.parse(today)/1000;
    }else {
        endTime = Date.parse(req.query.endTime)/1000;
    }

    var query = { 
        '$and' :[
            {'$or': [{
            "value.startDate": { $gte: startTime, $lt: endTime },
            "value.endDate": { $gte: startTime, $lt: endTime }
            }]},
            {$text: {$search: search_term}}
        ]
    };

    Keyword.find(query).sort({ 'value.count' : -1}).exec((err, docs) => {

        let ret = [];
        
        async.each(docs, (keyword, cb) => {
            // find mods count within time range
            let cnt_query = {};
            const startDate = new Date(startTime * 1000);
            const endDate = new Date(endTime * 1000);
            // 
            cnt_query["keywords." + keyword._id] = {$exists : true};
            cnt_query["publish_date"] = {
                $gte: startDate,
                $lt: endDate,
            };

            Item.count(cnt_query).exec((err, cnt) => {
                    if(err) {
                        
                        return cb(err);
                    } else {
                        keyword.set('value', cnt, {strict: false});
                        ret.push(keyword);
                        return cb();
                    }
                }
            );
        }, (err) => {
            if (err) {  
                res.status(500).send("Oh, something went wrong!");
            }

            // sort and return top 50
            ret.sort((a, b) => {
                return b.value - a.value;
            })

            // assign ranking
            ret = ret.slice(0, 50).map((entry, i) => {
                entry.set('rank', '--', {strict: false});
                return entry;
            })
            
            res.json(ret);

        });
    });
});

// get top 50 keywords within a time range
app.post('/getKeyWordWithThreshold', (req, res, next) => {

    let startTime;
    let endTime;

    if(req.body.startTime === null || req.body.startTime.length === 0) {
        startTime = Date.parse("2000/01/01")/1000;
    }else {
        startTime = Date.parse(req.body.startTime)/1000;
    }

    let today = new Date();

    if(req.body.endTime === null || req.body.endTime.length === 0) {
        endTime = Date.parse(today)/1000;
    }else {
        endTime = Date.parse(req.body.endTime)/1000;
    }

    
    var query = { '$or': [{
        "value.startDate": { $gte: startTime, $lt: endTime },
        "value.endDate": { $gte: startTime, $lt: endTime }
        }] 
    };


    Keyword.find(query).sort({ 'value.count' : -1}).limit(50).exec((err, docs) => {

        let ret = [];
        async.each(docs, (keyword, cb) => {
            // find mods count within time range
            let cnt_query = {};
            const startDate = new Date(startTime * 1000);
            const endDate = new Date(endTime * 1000);
            // 
            cnt_query["keywords." + keyword._id] = {$exists : true};
            cnt_query["publish_date"] = {
                $gte: startDate,
                $lt: endDate,
            };

            Item.count(cnt_query).exec((err, cnt) => {
                    if(err) {
                        
                        return cb(err);
                    } else {
                        keyword.set('value', cnt, {strict: false});
                        ret.push(keyword);
                        return cb();
                    }
                }
            );
        }, (err) => {
            if ( err ) {  
                res.status(500).send("Oh, something went wrong!");
            }

            // sort and return top 50
            ret.sort((a, b) => {
                return b.value - a.value;
            })

            // assign ranking
            let last_value = -1;
            let rank = 0;

            ret = ret.slice(0, 50).map((entry, index) => {
                if (last_value === -1) {
                    last_value = entry.value;
                } else if (entry.value < last_value) {
                    rank = index;
                    last_value = entry.value;
                }

                entry.set('rank', rank+1, {strict: false});
                return entry;
            })

            
            res.json(ret);

        });
    });
});


// get creators ranked by their aggregated downloads
app.post('/getCreators', (req, res, next) => {
    Creator.find({}).sort({ 'value.downloads' : -1}).limit(50).exec((err, docs) => {
        if (err) {
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

// get 30 mods that contain certain keywords
app.post('/getModsWithKeyword', (req, res, next) => {

    let startTime;
    let endTime;

    if(req.body.startTime === null || req.body.startTime.length === 0) {
        startTime = new Date("2000/01/01");
    }else {
        startTime = new Date(req.body.startTime);
    }

    if(req.body.endTime === null || req.body.endTime.length === 0) {
        endTime = new Date();
    }else {
        endTime = new Date(req.body.endTime);
    }

    var val = req.body.keyword;
    var query = {};
    query["keywords." + val] = {$exists : true};
    query["publish_date"] = {
        $gte: startTime,
        $lt: endTime,
    };

    Item.find(query).limit(30).exec((err, mods) => {if (err) {
            res.status(500).send("Oh uh, something went wrong");
        } else {            
            let totalDownloads = 0;
            let totalViews = 0;
            let totalMods = 0;
            mods.map((mod) => {
                totalDownloads = totalDownloads + mod.downloads;
                totalViews = totalViews + mod.views;
                totalMods = totalMods + 1;
            });
            res.json({mods : mods, totalDownloads : totalDownloads, totalViews : totalViews, totalMods : totalMods});
        }
    });
});


app.post('/topModsWithDownloads', (req, res, next) => {
    var startTime = new Date(req.body.startTime);
    var endTime =  new Date(req.body.endTime);
    

    var val = req.body.keyword;
    var query = {};
    query["publish_date"] = {
        $gte: startTime,
        $lt: endTime,
    };

    Item.find(query).sort({'downloads': -1}).limit(50).exec((err, mods) => {
        if (err) {
            
            res.status(500).send("Oh uh, something went wrong");
        } else {
            
            res_mods = mods.map((doc, index) => {
                doc.set('rank', index+1, {strict: false});
                return doc;
            });
            res.json(res_mods);
        }
    });
});

app.listen(3000, () => console.log('api server listening on port 3000!'));

