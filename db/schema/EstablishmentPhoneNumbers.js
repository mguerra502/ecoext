module.exports = (sequelize, DataTypes) => {
    return sequelize.define('establishment_phone_numbers', {
        establishment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        phone_number_id: {
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
