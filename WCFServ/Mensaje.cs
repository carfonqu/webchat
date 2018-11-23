using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WCFServ
{
    public class Mensaje
    {
        public int IdUsuario { get; set; }
        public String TextoMensaje { get; set; }
        public int Leido {get;set;}        
        public DateTime Fecha { get; set; }
    }
}
