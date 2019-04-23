module.exports = (sequelize, DataTypes) => {
return sequelize.define('account_purses', {
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    purse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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