using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularjsMvc.Models.EF;

namespace AngularjsMvc.Controllers
{
    public class UserController : Controller
    {
        private AngularjsMvcDbContext db = null;


        public UserController()
        {
            db = new AngularjsMvcDbContext();
        }
      [HttpGet]
      //[Route("/Index/Index")]
        public ActionResult Index()
        {
            var users = db.Users.ToList();
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Details( int id)
        {
            var user = db.Users.Find(id);
            return Json(user, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        //[Route("/Index/Ahmad")]
        public ActionResult Create(User user)
        {
            db.Users.Add(user);
            db.SaveChanges();
            return Json(null);

        }
        [HttpPost]
        public ActionResult Edit(User user)
        {
            db.Entry(user).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {

            var user = db.Users.Find(id);
            db.Users.Remove(user);
            db.SaveChanges();
            return Json(null);
        }

    }
}