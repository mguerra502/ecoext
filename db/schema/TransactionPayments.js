module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction_payment', {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        payment_type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        paid: {
            type: DataTypes.DOUBLE,
            primaryKey: true
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
};