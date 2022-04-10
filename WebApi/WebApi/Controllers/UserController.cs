using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.models;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : Controller
  {
    private UserManager<ApplicationUser> _userManager;
    private SignInManager<ApplicationUser> _signInManager;
    private readonly ApplicationSettings _appSettings;

    public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _appSettings = appSettings.Value;
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
        
        Adresa = korisnik.Adresa
      };
      try
      {
        var result = await _userManager.CreateAsync(applicationUser, korisnik.Password);
        await _userManager.AddToRoleAsync(applicationUser, korisnik.TipKorisnika);
        return Ok(result);
      }
      catch (Exception ex)
      {

        throw ex;
      }
    }
    [HttpPost]
    [Route("Login")]

    public async Task<IActionResult> Prijava(ModelPrijava model)
    {
      var user = await _userManager.FindByNameAsync(model.UserName);
      if (user != null)
      {

        var rola = await _userManager.GetRolesAsync(user);
        IdentityOptions _options = new IdentityOptions();
        if (await _userManager.CheckPasswordAsync(user, model.Password))
        {
          var tokenDescriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(
              new Claim[] {
                new Claim("UserId", user.Id.ToString()),
                new Claim(_options.ClaimsIdentity.RoleClaimType, rola.FirstOrDefault())
              }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(
              new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)),
              Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature)
          };

          var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
          var securityToken = tokenHandler.CreateToken(tokenDescriptor);
          var token = tokenHandler.WriteToken(securityToken);
          return Ok(new { token });
        }
        else
        {
          return BadRequest(new { message = "Niste unjeli ispravnu lozinku" });
        }
      }
      else
      { 
        return BadRequest(new { message= "Korisnicko ime ne postoji" });
      }
    }
    [HttpGet]
    [Authorize(Roles = "Admin")]
    [Route("SvePorudzbine")]
    public string SvePorudzbine()
    {
      return "Admin radi";
    }

  }
}
