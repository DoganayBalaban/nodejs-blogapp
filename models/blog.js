//"sequelize" ve "DataTypes" modülleri import edilir:
const { DataTypes, } = require("sequelize");
const sequelize = require("../data/db");

//"Blog" adında bir Sequelize modeli tanımlanır. sequelize.define() işlevi kullanılarak modelin adı ve alanları belirtilir:
const Blog = sequelize.define("blog",{
    baslik:{
        type:DataTypes.STRING,
        allowNull: false
    },
    url:{
        type:DataTypes.STRING,
        allowNull: false
    },
    altbaslik:{
        type:DataTypes.STRING,
        allowNull:false
    },
    aciklama:{
        type:DataTypes.TEXT,
        allowNull: true
    },
    resim:{
        type:DataTypes.STRING,
        allowNull: false
    },
    anasayfa:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    },
    onay:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    timestamps : true
});

//"Blog" modelini dışarıya aktararak başka dosyalarda kullanılabilmesini sağlar:
module.exports = Blog;