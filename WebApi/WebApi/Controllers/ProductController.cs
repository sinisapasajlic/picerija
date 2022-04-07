using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.models;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProizvodController : Controller
  {
    private readonly ProizvodContext _context;
    public ProizvodController(ProizvodContext context)
    {
      _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Proizvod>>> GetProizvodi()
    {
      return await _context.Proizvodi.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Proizvod>> GetProizvodi(int id)
    {
      var proizvodi = await _context.Proizvodi.FindAsync(id);
      if (proizvodi == null)
      {
        return NotFound();
      }
      return proizvodi;
    }
    [HttpPatch]
    [Route("UpdateProizvod")]
    public async Task<IActionResult> UpdateProizvod([FromBody] Proizvod proizvod)
    {
      _context.Entry(proizvod).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ProizvodExists(proizvod.ProizvodId))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }
      return NoContent();
    }
    [HttpPost]
    [Route("AddProizvod")]
    public async Task<ActionResult<Proizvod>> AddProizvod([FromBody] Pica pica)
    {
      Console.WriteLine(pica);
      var proizvod = new Proizvod()
      {
        Ime = pica.Ime,
        Velicina = pica.Velicina,
        Cena = pica.Cena,
        Sastojci = pica.Sastojci
      };

      _context.Proizvodi.Add(proizvod);
      await _context.SaveChangesAsync();
      return CreatedAtAction("GetProizvodi", new { id = proizvod.ProizvodId }, proizvod);
    }
    [HttpDelete]
    [Route("DeleteProizvod/{id}")]
    public async Task<ActionResult<Proizvod>> DeleteProizvod(int id)
    {
      var proizvodi = await _context.Proizvodi.FindAsync(id);
      if (proizvodi == null)
      {
        return NotFound();
      }
      _context.Proizvodi.Remove(proizvodi);
      await _context.SaveChangesAsync();
      return proizvodi;
    }
    private bool ProizvodExists(int id)
    {
      return _context.Proizvodi.Any(e => e.ProizvodId == id);
    }
  }
  }
