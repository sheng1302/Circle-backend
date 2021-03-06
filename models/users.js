const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        email : {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true, // sequelize validation
            },
        },
        username : {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        password_hash :{
            type: DataTypes.STRING,
        },
        address : {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        user_type : {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        }
    });


    // this is a Sequelize lifecycle hook
    Users.beforeCreate((user) =>
        new sequelize.Promise((resolve) => {
            bcrypt.hash(user.password_hash, null, null, (err, hashedPassword) => {
                resolve(hashedPassword);
            });
        }).then((hashedPw) => {
            user.password_hash = hashedPw;
        })
    );

    Users.associate = function(models){
        Users.hasMany(models.Items, {
            foreignKey: 'owner_id',
            as: 'owner_id',
        });

        Users.hasMany(models.Orders, {
            foreignKey: 'customer_id',
            as: 'customer_id',
        });
    };

    return Users;
};