using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.models
{
  public class KorisnikRegistracija
  {
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Ime { get; set; }
    public string Prezime { get; set; }
    public string Adresa { get; set; }
    public DateTime datumRodjenja { get; set; }
    public string TipKorisnika { get; set; }
    public string SlikaKorisnika { get; set; }
  }
}
