// >>>>>>>>>>>>>>>>>>>>>>>> This JS file used for Generte, Read, update, delete in the database <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// create update account

const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const crmdatabase = require('./crmdatabase');

const router = express.Router()

router.route('/')

    // read all the data in the database
    .get((req,res) => {
        console.log('GET: /account');

        crmdatabase.Account.findAll().then((accounts) => {
            res.send(accounts);
        })
    })

    // generate new account 
    .put((req,res) => {
        console.log('PUT: /account');

        var AID = req.body.AID;
        var Aname = req.body.Aname;
        var Atype = req.body.Atype;

        crmdatabase.Account.create({AID: AID, Aname: Aname, Atype: Atype}).then(() => {
            res.sendStatus(200);
        }).catch(()=>{
            res.sendStatus(400);
        })
    })

    // update the account 
    .post((req, res) =>{
        console.log('POST: /account');

        var AID = req.body.AID;
        var Aname = req.body.Aname;
        var Atype = req.body.Atype;

        crmdatabase.Account.findByPk(AID).then((account) =>{
            if (account === null){
                res.sendStatus(404);
            }
            else{
                account.AID = AID;
                account.Aname = Aname;
                account.Atype = Atype;
                account.save().then(() =>{
                    res.sendStatus(200);
                })
            }
        })

    })

    // delete the account
    .delete((req, res) => {
        console.log('DELETE: /account?AID=' + req.query.AID);

        var AID = req.query.AID;

        models.Account.findByPk(AID).then((account) => {
            if (account === null) {
                res.sendStatus(404);
            }
            else {
                account.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router