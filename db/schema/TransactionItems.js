module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction_items', {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        product: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tax: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
        },
    }, {
        freezeTableName: true
    });
}
