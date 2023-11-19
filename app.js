const express = require('express');
const app = express();
const port = 3000;

const stageprobabilitydataInit = require('./stageprobabilitydataInit');

app.use(express.json())

const opportunity = require('./opportunity');
app.use('/opportunity', opportunity)

app.listen(port, function () {
    console.log(`Express app listening on port ${port}!`);
});