/**
 * Created by lema on 2018/2/13.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sims_test_db');

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
    publish_date: Date,
    downloads: Number,
    views: Number,
    favourited: Number,
    thanks: Number,
    comments: Number,
    description: String,
    url: String,
    tags: [String],
    types: [String],
}, { collection : 'sims_item_col' });

Item_Schema.set('toJSON', { getters: true, virtuals: false });

var Item = mongoose.model('Item', Item_Schema);

exports.Item = Item;
