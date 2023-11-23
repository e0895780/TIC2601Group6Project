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
        console.log('GET: /contact');

        crmdatabase.Contacts.findAll().then((contacts) => {
            res.send(contacts);
        })
    })

    // generate new contact
    .put((req,res) => {
        console.log('PUT: /contact');
        var id = req.body.id;
        var AccountAID = req.body.AccountAID;
        var Cfname = req.body.Cfname;
        var CLname = req.body.CLname;
        var Caddress = req.body.Caddress;
        var Cemail = req.body.Cemail;
        var Cnumber = req.body.Cnumber;

        crmdatabase.Contacts.create({id:id,AccountAID:AccountAID,Cfname: Cfname,CLname:CLname,Caddress:Caddress,Cemail:Cemail,Cnumber:Cnumber}).then(() => {
            res.sendStatus(200);
        }).catch(()=>{
            res.sendStatus(400);
        })
    })

    // update the contact
    .post((req, res) =>{
        console.log('POST: /contact');
        var id = req.body.id;
        var AccountAID = req.body.AccountAID;
        var Cfname = req.body.Cfname;
        var CLname = req.body.CLname;
        var Caddress = req.body.Caddress;
        var Cemail = req.body.Cemail;
        var Cnumber = req.body.Cnumber;

        
        crmdatabase.Contacts.findByPk(id).then((contact) =>{
            if (contact === null){
                res.sendStatus(404);
            }
            else{
                
                contact.Cfname = Cfname;
                contact.CLname = CLname;
                contact.Caddress = Caddress;
                contact.Cemail = Cemail;
                contact.Cnumber = Cnumber;
                contact.save().then(() =>{
                    res.sendStatus(200);
                })
            }
        })

    })

    // delete the contact
    .delete((req, res) => {
        console.log('DELETE: /contact?Contactid=' + req.query.id);
    
        var id = req.query.id;  // Corrected from req.query.AccountId
    
        crmdatabase.Contacts.findByPk(id).then((contact) => {
            if (contact === null) {
                res.sendStatus(404);
            }
            else {
                contact.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });


module.exports = router