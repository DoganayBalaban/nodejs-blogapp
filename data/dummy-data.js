//İlk olarak, "Category" ve "Blog" modelleri import edilir:
const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");
const bcrypt = require("bcrypt");
const User = require("../models/user");
//populate adında bir asenkron işlev tanımlanır. Bu işlev, mevcut kategori ve blog sayısını kontrol eder.
//Eğer sayı 0 ise, başlangıç verilerini eklemek için bulkCreate ve create işlevlerini kullanır:
async function populate() {
  const count = await Category.count();

  if (count == 0) {
    const categories = await Category.bulkCreate([
      { name: "Mobil Geliştirme", url: slugField("Mobil Geliştirme") },
      { name: "Web Geliştirme", url: slugField("Web Geliştirme") },
      { name: "Programlama", url: slugField("Programlama") },
    ]);

    const blogs = await Blog.bulkCreate([
      {
        baslik: "Komple Uygulamalı Web Geliştirme",
        url: slugField("Komple Uygulamalı Web Geliştirme"),
        altbaslik: "lbalbal",
        aciklama: "lorem ",
        resim: "1.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Python Web Geliştirme",
        url: slugField("Python Web Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Mobil Web Geliştirme",
        url: slugField("Mobil Web Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Oyun Geliştirme",
        url: slugField("Oyun Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Oyun Geliştirme",
        url: slugField("Oyun Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Oyun Geliştirme",
        url: slugField("Oyun Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Oyun Geliştirme",
        url: slugField("Oyun Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Oyun Geliştirme",
        url: slugField("Oyun Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Oyun Geliştirme",
        url: slugField("Oyun Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
      {
        baslik: "Oyun Geliştirme",
        url: slugField("Oyun Geliştirme"),
        altbaslik: "lbalbalasfawgsa",
        aciklama: "loreafgasgwm ",
        resim: "2.jpg",
        anasayfa: true,
        onay: true,
      },
    ]);

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
    ]);

    await categories[0].addBlog(blogs[0]);
    await categories[0].addBlog(blogs[1]);
    await categories[0].addBlog(blogs[2]);
    await categories[0].addBlog(blogs[3]);
    await categories[0].addBlog(blogs[4]);
    await categories[0].addBlog(blogs[5]);
    await categories[0].addBlog(blogs[6]);
    await categories[1].addBlog(blogs[7]);
    await categories[1].addBlog(blogs[8]);

    await categories[1].addBlog(blogs[2]);
    await categories[1].addBlog(blogs[3]);

    await categories[2].addBlog(blogs[2]);
    await categories[2].addBlog(blogs[3]);

    await blogs[0].addCategory(categories[1]);
  }
}

//dışarıya aktarılır,
module.exports = populate;
