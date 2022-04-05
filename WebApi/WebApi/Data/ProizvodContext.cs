using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.models;

namespace WebApi.Data
{
  public class ProizvodContext : DbContext
  {
    public ProizvodContext(DbContextOptions<ProizvodContext> options) : base(options) { }

    public DbSet<Proizvod> Proizvodi { get; set; }
  }
}
