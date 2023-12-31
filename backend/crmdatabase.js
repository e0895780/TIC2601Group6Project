const { Sequelize, DataTypes } = require('sequelize');

// create different table 
const sequelize = new Sequelize(
    '', '', '',
    {
        dialect: 'sqlite',
        storage: './backend/db/crmdatabase.db',
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

//JiaXing Quotation Model (table)
const Quotation = sequelize.define('Quotation', {

    OrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false  
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Client: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Active', 'Inactive']]
        },
    },
    OrderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    DealPrice: {
        type: DataTypes.INTEGER,
        get() {
            // Calculate the 'DealPrice' by multiplying 'Price' and 'Discount'
            return this.getDataValue('Price') * this.getDataValue('Discount');
        },
    },
    TotalPrice: {
        type: DataTypes.INTEGER,
        get() {
            // Calculate the 'TotalPrice' by multiplying 'DealPrice' and 'Quantity'
            return this.getDataValue('DealPrice') * this.getDataValue('Quantity');
        },
    },
}, {
    freezeTableName: true
});


// YG Product model (table)
const Product = sequelize.define('Product', {
    PSKUID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    PDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PProductName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PBrand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PManufacturingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    PExpireDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    PDimensionalWeight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    PCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PStockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
          }
    },
    AccountAID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    QOrid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    OId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});




// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<-----------------  Below this line is for association of each entity ------------------------------------>>>>>>>>>>>>>>>>>


// 1-N relationship for Account table and contact table
Account.hasMany(Contacts,{onDelete:'CASCADE'});
Contacts.belongsTo(Account,{onDelete:'CASCADE'});


Account.hasMany(Opportunity,{onDelete:'CASCADE'});
Opportunity.belongsTo(Account,{onDelete:'CASCADE'});

// Opportunity.belongsTo(StageProbability, {foreignKey: 'Ostage', targetKey: 'stage' });

// 1-N relationship for Oppotunity table ansd quotation table
Opportunity.hasMany(Quotation,{onDelete:'CASCADE'});
Quotation.belongsTo(Opportunity,{onDelete:'CASCADE'});

//1-N relationship for Quotation table and Product table, one product can have multiple quotationis
Product.hasMany(Quotation, {
    foreignKey: 'ProductName',
    onDelete: 'CASCADE'
});
Quotation.belongsTo(Product, {
    foreignKey: 'ProductName',
    onDelete: 'CASCADE'
});

// multiple products can be obtained by multiple accounts
Product.belongsToMany(Account, {through: 'ProductAccount'});
Account.belongsToMany(Product, {through: 'ProductAccount'});

// mulitple product could support multiple opportunities
Product.belongsToMany(Opportunity, {through: 'ProductOpportunity'});
Opportunity.belongsToMany(Product, {through: 'ProductOpportunity'});



sequelize.sync({force:true});

// console.log(Account);

module.exports = {sequelize, Account, Contacts, Opportunity, StageProbability, Quotation, Product};
