const express = require('express');
const app = express();


app.use('/', express.static(__dirname + '/dist'));

app.listen(9000, () => console.log('dbserver listening on port 9000!'));

