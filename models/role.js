//"sequelize" ve "DataTypes" modülleri import edilir:
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

//"Category" adında bir Sequelize modeli tanımlanır. sequelize.define() işlevi kullanılarak modelin adı ve alanları belirtilir:
const Role = sequelize.define("role", {
  rolename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//"Category" modelini dışarıya aktararak başka dosyalarda kullanılabilmesini sağlar:
module.exports = Role;
