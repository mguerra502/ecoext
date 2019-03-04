module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction_notifications', {
        notification_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: true
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
