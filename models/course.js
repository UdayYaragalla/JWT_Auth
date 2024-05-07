'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Course.init({
        courseId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'course_id'
        },
        courseName: {
            type: DataTypes.STRING,
            field: 'course_name'
        },
        price: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Course',
        freezeTableName: true,
        timestamps: false,
        tableName: 'course'
    });
    return Course;
};