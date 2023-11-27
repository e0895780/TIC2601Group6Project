const express = require('express');
const cors = require('cors')
const app = express();
const port = 3001;

// unable to start backend with line 7 on
// const stageprobabilitydataInit = require('./stageprobabilitydataInit');

app.use(cors())
app.use(express.json())


const opportunity = require('./opportunity');
app.use('/opportunity', opportunity)

const account = require('./account');
app.use('/account', account)

const contact = require('./contact');
app.use('/contact', contact)

const quotation = require('./quotation');
app.use('/quotation', contact)

app.listen(port, function () {
    console.log(`Express app listening on port ${port}!`);
});