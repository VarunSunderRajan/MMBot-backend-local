'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bot.hasMany(models.transaction, { foreignKey: "botId", onDelete: "cascade" })
      bot.belongsTo(models.user, { foreignKey: "userId" })
    }
  }
  bot.init({
    userId:DataTypes.INTEGER,
    token: DataTypes.STRING,
    isDeleted:DataTypes.BOOLEAN,
    isActive:DataTypes.BOOLEAN,
    botType: DataTypes.STRING,
    thresholdPrice:DataTypes.STRING,
    createdAt:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bot',
  });
  return bot;
};