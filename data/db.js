
const config = require("../config");

//Sequelize ve mysql2 modülleri import edilir:
const Sequelize = require("sequelize");

//Sequelize nesnesi oluşturulur ve yapılandırması yapılır. 
//Bu, veritabanı adı, kullanıcı adı, parola, dialect (MySQL), ve host bilgilerini kullanarak bir Sequelize bağlantısı oluşturur:
const sequelize = new Sequelize(config.db.database,config.db.user,config.db.password,{
    dialect:"mysql",
    host: config.db.host,
    define:{
        timestamps:false
    },
    storage:"./session.mysql",
});

//"connect" adında bir asenkron işlev tanımlanır. 
//Bu işlev, Sequelize bağlantısının doğrulanması için "sequelize.authenticate()" işlevini kullanır ve başarılı olması durumunda bir bağlantı mesajı yazdırır. 
//Hata durumunda ise hatayı konsola yazdırır:
async function connect(){
try{
    await sequelize.authenticate();
    console.log("mysql server bağlantısı yapıldı.")
}
catch(err){
    console.log(err)
}
}

//"connect" işlevi çağrılır, böylece MySQL veritabanı sunucusuna bağlantı sağlanır:
connect();

//Sequelize bağlantısının dışarıya aktarılması sağlanır
module.exports = sequelize;
