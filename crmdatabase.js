const { Sequelize, DataTypes } = require('sequelize');


// create different table 

const sequelize = new Sequelize(
    '', '', '',
    {
        dialect: 'sqlite',
        storage: './db/crmdatabase.db',
        logging: false
    }
);

// ZQ  Account model (table)
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

// ZQ Contacts model (table)
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
    },
    Cnumber: {
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
    Opartner: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Odistributor: {
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
        validate: {
            customValidator(value) {
                if(new Date(value) < new Date()) {
                    throw new Error("Estimated Close date cannot be past");
                }
            }
        },
    },
    Oamount: {
        type: DataTypes.FLOAT(11,2),
        allowNull: true,
        validate: {
            isNonNegative(value) {
                if(parseFloat(value) < 0) {
                    throw new Error("Amount should be positive");
                }
            }
        },
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
    },
    probability: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
        }
    }
}, {
    freezeTableName: true
});


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<-----------------  Below this line is for association of each entity ------------------------------------>>>>>>>>>>>>>>>>>


// 1-N relationship for Account table and contact table
Account.hasMany(Contacts);
Contacts.belongsTo(Account)




Opportunity.belongsTo(Account);
Account.hasMany(Opportunity);
Opportunity.belongsTo(StageProbability, {foreignKey: 'Ostage', targetKey: 'stage' });



//sequelize.sync()

// console.log(Account);

module.exports = {sequelize, Account, Contacts, Opportunity, StageProbability};