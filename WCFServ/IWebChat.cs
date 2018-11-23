using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using System.Runtime.Serialization;

namespace WCFServ
{
    [ServiceContract]
    public interface IWebChat
    {
        [OperationContract]
        int CrearChat();

        [OperationContract]
        void CrearMensaje(int pIdChat, int pIdUsuario, String pTextoMensaje);

        [OperationContract]
        Chat ObtenerChat(int pIdChat);
       
    }
}
