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
        type: DataTypes.STRING,
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
            isIn: [['Pipeline', 'Best Case', 'Commit', 'Closed Won', 'Closed Lost']]
        }
    },
    Oclosedate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            customValidator(value) {
                if(new Data(value <= new Date())) {
                    throw new Error("Invalid Opportunity Close Date")
                }
            }
        }
    },
    OAmount: {
        type: DataTypes.FLOAT(11,2),
        allowNull: true,
        validate: {
            isGreaterThanZero(value) {
                if(parseFloat(value) < 0) {
                    throw new Error('Opportunity Amount must be 0 or more');
                }
            }
        }  
    },
}, {
    freezeTableName: true
});

//Denny StageProability Model (table), for auto populating of probability when stage is chosen

const StageProbability = sequelize.define('StageProbability', {
    stage: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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


sequelize.sync()

console.log(Account);

module.exports = {sequelize, Account, Contacts, Opportunity, StageProbability};