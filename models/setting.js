'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      setting.belongsTo(models.user, { foreignKey: "userId" })
    }
  }
  setting.init({
    userId:DataTypes.INTEGER,
    tradeAmount: DataTypes.STRING,
    limitOrders:DataTypes.STRING,
    sellProfit:DataTypes.STRING,
    stopLossAt: DataTypes.STRING,
    wallet: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'setting',
  });
  return setting;
};