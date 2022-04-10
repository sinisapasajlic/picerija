using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
  public class UserProfilController : ControllerBase
  {
    private UserManager<ApplicationUser> _userManager;

    public UserProfilController(UserManager<ApplicationUser> userManager)
    {
      _userManager = userManager;
    }


    [HttpGet]
    [Authorize]
    public async Task<Object> GetUserProfil()
    {
      string userId = User.Claims.First(c => c.Type == "UserId").Value;
      var user = await _userManager.FindByIdAsync(userId);
      return new
      {
        user.Ime,
        user.Prezime,
        user.Email,
        user.UserName,
        user.TipKorisnika
      }; 
    }
  }
}
