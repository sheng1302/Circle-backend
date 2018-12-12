const express = require('express');
const app = express();
const models = require('../models');
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const ORDERS_CONTROLLER = {
    registerRoute(){
        router.get('/:customer_id', this.index);
        router.get('/order_status/:item_id', this.mark);
        //router.get('/:id', this.show);
        router.post('/', this.create);
        router.put(':/id', this.update);
        router.delete('/:id', this.destroy);

        return router;
    },

    index(req,res){
        models.Orders.findAll({
            where: {
                customer_id: req.params.customer_id
            },
            include: [{
                model: models.Items,
            }]
        })
            .then((orders) => {
                res.json(orders);
            }); 
    },

    show(req,res){
        models.Orders.findById(req.params.id)
            .then((order) => {
                if(order == null){
                    res.status(404).json({message: "Order not found."});
                }else{
                    res.status(200).json({itemDetail: user, message: "order found"});
                }
            })
            .catch((err) => {
                res.status(500).json({message : err});
            })
    },

    create(req, res){
            models.Orders.create({
                item_id: req.body.item_id,
                customer_id: req.body.customer_id,
                pick_up_date: req.body.pick_up_date,
                description: req.body.description,
                order_status : req.body.order_status
            })
                .then((order)=>{
                    res.status(201).json({
                        message: "Your order is added"
                    });
                })
                .catch((err) => {
                    res.status(500).json({message: err});
                })
        
    },

    mark(req,res){
            models.Orders.update({
                order_status: 'Completed'
            }, {
                where: {
                    item_id: req.params.item_id
                }
            }).then((order)=>{
            res.status(201).json({
                message: "Order Completed"
            })
        })
                .catch(err => {
                    res.status(500).json(
                        {
                            message: "error occured"
                        }
                    )
                });
        
        },

    update(req,res){
        models.Orders.update({
            item_id: req.body.item_id,
            customer_id: req.body.customer_id,
            pick_up_date: req.body.pick_up_date,
            description: req.body.description,
            order_status : req.body.order_status 
        }, {
            where: {
                order_id: req.params.id
            },
        })
        .then((item)=>{
            res.status(200).json( { message : "Your information has been updated." });           
        })
        .catch(err=>{
            res.status(500).json( {message : "Unknown error occurred! Please try again later." });
        })
    },

    destroy(req,res){
        models.Order.destroy({
            where:{
                order_id: req.params.id
            }
        })
            .then((user)=>{
                res.status(200).json( { message : "Information has been destroyed." });
            })
            .catch((err)=>{
                res.status(500).json( {message : "Unknown error occurred! Please try again later." });
            })
    }
};

module.exports = ORDERS_CONTROLLER.registerRoute();