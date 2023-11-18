const { Sequelize, DataTypes } = require('sequelize');


// create different table 

const sequelize = new Sequelize(
    '', '', '',
    {
        dialect: 'sqlite',
        // remember to change file path according to you folder
        storage: './CRM_Database/CRM_database.db'
    }
);

// Account model (table)
const Account = sequelize.define('Account', {

    AID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Aname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Atype: {
        type: DataTypes.STRING,
        allowNull: false      
    }
}, {
    freezeTableName: true
});

// Contacts model (table)
const Contacts = sequelize.define('Contacts', {

    Cfname: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    CLname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Caddress: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    Cemail: {
        type: DataTypes.STRING,
        allowNull: false  
    }
}, {
    freezeTableName: true
});

//Denny Opportunity Model (table)
const Opportunity = sequelize.define('Opportunity', {

    Oid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false  
    },
    Oname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OParter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ODistributor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Ostage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']]
        },
    },
    Oclosedate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    OAmount: {
        type: DataTypes.FLOAT(11,2),
        allowNull: true,
    }
}, {
    freezeTableName: true
});

//Denny StageProability Model (table), for auto populating of probability when stage is chosen

const StageProbability = sequelize.define('StageProbability', {
    stage: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            isIn: [['Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']]
        }
    },
    probability: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
        }
    }
}, {
    freezeTableName: true
});

Opportunity.belongsTo(Account);
Account.hasMany(Opportunity);
StageProbability.belongsTo(Opportunity, { foreignKey: 'stage', targetKey: 'Ostage' });


//sequelize.sync()

console.log(Account);

module.exports = {sequelize, Account, Contacts, Opportunity};