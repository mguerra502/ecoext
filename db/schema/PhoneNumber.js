module.exports = (sequelize, DataTypes) => {
    return sequelize.define('phone_number', {
        phone_number_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        number: {
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
