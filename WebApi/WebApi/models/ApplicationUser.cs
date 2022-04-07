using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.models
{
  public class ApplicationUser : IdentityUser
  {
    [Column(TypeName ="nvarchar(150)")]
    public string Ime { get; set; }
    [Column(TypeName = "nvarchar(150)")]
    public string Prezime { get; set; }

    public DateTime datumRodjenja { get; set; }
    [Column(TypeName = "nvarchar(150)")]
    public string Adresa { get; set; }
    public TipKorisnika TipKorisnika { get; set; }
    [Column(TypeName = "nvarchar(150)")]
    public string SlikaKorisnika { get; set; }
  }
}
