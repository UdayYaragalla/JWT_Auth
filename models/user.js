'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        userId: {
            type: DataTypes.STRING,
            field: 'user_id'
        },
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        refreshToken: {
            type: DataTypes.STRING,
            field: 'refresh_token'
        }
    }, {
        sequelize,
        modelName: 'User',
        freezeTableName: true,
        timestamps: false,
        tableName: 'user_login'
    });
    return User;
};