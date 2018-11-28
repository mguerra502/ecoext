module.exports = (sequelize, DataTypes) => {
    return sequelize.define('account_notification', {

        account_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        notification_id: {
            type: DataTypes.INTEGER,
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
}
