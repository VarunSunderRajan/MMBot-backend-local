'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, { foreignKey: "userId" })
      transaction.belongsTo(models.bot, { foreignKey: "botId" })
    }
  }
  transaction.init({
    userId:DataTypes.INTEGER,
    botId: DataTypes.INTEGER,
    amount:DataTypes.STRING,
    fee:DataTypes.STRING,
    type: DataTypes.STRING,
    hash: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};