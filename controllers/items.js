const express = require('express');
const app = express();
const models = require('../models');
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const ITEMS_CONTROLLER = {
    registerRoute(){
        router.get('/', this.index);
        router.get('/:id', this.show);
        router.post('/', this.create);
        router.put(':/id', this.update);
        router.delete('/:id', this.destroy);

        return router;
    },

    index(req,res){
        models.Items.findAll()
            .then((items) => {
                res.json(items);
            }); 
    },

    show(req,res){
        models.Items.findById(req.params.id)
            .then((item) => {
                if(item == null){
                    res.status(404).json({message: "Item not found."});
                }else{
                    res.status(200).json({itemDetail: user, message: "item found"});
                }
            })
            .catch((err) => {
                res.status(500).json({message : err});
            })
    },

    create(req, res){
            models.Items.create({
                owner_id: req.body.owner_id,
                category: req.body.category,
                description: req.body.description,
                pick_up_address: req.body.pick_up_address,
                reserved_status : req.body.reserved_status   
            })
                .then((item)=>{
                    res.status(201).json({
                        message: "Your item is added"
                    });
                })
                .catch((err) => {
                    res.status(500).json({message: err});
                })
        
    },

    update(req,res){
        models.Items.update({
            owner_id: req.body.owner_id,
            category: req.body.category,
            description: req.body.description,
            pick_up_address: req.body.pick_up_address,
            reserved_status : req.body.reserved_status   
        }, {
            where: {
                item_id: req.params.id
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
        models.Items.destroy({
            where:{
                item_id: req.params.id
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

module.exports = ITEMS_CONTROLLER.registerRoute();