//var estado = 0;
//var idchat = 0;
//var estadochat = 0;
//var nombreUsu = "";
//var nombre = "";
//var telefono = "";
//var email = "";
var timer = null;
var expandido = 0;
var conMsj = 0;


if (typeof (Storage) !== "undefined") {
    if (!sessionStorage.rutaWCF) {
        //sessionStorage.rutaWCF = "http://cgonzalez7684-001-site2.smarterasp.net/chat/Service1.svc/";
        sessionStorage.rutaWCF = "http://172.16.7.14/wcfChat/Service1.svc/";
    }

    if (!sessionStorage.rutaFiles) {

        sessionStorage.rutaFiles = "http://172.16.7.14/wcfChat/Files/";
    }

    if (!sessionStorage.dirIp) {
        $.getJSON("http://jsonip.com/?callback=?")
        .done(function (data) {
            sessionStorage.dirIp = data.ip;
        })
        .fail(function () {
            sessionStorage.dirIp = "";
        })
    }

    if (!sessionStorage.estado) {
        sessionStorage.estado = 0;
    }

    if (!sessionStorage.idchat) {
        sessionStorage.idchat = 0;
    }

    if (!sessionStorage.estadochat) {
        sessionStorage.estadochat = 0;
    }

    if (!sessionStorage.nombreUsu) {
        sessionStorage.nombreUsu = "";
    }

    if (!sessionStorage.nombre) {
        sessionStorage.nombre = "";
    }

    if (!sessionStorage.telefono) {
        sessionStorage.telefono = "";
    }

    if (!sessionStorage.email) {
        sessionStorage.email = "";
    }

    if (!sessionStorage.divMensajes) {
        sessionStorage.divMensajes = null;
    }

    if (sessionStorage.idchat > 0) {
        if (sessionStorage.divMensajes != null) {
            document.getElementById("history").innerHTML = sessionStorage.divMensajes;
        }
        timer = setInterval(function () { ValidaServicio(sessionStorage.idchat); }, 5000);
    }

} else {
    $('#titulo').html('Navegador no compatible.');
}






(function () {

    if (typeof (Storage) == "undefined") {
        return;
    }


    $('.chat-message-counter').hide();


    //$.ajax({
    //    type: "POST",
    //    url: "metodos.aspx/VerificarServicio",
    //    data: "",
    //    async: false,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (msg) {
    //        estadochat = msg.d;
    //    },
    //    error: function (e) {

    //        estadochat = 0;
    //    }
    //});

    $.ajax({
        type: "GET",
        url: sessionStorage.rutaWCF + "Obtenerservicio",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        crossDomain: true,
        success: function (msg) {
            sessionStorage.estadochat = msg;
            if (sessionStorage.estadochat == 0) {
                $('#titulo').html('CHAT NO DISPONIBLE');
                $("#datos").prop('disabled', true);
            } else {
                $('#titulo').html("CHAT EN LINEA");
                sessionStorage.estadochat = 0;
            }
        },
        error: function (e) {
            sessionStorage.estadochat = 0;
            $('#titulo').html('CHAT NO DISPONIBLE');
            $("#datos").prop('disabled', true);
        }
    });

    
    

  





    $('#live-chat header').on('click', function () {


        if (sessionStorage.estado == 0) {
            $('#login').slideToggle(300, 'swing');
        } else {
            $('#chat').slideToggle(300, 'swing');
        }

        if (expandido == 0) {
            $('.chat-message-counter').hide();
            $("#history").scrollTop($("#history")[0].scrollHeight);
            conMsj = 0;
            expandido = 1;
        } else {
            expandido = 0;
        }

        //$('.chat-message-counter').fadeToggle(300, 'swing');

    });

    $('.chat-close').on('click', function (e) {

        cerrar();
        e.preventDefault();
        $('#live-chat').fadeOut(300);

    });


    $('#datos').on('click', function (e) {

        sessionStorage.nombre = $('#nombre').val();
        sessionStorage.telefono = $('#telefono').val();
        sessionStorage.email = $('#email').val();
        valida = "";

        valida = ValidarDatos(sessionStorage.nombre, sessionStorage.email);
        if (valida != "") {
            $('#respuesta').text(valida);
            return
        }


        //$.ajax({
        //    type: "POST",
        //    url: "metodos.aspx/VerificarServicio",
        //    data: "",
        //    async: false,
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (msg) {
        //        estadochat = msg.d;
        //    },
        //    error: function (e) {
        //        $('#respuesta').html("Error de conexión intente nuevamente.");
        //        return;
        //    }
        //});

        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "Obtenerservicio",
            data: "",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                sessionStorage.estadochat = msg;
                if (sessionStorage.estadochat == 1) {
                    sessionStorage.estadochat = 0;
                    EstablecherChat(sessionStorage.nombre, sessionStorage.telefono, sessionStorage.email, sessionStorage.dirIp);
                    
                } else {
                    $('#respuesta').html("Chat no disponible, horario de atención: lunes a viernes de 8:00am a 5:00pm");
                }
            },
            error: function (e) {
                sessionStorage.estadochat = 0;
                $('#respuesta').html("Error de conexión intente nuevamente.");
                return;
            }
        });


    });




    $('#enviar').on('click', function (e) {



        var mensajeI = "";
        mensajeI = $('#mInterno').val();

        if (mensajeI.trim() == "") {
            return;
        }

        //$.ajax({
        //    type: "POST",
        //    url: "metodos.aspx/VerificarServicio",
        //    data: "",
        //    async: false,
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (msg) {
        //        estadochat = msg.d;
        //    },
        //    error: function (e) {
        //        $('#respuesta').html("Error de conexión intente nuevamente.");
        //        return;
        //    }
        //});
        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "Obtenerservicio",
            data: "",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                sessionStorage.estadochat = msg;
                if (sessionStorage.estadochat == 1) {
                    EnviarMensaje(sessionStorage.idchat, mensajeI)
                } else {
                    agregarMensaje("Se ha perdido la conexión con el agente. Por favor espere para ser atendido nuevamente", "SYSTEM ADMINISTRATOR", "../images/cone.png","","");
                }

                $('#mInterno').val("");
            },
            error: function (e) {
                sessionStorage.estadochat = 0;
                agregarMensaje("Se ha perdido la conexión con el agente. Por favor espere para ser atendido nuevamente", "SYSTEM ADMINISTRATOR", "../images/cone.png","","");
            }
        });

        

    });

    $('#enviar2').on('click', function (e) {
        cerrar();
    });


    $('#salir').on('click', function (e) {
        $("#datosC").css('display', 'none');
        $("#datosS").css('display', 'inline');
    });

    $('#cancelar').on('click', function (e) {
        $("#datosS").css('display', 'none');
        $("#datosC").css('display', 'inline');
    });


    $('#adjuntar').on('click', function (e) {
        document.getElementById('file').click();

        //agregarMensaje("", sessionStorage.nombre, "../images/cust.png", "http://cgonzalez7684-001-site2.smarterasp.net/chat/Files/html.png", "png")


    });

    $('#file').change(function () {
        var file = $('#file')[0].files[0]
        var ext = file.name.split('.').pop();
        ext = ext.toLowerCase();
        if (file) {

            if ((ext != "pdf") && (ext != "xls") && (ext != "doc") && (ext != "docx") && (ext != "xlsx") && (ext != "jpg") && (ext != "png")) {
                alert("Solo se permiten archivos word,excel,pdf,jpg");
                return
            }

            if (file.size > 5242880) {
                alert("El tamaño del archivo no debe sobrepasar los 5 MB");
                return;
            }


            $.ajax({
                url: sessionStorage.rutaWCF + 'UploadFile', // Dynamically uploads the files which is chosen.
                type: 'POST',
                beforeSend: function (request) {
                    request.setRequestHeader("nombre", file.name);
                    request.setRequestHeader("idChat", sessionStorage.idchat.toString())
                },
                data: file, // This would pass the file object with data
                cache: false,
                processData: false, // Don't process the files
                contentType: "application/octet-stream", // Setting content type to "application/octet-stream" as jQuery will tell the server its not query string. 
                success: function (data) {
                    obtenerAdjunto();
                },
                error: function (data) {
                    agregarMensaje("NO SE PUDO ENVIAR EL ARCHIVO:" + file.name + ". FAVOR INTENTE NUEVAMENTE.", "ADMINISTRADOR", "../images/cone.png", "", "");
                }
            });

            
        }
    });


})();




    function EstablecherChat(pnombre, ptelefono, pemail, pip) {
        var resultado = 0;
        //$.ajax({
        //    type: "POST",
        //    url: "metodos.aspx/EstablecherChat",
        //    async: false,
        //    data: "{'pNombre':'" + nombre + "', 'pTelefono':'" + telefono + "', 'pEmail':'" + email + "'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (pIdChat) {
        //        resultado = pIdChat.d;
        //    },
        //    error: function (e) {
        //        resultado = 0;
        //    }
        //});

        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "CrearChat",
            data: {pNombre:pnombre, pTelefono:ptelefono , pEmail:pemail, pIp:pip },
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                sessionStorage.idchat = msg;
                if (sessionStorage.idchat == 0) {
                    $('#respuesta').html("Error interno, intente nuevamente.");
                } else {
                    sessionStorage.estado = 1;
                    $('#login').slideToggle(300, 'swing');
                    $('#chat').slideToggle(300, 'swing');
                    $("#enviar").prop('disabled', true);
                    agregarMensaje("Gracias por Contactarnos. En segundos un agente se pondrá en contacto con usted", "ADMINISTRADOR", "../images/cone.png","","");
                    //setTimeout(ValidaServicio(idchat), 10000);
                    timer = setInterval(function () { ValidaServicio(sessionStorage.idchat); }, 5000);
                }
            },
            error: function (e) {
                sessionStorage.idchat = 0;
                $('#respuesta').html("Error de conexión intente nuevamente.");
            }
        });



    
    }

    function ValidarDatos(pnombre, pemail) {

        var resultado = ""
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (pnombre.length < 5) {
            resultado = "La longitud del nombre debe ser mayor a 5 caracteres";
            return resultado;
        }
        if (re.test(pemail) == false) {
            resultado = "Debe digitar una dirección de correo valida";
            return resultado;
        }
        return resultado;
    }

    function ValidaServicio(pidChat) {


        sessionStorage.estadochat = 0;
        //$.ajax({
        //    type: "POST",
        //    url: "metodos.aspx/VerificarServicioC",
        //    async: false,
        //    data: "{'pIdChat':" + idchat + ", 'pTipo':'E'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (est) {
        //        estadochat = est.d;
        //    },
        //    error: function (e) {
        //        estadochat = 0;
        //    }
        //});


        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "verificar_chat",
            data: { idChat: pidChat, pTipo: "E" },
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                sessionStorage.estadochat = msg;


                if (sessionStorage.estadochat == -1) {
                    clearInterval(timer);
                    sessionStorage.estadochat = 0;
                    sessionStorage.estado = 0;
                    sessionStorage.idchat = 0;
                    sessionStorage.nombreUsu = "";
                    sessionStorage.nombre = "";
                    sessionStorage.telefono = "";
                    sessionStorage.email = "";
                    timer = null;
                    sessionStorage.divMensajes = null;

                    $('#login').slideToggle(300, 'swing');
                    $('#chat').slideToggle(300, 'swing');
                    $("#datosS").css('display', 'none');
                    $("#datosC").css('display', 'inline');
                    document.getElementById("history").innerHTML = "";
                    document.getElementById("respuesta").innerHTML = "";

                    $('#nombre').val("");
                    $('#telefono').val("");
                    $('#email').val("");
                }


                if (sessionStorage.estadochat == 0) {
                    sessionStorage.nombreUsu == "";
                    $("#enviar").prop('disabled', true);
                }

                if (sessionStorage.estadochat > 0) {
                    if (sessionStorage.nombreUsu == "") {
                        $.ajax({
                            type: "GET",
                            url: sessionStorage.rutaWCF + "ObtenerNombre",
                            data: { pIdChat: sessionStorage.idchat, pTipo: "E" },
                            async: false,
                            contentType: "application/json; charset=utf-8",
                            dataType: "jsonp",
                            crossDomain: true,
                            success: function (msg) {
                                sessionStorage.nombreUsu = msg;
                            },
                            error: function (e) {
                                sessionStorage.nombreUsu = "";
                            }
                        });
                    }
                    $("#enviar").prop('disabled', false);
                    if (sessionStorage.estadochat == 2) {
                        $('#teclado').html(sessionStorage.nombreUsu + " escribiendo.");
                    } else {
                        $('#teclado').html("");
                    }
                    recibirMensaje(pidChat, "E");

                }
            },
            error: function (e) {
                sessionStorage.estadochat = 0;
                sessionStorage.nombreUsu == "";
                $("#enviar").prop('disabled', true);
            }
        });
        if (sessionStorage.estado != 1) {
            clearInterval(timer);
        }
    }


    function recibirMensaje(pidChat) {


        var mensaje = "";


        if (sessionStorage.estado == 0) {
            return;
        }

        if (sessionStorage.estadochat == 0) {
            return;
        }

        //$.ajax({
        //    type: "POST",
        //    url: "metodos.aspx/RecibirMensaje",
        //    async: false,
        //    data: "{'pIdChat':" + idchat + ", 'pTipo':'E'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (mens) {
        //        mensaje = mens.d;
        //    },
        //    error: function (e) {
        //        mensaje = "";
        //    }
        //});

        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "RecibirMensajes",
            data: { pIdChat: pidChat, pTipo: "E" },
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                mensaje = "";
                var resultado = eval(msg);
                $.each(resultado, function () {
                    mensaje = mensaje + this.TextoMensaje + " ";
                });

                if (mensaje != "") {
                    if (expandido == 0) {
                        conMsj = conMsj + 1;
                        $('.chat-message-counter').text(conMsj);
                        $('.chat-message-counter').show();
                    } else {
                        conMsj = 0;
                    }

                    agregarMensaje(mensaje, sessionStorage.nombreUsu, "../images/tec.png","","");
                }

            },
            error: function (e) {
                mensaje = "";
            }
        });
    }


    function EnviarMensaje(pidChat, pmensaje) {


        var estadoMe = 0;

        //$.ajax({
        //    type: "POST",
        //    url: "metodos.aspx/EnviarMensaje",
        //    async: false,
        //    data: "{'pIdChat':" + idchat + ", 'pTipo':'E' , 'pmensaje':'" + pmensaje + "'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (estM) {
        //        estadoMe = estM.d;
        //    },
        //    error: function (e) {
        //        estadoMe = 0;
        //    }
        //});

        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "CrearMensaje",
            data: {pIdChat:pidChat, pTipo:"I" , pTextoMensaje:pmensaje},
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                estadoMe = msg;
                if (estadoMe != 0) {
                    agregarMensaje(pmensaje, sessionStorage.nombre, "../images/cust.png","","");
                } else {
                    agregarMensaje("NO SE PUDO ENVIAR EL MENSAJE:" + pmensaje + ". FAVOR INTENTE NUEVAMENTE.", "ADMINISTRADOR", "../images/cone.png","","");
                }
            },
            error: function (e) {
                estadoMe = 0;
                agregarMensaje("NO SE PUDO ENVIAR EL MENSAJE:" + pmensaje + ". FAVOR INTENTE NUEVAMENTE.", "ADMINISTRADOR", "../images/cone.png", "", "");
            }

        });

   



    }

    function agregarMensaje(msj, nomUsuario, imagen, archivo, extension) {
        var d = new Date();
        var imgDoc;
        var DivDoc;
        var hrefDoc;
        var hrefDoc2;
        var imDoc;
        var brA;
        var DivA;

      


        if ((extension == "doc") || (extension == "docx")) {
            imgDoc = "../images/doc.png";
        }
        if ((extension == "xls") || (extension == "xlsx")) {
            imgDoc = "../images/xls.png";
        }
        if (extension == "pdf")  {
            imgDoc = "../images/pdf.png";
        }
        if ((extension == "jpg") || (extension == "png")) {
            imgDoc = archivo;
        }

        var fecha = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
        var DivC = document.createElement("DIV");
        DivC.className = "chat-message clearfix";

        var imgD = document.createElement("IMG");
        imgD.className ="chatImg"
        //imgD.src = '../images/tec.png';
        imgD.setAttribute("src", imagen);
        //imgD.width = "32px";
        //imgD.height = "32px";

        var DivI = document.createElement("DIV");
        DivI.className = "chat-message-content clearfix";

        var SpanI = document.createElement("SPAN");
        SpanI.className = "chat-time";
        SpanI.innerHTML = fecha;

        var Eh = document.createElement("H5");
        Eh.innerHTML = nomUsuario;

        var pMen = document.createElement("P");
        pMen.id = "parrafo";
        pMen.innerHTML = msj;


       


        var Ehr = document.createElement("HR");

        DivI.appendChild(SpanI);
        DivI.appendChild(Eh);


       
        //Agrego un div para almacenar los datos adjuntos
        if (extension != "") {
            DivDoc = document.createElement("DIV");
            DivDoc.style.marginTop = "20px";


            DivA = document.createElement("DIV");
            DivA.className = "doc_adjunto";


            DivCo1 = document.createElement("DIV");
            DivCo1.className = "link";
            DivCo2 = document.createElement("DIV");
            DivCo2.className = "link";

            hrefDoc = document.createElement("a");
            hrefDoc.href = sessionStorage.rutaFiles + archivo;
            hrefDoc.target = "_blank"
            hrefDoc.download = archivo.substring(archivo);

            imDoc = document.createElement("IMG");
            imDoc.className = "imgAdj";
            imDoc.setAttribute("src", imgDoc);

            //imDoc.width = "32";
            //imDoc.height = "32";

            hrefDoc.appendChild(imDoc);
            DivCo1.appendChild(hrefDoc);

            hrefDoc2 = document.createElement("a");
            hrefDoc2.href = sessionStorage.rutaFiles + archivo;
            hrefDoc2.innerHTML = archivo.substring(archivo);
            hrefDoc2.target = "_blank"
            hrefDoc2.download = archivo.substring(archivo);

            DivCo2.appendChild(hrefDoc2);
            


            DivA.appendChild(DivCo1);
            DivA.appendChild(DivCo2);

            DivDoc.appendChild(DivA);
            DivI.appendChild(DivDoc);
        } else {
            DivI.appendChild(pMen);
        }
        //FIN almacenar datos adjuntos.




        DivC.appendChild(imgD);
        DivC.appendChild(DivI);

        var divM = document.getElementById("history");
        divM.appendChild(DivC);
        divM.appendChild(Ehr);

        sessionStorage.divMensajes = document.getElementById("history").innerHTML;

        $("#history").scrollTop($("#history")[0].scrollHeight);
    }

    function ValidaTeclado(ptipo) {
        var estadoTe = 0;
        if (sessionStorage.estadochat == 0 || sessionStorage.estado == 0) {
            return
        }
        //$.ajax({
        //    type: "POST",
        //    url: "metodos.aspx/ValidarTeclado",
        //    async: false,
        //    data: "{'pIdChat':" + idchat + ",'ptipo':" + ptipo + "}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (estT) {
        //        estadoTe = estT.d;
        //    },
        //    error: function (e) {
        //        estadoTe = 0;
        //    }
        //});

        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "verificarteclado",
            data: { pIdChat: sessionStorage.idchat, pTipo: "I", pestado: ptipo },
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                estadoTe = msg;
            },
            error: function (e) {
                estadoTe = 0;
            }
        });
    
    }

    function obtenerAdjunto() {
        var ruta = "";
        var extension = "";

        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "ObtieneRuta",
            data: { pIdChat: sessionStorage.idchat},
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                ruta = msg;
                extension = ruta.split('.').pop();
                agregarMensaje("", sessionStorage.nombre, "../images/cust.png", ruta, extension.toLowerCase());
            },
            error: function (e) {
                
            }
        });
    }

    function cerrar() {
        var estadoSa = 0;

        var califica = $("input[name=rating]:checked").val();
        var comentario = $("#mCalifica").val();

        if (sessionStorage.idchat <= 0) {
            return;
        }


        $.ajax({
            type: "GET",
            url: sessionStorage.rutaWCF + "CerrarChat",
            data: { pidChat: sessionStorage.idchat, pCalifica: califica, pComentario: comentario },
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            crossDomain: true,
            success: function (msg) {
                estadoSa = msg;
                if (estadoSa != 0) {
                    clearInterval(timer);
                    sessionStorage.estadochat = 0;
                    sessionStorage.estado = 0;
                    sessionStorage.idchat = 0;
                    sessionStorage.nombreUsu = "";
                    sessionStorage.nombre = "";
                    sessionStorage.telefono = "";
                    sessionStorage.email = "";
                    timer = null;
                    sessionStorage.divMensajes = null;

                    $('#login').slideToggle(300, 'swing');
                    $('#chat').slideToggle(300, 'swing');
                    $("#datosS").css('display', 'none');
                    $("#datosC").css('display', 'inline');
                    document.getElementById("history").innerHTML = "";
                    document.getElementById("respuesta").innerHTML = "";

                    $('#nombre').val("");
                    $('#telefono').val("");
                    $('#email').val("");
                }
            },
            error: function (e) {
                estadoSa = 0;
            }
        });
    }




