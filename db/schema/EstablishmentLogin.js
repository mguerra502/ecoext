module.exports = (sequelize, DataTypes) => {
    return sequelize.define('establishment_login', {
        establishment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        password: {
            type: DataTypes.TEXT,
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
