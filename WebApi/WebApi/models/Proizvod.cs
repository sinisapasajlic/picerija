using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.models
{
  public class Proizvod
  {
    public int ProizvodId { get; set; }
    public string Ime { get; set; }
    public string Velicina { get; set; }
    public double Cena { get; set; }
    public string Sastojci { get; set; }
  }
}
