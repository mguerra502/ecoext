module.exports = (sequelize, DataTypes) => {
    return sequelize.define('establishment_transaction', {
        establishment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        transaction_id: {
            type: DataTypes.INTEGER,
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
