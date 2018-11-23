using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Threading.Tasks;

namespace WCFServicio
{
    public class WebChat : IWebChat
    {
        
              
       
        public static List<Chat> ListaChats = new List<Chat>();
        public Chat objChat; 
        static Cliente objCliente = new Cliente();
        public static int vgIdChat = 0;
        public static int vgIdCliente = 0;
        public static int vgIdEmpleado = 1000;


        

        public WebChat()
        {
            
            
        }

        public int CrearChat()
        {
            objChat = new Chat();
            vgIdCliente = vgIdCliente + 1;
            vgIdEmpleado = vgIdEmpleado + 1000;
            vgIdChat = vgIdChat + 1;
            objCliente.IdCliente = vgIdCliente;
            objChat.pObjCliente = objCliente;
            objChat.IdChat = vgIdChat;
            ListaChats.Add(objChat);
            return vgIdChat;
                      

        }

        public Chat ObtenerChat(int pIdChat)
        {

            foreach (Chat item in ListaChats)
            {
                if (item.IdChat == pIdChat)
                {
                    return item;
                }
                
            }

            return null;
        }


        

       

        public void CrearMensaje(int pIdChat,int pIdUsuario, String pTextoMensaje)
        {
            Mensaje objMensaje = new Mensaje();
            objMensaje.IdUsuario = pIdUsuario;
            objMensaje.TextoMensaje = pTextoMensaje;
            objMensaje.Leido = 0;
            objMensaje.Fecha = DateTime.Now;
            Chat vchat = ObtenerChat(pIdChat);
            vchat.CargarMensaje(objMensaje);
            

            

        }

    


    }
}
