module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        email : DataTypes.STRING,
        username : DataTypes.STRING,
        password : DataTypes.STRING,
        address : DataTypes.STRING
    });


    Users.associations = (models) =>{

    };

    return Users;
};