//gerekli modüller, model dosyaları ve yardımcı fonksiyonlar import edilir:
const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

const imageUpload = require("../helpers/image-upload");

const adminController = require("../controllers/admin");

//"/blog/delete/:blogid" yönlendirici işlevi, belirtilen blog kimliğini alır ve ilgili blogu bulur.
//Eğer blog bulunursa, "admin/blog-delete" şablonunu render eder ve ilgili blogu vererek silme işlemi için onay sayfasını gösterir.
//Aksi takdirde, "/admin/blogs" sayfasına yönlendirme yapar:
router.get("/blog/delete/:blogid", isAuth, adminController.get_blog_delete);

//"/blog/delete/:blogid" POST yönlendirici işlevi, belirtilen blog kimliğini alır ve ilgili blogu bulur.
//Eğer blog bulunursa, destroy() fonksiyonunu kullanarak blogu veritabanından siler
//ve "/admin/blogs?action=delete" sayfasına yönlendirme yapar. Aksi takdirde, "/admin/blogs" sayfasına yönlendirme yapar:
router.post("/blog/delete/:blogid", isAuth, adminController.post_blog_delete);

//"/category/delete/:categoryid" yönlendirici işlevi, belirtilen kategori kimliğini alır ve ilgili kategoriyi bulur.
//Eğer kategori bulunursa, "admin/category-delete" şablonunu render eder
//ve ilgili kategoriyi vererek silme işlemi için onay sayfasını gösterir. Aksi takdirde, "/admin/categories" sayfasına yönlendirme yapar:
router.get(
  "/category/delete/:categoryid",
  isAuth,
  adminController.get_category_delete
);

//"/category/delete/:categoryid" POST yönlendirici işlevi, belirtilen kategori kimliğini alır ve ilgili kategoriyi veritabanından siler.
//Ardından, "/admin/category?action=delete" sayfasına yönlendirme yapar:
router.post(
  "/category/delete/:categoryid",
  isAuth,
  adminController.post_category_delete
);

//"/blog/create" yönlendirici işlevi, tüm kategorileri alır ve "admin/blog-create" şablonunu render eder,
//yeni bir blog eklemek için gereken verileri kullanarak sayfayı oluşturur:
router.get("/blog/create", isAuth, adminController.get_blog_create);

router.post("/categories/remove", isAuth, adminController.get_category_remove);

//"/blog/create" POST yönlendirici işlevi, kullanıcının gönderdiği verileri alır
//ve Blog.create() yöntemini kullanarak yeni bir blog oluşturur.
//Oluşturulan blogun kimliği ve eklenen eylem bilgisi ile "/admin/blogs?action=create" sayfasına yönlendirme yapar:
router.post(
  "/blog/create",
  imageUpload.upload.single("resim"),
  isAuth,
  adminController.post_blog_create
);

///category/create yolunda bir GET yönlendiricisi tanımlanır.
//Bu yönlendirici, yeni bir kategori eklemek için gereken verileri alarak kategori oluşturma sayfasını render eder:
router.get("/category/create", isAuth, adminController.get_category_create);

///category/create yolunda bir POST yönlendiricisi tanımlanır.
//Bu yönlendirici, kullanıcının gönderdiği verileri kullanarak yeni bir kategori oluşturur:
router.post("/category/create", isAuth, adminController.post_category_create);

//blogs/:blogid yolunda bir GET yönlendiricisi tanımlanır. Bu yönlendirici, belirtilen blog kimliğini alır ve ilgili blogu bulur.
//Blog bulunursa, "admin/blog-edit" şablonunu render eder ve ilgili blog verileriyle birlikte sayfayı oluşturur:
router.get("/blogs/:blogid", isAuth, adminController.get_blog_edit);

///blogs/:blogid yolunda bir POST yönlendiricisi tanımlanır.
//Bu yönlendirici, kullanıcının gönderdiği verileri kullanarak belirli bir blogu günceller:
router.post(
  "/blogs/:blogid",
  imageUpload.upload.single("resim"),
  isAuth,
  adminController.post_blog_edit
);

///categories/:categoryid yolunda bir GET yönlendiricisi tanımlanır.
//Bu yönlendirici, belirtilen kategori kimliğini alır ve ilgili kategoriyi bulur.
//Kategori bulunursa, "admin/category-edit" şablonunu render eder ve ilgili kategori verileriyle birlikte sayfayı oluşturu
router.get(
  "/categories/:categoryid",
  isAuth,
  adminController.get_category_edit
);

///categories/:categoryid yolunda bir POST yönlendiricisi tanımlanır.
//Bu yönlendirici, kullanıcının gönderdiği verileri kullanarak belirli bir kategoriyi günceller:
router.post("/categories/:categoryid");

///blogs yolunda bir GET yönlendiricisi tanımlanır.
//Bu yönlendirici, tüm blogları alır ve "admin/blog-list" şablonunu render eder, blog listesi ve işlem mesajlarıyla birlikte sayfayı oluşturur:
router.get("/blogs", isAuth, adminController.get_blogs);

///categories yolunda bir GET yönlendiricisi tanımlanır.
//Bu yönlendirici, tüm kategorileri alır ve "admin/category-list" şablonunu render eder,
//kategori listesi ve işlem mesajlarıyla birlikte sayfayı oluşturur:
router.get("/categories", isAuth, adminController.get_categories);

module.exports = router;
