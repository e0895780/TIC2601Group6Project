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

        var Oid = req.body.Oid;
        var Oname = req.body.Oname;
        var Oparter = req.body.Oparter;
        var Odistributor = req.body.Odistributor;
        var Ostage = req.body.Ostage;
        var Oclosedate = req.body.Oclosedate;
        var Oamount = req.body.Oamount;

        crmdatabase.Opportunity.create({Oid: Oid, Oname: Oname, Oparter: Oparter, Odistributor: Odistributor, Ostage: Ostage, Oclosedate: Oclosedate, Oamount: Oamount}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .post((req, res) => {
        console.log('POST: /opportunity');

        var Oid = req.body.Oid;
        var Oname = req.body.Oname;
        var Oparter = req.body.Oparter;
        var Odistributor = req.body.Odistributor;
        var Ostage = req.body.Ostage;
        var Oclosedate = req.body.Oclosedate;
        var Oamount = req.body.Oamount;
        
        crmdatabase.Opportunity.findByPk(Oid).then((oid) => {
            if(oid === null) {
                res.sendStatus(400);
            }
            else {
                oid.Oname = Oname;
                oid.Oparter = Oparter;
                oid.Odistributor = Odistributor;
                oid.Ostage = Ostage;
                oid.Oclosedate = Oclosedate;
                oid.Oamount = Oamount;
                oid.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => {
        console.log('DELETE: /opportunity?Oid=' + req.query.Oid);

        var Oid = req.query.Oid;

        crmdatabase.Opportunity.findByPk(Oid).then((oid) => {
            if(oid === null) {
                res.sendStatus(400);
            }
            else {
                oid.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });

    module.exports = router
