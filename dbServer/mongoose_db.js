/**
 * Created by lema on 2018/2/13.
 */
const mongoose = require('mongoose');
const user_info = require('./user_credential.js');

const local_rul = 'mongodb://localhost:27017/sims_test_db';
const local_collection = 'sims_records_test';

const uri = 'mongodb://35.230.97.158:27017/sims_test_db';
const options = user_info.options;

// mongoose.connect(uri, options);

mongoose.connect(uri, options);

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to DB");
});

var Item_Schema = new Schema({

    title: String,
    artist: String,
    artist_url: String,
    category: String,
    game_version: String,
    publish_date: Date,
    preview_image: String,
    pack_requirement: [Array],
    comments_cnt: Number,
    views: Number,
    thanks: Number,
    favourited: Number,
    downloads: Number,
    comments: [String],
    description: String,
    url: String,
    tags: [String],
    types: [String],
    files: [Object],
    time_series_data: [Object]

}, { collection : local_collection});

Item_Schema.set('toJSON', { getters: true, virtuals: false });

var Item = mongoose.model('Item', Item_Schema);

exports.Item = Item;
