const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");

async function populate() {
  const count = await Category.count();

  if (count == 0) {
    // 1. Kullanıcıları oluştur
    const users = await User.bulkCreate([
      {
        fullname: "doganay",
        email: "dbalaban1907@gmail.com",
        password: await bcrypt.hash("13579", 10),
      },
      {
        fullname: "emir",
        email: "ebalaban1907@gmail.com",
        password: await bcrypt.hash("1234", 10),
      },
      {
        fullname: "guest",
        email: "guest@gmail.com",
        password: await bcrypt.hash("1234", 10),
      },
      {
        fullname: "moderator",
        email: "mod@gmail.com",
        password: await bcrypt.hash("1234", 10),
      },
    ]);

    // 2. Roller oluştur ve kullanıcılarla ilişkilendir
    const roles = await Role.bulkCreate([
      {
        rolename: "admin",
      },
      {
        rolename: "guest",
      },
      {
        rolename: "moderatör",
      },
    ]);

    await users[0].addRole(roles[0]); // doganay -> admin
    await users[1].addRole(roles[2]); // emir -> moderator
    await users[2].addRole(roles[1]); // guest -> guest
    await users[3].addRole(roles[2]); // moderator -> moderator

    // 3. Kategorileri oluştur
    const categories = await Category.bulkCreate([
      { name: "Mobil Geliştirme", url: slugField("Mobil Geliştirme") },
      { name: "Web Geliştirme", url: slugField("Web Geliştirme") },
      { name: "Programlama", url: slugField("Programlama") },
    ]);

    // 4. Blogları oluştur
    const blogs = await Blog.bulkCreate([
      {
        baslik: "Komple Uygulamalı Web Geliştirme",
        url: slugField("Komple Uygulamalı Web Geliştirme"),
        altbaslik: "lbalbal",
        aciklama: "lorem ",
        resim: "1.jpg",
        anasayfa: true,
        onay: true,
        userId: users[1].id,
      },
      {
        baslik: "Python Web Geliştirme",
        url: slugField("Python Web Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
        userId: users[3].id,
      },
      {
        baslik: "Mobil Web Geliştirme",
        url: slugField("Mobil Web Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
        userId: users[1].id,
      },
      // Diğer bloglar için de userId'leri doğru bir şekilde belirleyin
    ]);

    // 5. Kategorileri ve blogları ilişkilendir
    await categories[0].addBlog(blogs[0]);
    await categories[0].addBlog(blogs[1]);
    await categories[0].addBlog(blogs[2]);

    // Diğer ilişkilendirmeleri yap
  }
}

module.exports = populate;
