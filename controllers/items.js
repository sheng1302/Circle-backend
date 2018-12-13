const express = require('express');
const app = express();
const models = require('../models');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

app.use(bodyParser.urlencoded({
    extended: true
}));

cloudinary.config({
    cloud_name: 'dtcnv504w',
    api_key: 236429391513196,
    api_secret: '-6OODlF1he-3mLV8O9aKbEp11O4',
    });

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "circle",
    allowedFormats: ["jpg", "png", "gif"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
    
const parser = multer({ storage: storage });

app.use(bodyParser.json());

const ITEMS_CONTROLLER = {
    registerRoute(){
        router.get('/', this.index);
        router.get('/:id', this.show);
        router.post('/', parser.single("image"), this.create);
        router.put(':/id', this.update);
        router.put('/reserve/:id', this.reserve);
        router.delete('/:id', this.destroy);

        return router;
    },

    index(req,res){
        models.Items.findAll({
            where : {
                reserved_status: false,
            },
            include: {
                model: models.Users,
            }
        })
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
                reserved_status : req.body.reserved_status,
                item_pic_url : req.file.url,
                item_pic_id: req.file.public_id
            })
                .then((item)=>{
                    res.status(201).json({
                        message: `Item has been added to the pick-up queue. Once your item is being reserved, you will be notified from one of the non-profit organizations to pick up your item.`
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

    reserve(req,res){
        models.Items.update({
            reserved_status: true
        }, {
            where: {
                item_id: req.params.id
            }
        })
            .catch(err => {
                res.status(500).json(
                    {
                        message: "error occured"
                    }
                )
            });


        models.Orders.create({
            item_id: req.body.item_id,
            customer_id: req.body.customer_id,
            pick_up_date: req.body.pick_up_date,
            description: req.body.description,
            order_status : req.body.order_status
        })
            .then((order)=>{
                console.log("hi" + order.customer_id);
                res.status(201).json({
                    message: "Your order is added"
                });
            })
            .catch((err) => {
                res.status(500).json({message: err});
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