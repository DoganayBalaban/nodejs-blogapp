// Express ve diğer modüller
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();
const csurf = require("csurf");
const path = require("path");

// Routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

// Custom modules
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const locals = require("./middlewares/locals");

// Template engine
app.set("view engine", "ejs");

// Models
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");
const Role = require("./models/role");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 gün
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);
app.use(csurf());
app.use(locals);

// Statik dosyalar
app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

// Routes kullanımı
app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes);

// İlişkiler
Blog.belongsTo(User, {
  foreignKey: {
    allowNull: true,
  },
});
User.hasMany(Blog);

Blog.belongsToMany(Category, { through: "blogCategories" });
Category.belongsToMany(Blog, { through: "blogCategories" });

Role.belongsToMany(User, { through: "userRoles" });
User.belongsToMany(Role, { through: "userRoles" });

// Sequelize sync ve dummy data
(async () => {
  // await sequelize.sync({ force: true });
  // await dummyData();
})();

// Uygulama belirtilen port (3000) üzerinden dinlemeye başlar
app.listen(3000, function () {
  console.log("listening on port 3000");
});
