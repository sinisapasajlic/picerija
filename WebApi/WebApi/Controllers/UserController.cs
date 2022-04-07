using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.models;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : Controller
  {
    private UserManager<ApplicationUser> _userManager;
    private SignInManager<ApplicationUser> _singInManager;

    public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
      _userManager = userManager;
      _singInManager = signInManager;
    }
    [HttpPost]
    [Route("Register")]
    public async Task<Object> RegistrujKorisnika(KorisnikRegistracija korisnik)
    {
      var applicationUser = new ApplicationUser()
      {
        UserName = korisnik.UserName,
        Email = korisnik.Email,
        Ime = korisnik.Ime,
        Prezime = korisnik.Prezime,
        datumRodjenja = korisnik.datumRodjenja,
        SlikaKorisnika = korisnik.SlikaKorisnika,
        TipKorisnika = korisnik.TipKorisnika,
        Adresa = korisnik.Adresa
      };
      try
      {
        var result =await  _userManager.CreateAsync(applicationUser, korisnik.Password);
        return Ok(result);
      }
      catch (Exception ex)
      {

        throw ex;
      }
    }

  }
}
