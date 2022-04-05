using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Enums;

namespace WebApi.models
{
  public class Pica
  {
    public string Ime { get; set; }
    public Velicine Velicina { get; set; }
    public double Cena { get; set; }
    public string Sastojci { get; set; }
  }
}
