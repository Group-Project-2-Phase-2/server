'use strict';
const {
  Model
} = require('sequelize');

const {hash} = require('../helpers/passwordHelper.js')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.Rooms,{
        foreignKey: 'UserIdA'
      })
      Users.hasOne(models.Rooms,{
        foreignKey: 'UserIdB'
      })
    }
  };
  Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username cant be empty'
        },
        notNull: {
          args: true,
          msg: 'Username cant be empty'
        }
      }
    },
    password: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate : (data,opt) => {
        data.password = hash(data.password)
      }
    },
    sequelize,
    modelName: 'Users',
  });
  return Users;
};