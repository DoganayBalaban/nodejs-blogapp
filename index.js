//express
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//node modules
const path = require("path");

//routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

//custom modules
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const locals = require("./middlewares/locals");
//template engine
//Express uygulamasının "ejs" şablon motorunu kullanacağı belirtilir:
app.set("view engine", "ejs");

//models
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1gün 1000 milisecond
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);
app.use(locals);
//statik dosyaların bulunacağı dizinlerin tanımlanması yapılır.
//"/libs" yoluyla node_modules klasörü ve "/static" yoluyla public klasörüne istemci tarafından erişilebilir:
app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

//"/admin" yoluna gelen isteklerin yönlendirilmesi için "adminRoutes" dosyası kullanılır.
//Diğer tüm istekler ise "userRoutes" dosyasına yönlendirilir:
app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes);

//Sequelize kütüphanesini kullanarak bir veritabanı bağlantısı oluşturulur.
//Ardından, "dummyData" fonksiyonu aracılığıyla veritabanında bazı örnek veriler oluşturulur:

//ilişkiler
Blog.belongsTo(User, {
  foreignKey: {
    allowNull: true,
  },
});
User.hasMany(Blog);

Blog.belongsToMany(Category, { through: "blogCategories" });
Category.belongsToMany(Blog, { through: "blogCategories" });

//uygulanması

//IIFE
(async () => {
  //   await sequelize.sync({ force: true });
  //   await dummyData();
})();

//uygulama belirtilen port (3000) üzerinden dinlemeye başlar:
app.listen(3000, function () {
  console.log("listening on port 3000");
});
