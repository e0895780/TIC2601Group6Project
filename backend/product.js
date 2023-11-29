// >>>>>>>>>>>>>>>>>>>>>>>> This JS file used for Generte, Read, update, delete in the database <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// create update product

const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const crmdatabase = require('./crmdatabase');

const router = express.Router()

router.route('/')

    // read all the data in the database
    .get((req, res) => {
        console.log('GET: /product');

        crmdatabase.Product.findAll().then((products) => {
            res.send(products);
        })
    })

    // generate new product 
    .put((req, res) => {
        console.log('PUT: /product');

        var PSKUID = req.body.PSKUID;
        var PDescription = req.body.PDescription;
        var PProductName = req.body.PProductName;
        var PBrand = req.body.PBrand;
        var PManufacturingDate = req.body.PManufacturingDate;
        var PExpireDate = req.body.PExpireDate;
        var PDimensionalWeight = req.body.PDimensionalWeight;
        var PCategory = req.body.PCategory;
        var PStockQuantity = req.body.PStockQuantity;
        var AccountAID = req.body.AccountAID;
        var QOrid = req.body.QOrid;
        var OId = req.body.OId;

        crmdatabase.Product.create({
            PSKUID: PSKUID,
            PDescription: PDescription,
            PProductName: PProductName,
            PBrand: PBrand,
            PManufacturingDate: PManufacturingDate,
            PExpireDate: PExpireDate,
            PDimensionalWeight: PDimensionalWeight,
            PCategory: PCategory,
            PStockQuantity: PStockQuantity,
            AccountAID: AccountAID,
            QOrid: QOrid,
            OId: OId
        }).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })

    // update the product 
    .post((req, res) => {
        console.log('POST: /product');

        var PSKUID = req.body.PSKUID;
        var PDescription = req.body.PDescription;
        var PProductName = req.body.PProductName;
        var PBrand = req.body.PBrand;
        var PManufacturingDate = req.body.PManufacturingDate;
        var PExpireDate = req.body.PExpireDate;
        var PDimensionalWeight = req.body.PDimensionalWeight;
        var PCategory = req.body.PCategory;
        var PStockQuantity = req.body.PStockQuantity;
        var AccountAID = req.body.AccountAID;
        var QOrid = req.body.QOrid;
        var OId = req.body.OId;

        crmdatabase.Product.findByPk(PSKUID).then((product) => {
            if (product === null) {
                res.sendStatus(404);
            }
            else {
                product.PSKUID = PSKUID;
                product.PDescription = PDescription;
                product.PProductName = PProductName;
                product.PBrand = PBrand;
                product.PManufacturingDate = PManufacturingDate;
                product.PExpireDate = PExpireDate;
                product.PDimensionalWeight = PDimensionalWeight;
                product.PCategory = PCategory;
                product.PStockQuantity = PStockQuantity;
                product.AccountAID = AccountAID;
                product.QOrid = QOrid;
                product.OId = OId;
                product.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })

    })

    // delete the product
    .delete((req, res) => {
        console.log('DELETE: /product?PSKUID=' + req.query.PSKUID);

        var PSKUID = req.query.PSKUID;

        crmdatabase.Product.findByPk(PSKUID).then((product) => {
            if (product === null) {
                res.sendStatus(404);
            }
            else {
                product.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });




module.exports = router