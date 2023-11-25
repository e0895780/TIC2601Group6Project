const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const crmdatabase = require('./crmdatabase');

const router = express.Router()

router.route('/')
    .get((req, res) => {
        console.log('GET: /opportunity');

        crmdatabase.Opportunity.findAll().then((opportunities) => {
            res.send(opportunities);
        })
    }) 
    .put((req, res) => {
        console.log('PUT: /opportunity');
        var AccountAID = req.body.AccountAID;
        var Oid = req.body.Oid;
        var Oname = req.body.Oname;
        var Opartner = req.body.Opartner;
        var Odistributor = req.body.Odistributor;
        var Ostage = req.body.Ostage;
        var Oclosedate = req.body.Oclosedate;
        var Oamount = req.body.Oamount;

        crmdatabase.Opportunity.create({
            AccountAID: AccountAID, 
            Oid: Oid, 
            Oname: Oname, 
            Opartner: Opartner, 
            Odistributor: Odistributor, 
            Ostage: Ostage, 
            Oclosedate: Oclosedate, 
            Oamount: Oamount}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .post((req, res) => {
        console.log('POST: /opportunity');
        var AccountAID = req.body.AccountAID;

        var Oid = req.body.Oid;
        var Oname = req.body.Oname;
        var Opartner = req.body.Opartner;
        var Odistributor = req.body.Odistributor;
        var Ostage = req.body.Ostage;
        var Oclosedate = req.body.Oclosedate;
        var Oamount = req.body.Oamount;
        
        crmdatabase.Opportunity.findByPk(Oid).then((opportunity) => {
            if(opportunity === null) {
                res.sendStatus(400);
            }
            else {
                opportunity.Oname = Oname;
                opportunity.Opartner = Opartner;
                opportunity.Odistributor = Odistributor;
                opportunity.Ostage = Ostage;
                opportunity.Oclosedate = Oclosedate;
                opportunity.Oamount = Oamount;
                opportunity.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => {
        console.log('DELETE: /opportunity?Oid=' + req.query.Oid);

        var Oid = req.query.Oid;

        crmdatabase.Opportunity.findByPk(Oid).then((opportunity) => {
            if(opportunity === null) {
                res.sendStatus(400);
            }
            else {
                opportunity.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });

module.exports = router
