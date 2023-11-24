const crmdatabase = require('./crmdatabase');

async function loadData() {
    crmdatabase.StageProbability.findByPk('Qualification').then((stageprobability1) => {
        if(stageprobability1 === null) {
            Promise.all([
                crmdatabase.StageProbability.create({stage:'Qualification', probability:'10'}),
                crmdatabase.StageProbability.create({stage:'Needs Analysis', probability:'35'}),
                crmdatabase.StageProbability.create({stage:'Proposal', probability:'75'}),
                crmdatabase.StageProbability.create({stage:'Negotiation', probability:'90'}),
                crmdatabase.StageProbability.create({stage:'Closed Won', probability:'100'}),
                crmdatabase.StageProbability.create({stage:'Closed Lost', probability:'0'}),
            ]).then((valArray) => {
                stageprobability1 = valArray[0];
                stageprobability2 = valArray[1];
                stageprobability3 = valArray[2];
                stageprobability4 = valArray[3];
                stageprobability5 = valArray[4];
                stageprobability6 = valArray[5];
            })
        }
    })
};

crmdatabase.sequelize.sync().then(() => {
    console.log('CRM Database Loaded');

    loadData().then(() => {
        console.log('Stage Probability Data Loaded')
    })
})



