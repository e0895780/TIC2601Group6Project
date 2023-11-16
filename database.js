// For upload test

const { Sequelize, DataTypes } = require('sequelize');


// create different table 

const sequelize = new Sequelize(
    '', '', '',
    {
        dialect: 'sqlite',
        storage: './database/database.db'
    }
);

// studnet model (table)
const Student = sequelize.define('Student', {

    studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    studentName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// programme model (table)
const Programme = sequelize.define('Programme', {

    programmeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    programmeName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// courses model (table)
const Course = sequelize.define('Course', {

    courseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    courseCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});



sequelize.sync()

console.log(Student);
