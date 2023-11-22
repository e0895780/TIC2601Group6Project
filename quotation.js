const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const router = express.Router()
const crmdatabase = new sqlite3.Database('./crmdatabase')



router.route('/')
    // Handle GET request for retrieving quotations
    .get((req, res) => {
        console.log('GET: /quotation');

        crmdatabase.quotation.findAll().then((quotation) => {
            res.send(quotation);
        })
    })

    // Handle PUT request for creating new quotations
    .put((req, res) => {
        console.log('PUT: /quotation');

        var OrderID = req.body.OrderID;
        var ProductName = req.body.ProductName;
        var Client = req.body.Client;
        var Price = req.body.Price;
        var Quantity = req.body.Quantity;
        var Discount = req.body.Discount;
        var DealPrice = req.body.DealPrice;
        var TotalPrice = req.body.TotalPrice;
        var OrderDate = req.body.OrderDate;
        var Status = req.body.Status;

        crmdatabase.quotation.create({OrderID: OrderID, ProductName: ProductName, Client: Client, Price: Price, Quantity: Quantity, 
            Discount: Discount, DealPrice: DealPrice, TotalPrice: TotalPrice, OrderDate: OrderDate, Status: Status}).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    // Handle POST request for updating quotations, DealPrice and Totalprice are calculated based on quantity, hence, no need to update manually.
    .post((req, res) => {
        console.log('POST: /quotation');

        var OrderID = req.body.OrderID;
        var ProductName = req.body.ProductName;
        var Client = req.body.Client;
        var Price = req.body.Price;
        var Quantity = req.body.Quantity;
        var Discount = req.body.Discount;
        var OrderDate = req.body.OrderDate;
        var Status = req.body.Status;

        crmdatabase.quotation.findByPk(OrderID).then((quotation) => {
            if(quotation === null) {
                res.sendStatus(400);
            }
            else {
                quotation.ProductName = ProductName;
                quotation.Client = Client;
                quotation.Price = Price;
                quotation.Quantity = Quantity;
                quotation.Discount = Discount;
                quotation.Price = OrderDate;
                quotation.Quantity = Status;
                quotation.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    
    // Handle DELETE request for deleting quotations
    .delete((req, res) => {
        console.log('DELETE: /quotaion?OrderID=' + req.query.OrderID);

        var OrderID = req.query.OrderID;

        crmdatabase.quotation.findByPk(OrderID).then((quotation) => {
            if(quotation === null) {
                res.sendStatus(400);
            }
            else {
                quotation.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });



module.exports = router
