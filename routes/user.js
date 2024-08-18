//gerekli modüller ve model dosyaları import edilir:
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user")




//Kullanıcı rotası, "/blogs/category/:categoryid" yoluna sahip bir GET yönlendiricisi tanımlar. 
//Bu yönlendirici, belirli bir kategoriye ait blogları getirir:
router.use("/blogs/category/:slug",userController.blog_list);

///blogs/:blogid" ve "/blogs" yönlendiricileri belirlenir. "/blogs/:blogid" yönlendirici, belirtilen blog kimliğine sahip bir blogu bulur 
//ve kullanıcı arayüzüne render eder. "/blogs" yönlendirici ise tüm blogları getirir ve kullanıcı arayüzüne render eder:
router.use("/blogs/:slug",userController.blogs_details);

router.use("/blogs", userController.blog_list);

//kök dizine ("/") GET isteği yapıldığında çalışacak olan yönlendirici tanımlanır. 
//Bu yönlendirici, anasayfada gösterilmek üzere belirli blogları bulur ve kullanıcı arayüzüne render eder:
router.use("/",userController.blog_index);
 
module.exports = router;