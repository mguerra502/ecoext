module.exports = (sequelize, DataTypes) => {
    return sequelize.define('keys', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        key_aes: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        key_iv: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ipv4: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        port: {
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
