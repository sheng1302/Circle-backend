module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('Items', {
        item_id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        owner_id: DataTypes.STRING,
        category: DataTypes.STRING,
        description: DataTypes.STRING,
        pick_up_address: DataTypes.STRING,
        reserved_status : DataTypes.BOOLEAN     
    });

    Items.associations = (models) =>{

    };



    return Items;
};