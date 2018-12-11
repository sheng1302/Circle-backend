module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('Items', {
        item_id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        item_pic_url: DataTypes.STRING,
        item_pic_id: DataTypes.STRING,
        owner_id: DataTypes.UUID,
        category: DataTypes.STRING,
        description: DataTypes.STRING,
        pick_up_address: DataTypes.STRING,
        reserved_status : DataTypes.BOOLEAN     
    });

    Items.associate = function(models){
        Items.hasMany(models.Orders, {
            foreignKey: 'item_id',
            as: 'orderd_item_id',
        });
    };



    return Items;
};