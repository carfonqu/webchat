using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WCFServ
{
    public class Chat
    {
        public int IdChat {get;set;}
        public Cliente pObjCliente { get; set; }
        public Empleado pObjEmpleado { get; set; }
        private List<Mensaje> ListaMensajes = new List<Mensaje>();

       

        public void CargarMensaje(Mensaje pMensaje)
        {
            ListaMensajes.Add(pMensaje);
        }

  

        

  
    }
}
