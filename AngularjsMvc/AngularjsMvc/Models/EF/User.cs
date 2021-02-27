using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
 using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularjsMvc.Models.EF
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int  Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; } 
    }
}