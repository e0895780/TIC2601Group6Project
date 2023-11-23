const express = require('express');
const cors = require('cors')
const app = express();
const port = 3001;

const stageprobabilitydataInit = require('./stageprobabilitydataInit');

app.use(cors())
app.use(express.json())


const opportunity = require('./opportunity');
app.use('/opportunity', opportunity)

const account = require('./account');
app.use('/account', account)

const contact = require('./contact');
app.use('/contact', contact)

app.listen(port, function () {
    console.log(`Express app listening on port ${port}!`);
});