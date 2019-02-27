module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction', {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        label: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
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
