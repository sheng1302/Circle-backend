const express = require('express');
const models = require('../models');
const router = express.Router();

const UsersController = {
    registerRoute(){

        router.get('/',this.index);
        router.get('/:id',this.show);
        router.post('/', this.create);
        router.put('/:id', this.update);
        router.delete('/:id', this.destroy);

        return router
    },

    index(req, res) {
        models.Users.findAll()
            .then( (users) => {
                res.json(users);
            });

    },

    show(req, res){
        models.Users.findById(req.params.id)
            .then( (user) => {
                if(user === null){
                    res.status(404).json( {message : "User not found."});
                } else{
                    res.status(200).json( {userDetail : user,
                                        message : "User found" });
                }

            })
            .catch( (err) => {
                res.status(500).json({ message : err})
            })
    },

    create(req, res){

        console.log(req.body.email, req.body.username, req.body.password, req.body.address);
        if(req.body.email === undefined || req.body.username === undefined || req.body.password === undefined || req.body.address === undefined){

            res.status(400).json( {message : 'Inputs are invalid! Please make sure all information are completed correctly. ' } );
        } else{
            models.Users.create({
                email : req.body.email,
                username : req.body.username,
                password : req.body.password,
                address : req.body.address,
            })
                .then((user) => {
                    res.status(201).json( {message : "Your account has successfully created." });

                })
                .catch((err) => {
                    res.status(500).json( {message : "Unknown error occurred! Please try again later." });
                    console.log(err);
                })
        }

    },

    update(req, res){
        // This update function will update all body and params; Check nulls of all inputs ** or specify actions for each input.
        if(req.params.id === undefined){
            res.status(400).json( {message : 'Inputs are invalid! Please make sure all information are completed correctly. ' });
        } else{
            models.Users.update({
                email : req.body.email,
                username : req.body.username,
                password : req.body.password,
                address : req.body.address

                }, {
                where : {
                            id : req.params.id
                        },
                })
                .then((user) => {
                    res.status(200).json( { message : "Your information has been updated." });

                })
                .catch((err) => {
                    res.status(500).json( {message : "Unknown error occurred! Please try again later." });
                    console.log(err);
                })
        }
    },

    destroy(req, res){
        if(req.params.id === undefined){
            res.status(400).json( {message : 'Inputs are invalid! Please make sure all information are completed correctly. ' });
        } else{
            models.Users.destroy({
                where : {
                    id: req.params.id
                }
            })
                .then((user) => {
                    res.status(200).json( { message : "Information has been destroyed." });

                })
                .catch((err) => {
                    res.status(500).json( {message : "Unknown error occurred! Please try again later." });
                    console.log(err);
                })
        }
    }

};

module.exports = UsersController.registerRoute();