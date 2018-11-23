using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AplicacionEscritorio
{
    public partial class Form1 : Form
    {

        ServiceReference1.WebChatClient objGestor = new ServiceReference1.WebChatClient();
        ServiceReference1.Cliente objCliente = new ServiceReference1.Cliente();
        static ServiceReference1.Chat objChat = new ServiceReference1.Chat();
        
        
        int IdUsuario;
        int IdChatLocal;
        
        

       

        
       
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            
            TxtListadoMensajes.Text = TxtListadoMensajes.Text + "Usuario["+IdUsuario.ToString().PadLeft(10, '0')+"]: " + TxtMensaje.Text + "\r\n";
            objGestor.CrearMensaje(IdChatLocal, IdUsuario, TxtMensaje.Text);
            
            TxtMensaje.Text = String.Empty;
            
        }

        private void Form1_Load(object sender, EventArgs e)
        {

            IdChatLocal = objGestor.CrearChat();
            objChat = objGestor.ObtenerChat(IdChatLocal);
            objCliente = objChat.pObjCliente;
            IdUsuario = objCliente.IdCliente;
            //label1.Text = "Id_Usuario: " + IdUsuario.ToString();
            label1.Text = "Id_Usuario: " + IdUsuario.ToString().PadLeft(10, '0');
            label2.Text = "Chat#: " + IdChatLocal.ToString().PadLeft(5, '0');
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
          

        }
    }
}
