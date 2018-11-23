module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('Items', {
        item_id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        owner_id: DataTypes.UUID,
        category: DataTypes.STRING,
        description: DataTypes.STRING,
        pick_up_address: DataTypes.STRING,
        reserved_status : DataTypes.BOOLEAN     
    });

    Items.associations = (models) =>{
        Items.hasOne(models.Orders, {
            foreignKey: 'item_id',
            as: 'item_id'
        });
    };



    return Items;
};