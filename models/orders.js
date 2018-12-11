module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders', {
        order_id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        item_id: DataTypes.UUID,
        customer_id: DataTypes.UUID,
        pick_up_date: DataTypes.DATE,
        description: DataTypes.STRING,
        order_status : DataTypes.STRING     
    });

    Orders.associate = (models)=> {
        Orders.belongsTo(models.Items, {
            foreignKey: 'item_id',
        })
    }


    return Orders;
};