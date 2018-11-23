
//Este archivo se encarga de armar la interfaz grafica del chat.


// var fileref=document.createElement('script')
// fileref.setAttribute("type","text/javascript")
// fileref.setAttribute("src", "http://www.geoplugin.net/javascript.gp")

//document.getElementsByTagName('head')[0].appendChild(fileref);
$("head").append('<script language="JavaScript" src="http://www.geoplugin.net/javascript.gp" type="text/javascript"></script>');



//ESTE DIV VA A CONTENER TODA LA ESTRUCTURA DEL CHAT
var DivLChat = document.createElement("DIV");
DivLChat.id = "live-chat";


//Estructura del header
var Header = document.createElement("header");
Header.className = "clearfix";

var imgHeader = document.createElement("IMG");
imgHeader.id = "imgHead";
imgHeader.setAttribute("src", '../images/chat.png');

var hHeader = document.createElement("H4");
hHeader.id = "titulo";

var sHeader = document.createElement("span");
sHeader.className = "chat-message-counter";
sHeader.setAttribute("display","none");

var aHeader = document.createElement("a");
aHeader.className = "chat-close";
aHeader.href = "#";
aHeader.innerHTML = "X";


Header.appendChild(imgHeader);
Header.appendChild(hHeader);
Header.appendChild(sHeader);
Header.appendChild(aHeader);
//FIN Estructura del header

//Estructura Para el login
var DivChat = document.createElement("DIV");
DivChat.className = "chat";
DivChat.id = "login";

var FieldC1 = document.createElement("FIELDSET");
FieldC1.className = "datosF";

var pNombre = document.createElement("p");
pNombre.innerHTML = "Nombre Completo:";

var it1 = document.createElement("INPUT");
it1.setAttribute("type", "text");
it1.id = "nombre";
it1.placeholder = "Escriba su nombre…";
it1.required = true;
it1.autofocus = true;

var pTelefono = document.createElement("p");
pTelefono.innerHTML = "Número de Teléfono:";

var it2 = document.createElement("INPUT");
it2.setAttribute("type", "text");
it2.id = "telefono";
it2.placeholder = "Escriba su número de teléfono…";
it2.autofocus = true;

var pEmail = document.createElement("p");
pEmail.innerHTML = "Correo Electrónico:";

var it3 = document.createElement("INPUT");
it3.setAttribute("type", "text");
it3.id = "email";
it3.placeholder = "Escriba su email…";
it3.required = true;
it3.autofocus = true;

var pRespuesta = document.createElement("p");
pRespuesta.id = "respuesta";

var it4 = document.createElement("INPUT");
it4.setAttribute("type", "button");
it4.id = "datos";
it4.value = "Ingresar al chat";
it4.style.marginLeft = "17%";
it4.style.marginTop = "10%";

FieldC1.appendChild(pNombre);
FieldC1.appendChild(it1);
FieldC1.appendChild(pTelefono);
FieldC1.appendChild(it2);
FieldC1.appendChild(pEmail);
FieldC1.appendChild(it3);
FieldC1.appendChild(pRespuesta);
FieldC1.appendChild(it4);

DivChat.appendChild(FieldC1);
//FIN Estructura login


//Estructura chat
var DivChatC = document.createElement("DIV");
DivChatC.className = "chat";
DivChatC.id = "chat";

var DivDatosC= document.createElement("DIV");
DivDatosC.id = "datosC";

var DivHistory = document.createElement("DIV");
DivHistory.className = "chat-history";
DivHistory.id = "history";

var pTeclado = document.createElement("p");
pTeclado.className = "chat-feedback";
pTeclado.id = "teclado";

var FieldC2 = document.createElement("FIELDSET");
FieldC2.className = "datosF";


var itc1 = document.createElement("TEXTAREA");
itc1.id = "mInterno";
itc1.placeholder = "Escriba su mensaje aquí";
itc1.onfocus = function () { ValidaTeclado(1); };
itc1.onblur = function () { ValidaTeclado(0); };

var br1 = document.createElement("BR");

var itc2 = document.createElement("INPUT");
itc2.setAttribute("type", "button");
itc2.id = "enviar";
itc2.value = "Enviar";
itc2.title = "Enviar Mensaje";

var itc3 = document.createElement("INPUT");
itc3.setAttribute("type", "image");
itc3.id = "adjuntar";
itc3.setAttribute("src", '../images/clip.png');
itc3.alt = "Submit";
itc3.title = "Adjuntar Archivo";

var itc4 = document.createElement("INPUT");
itc4.setAttribute("type", "file");
itc4.id = "file";

var itc5 = document.createElement("INPUT");
itc5.setAttribute("type", "button");
itc5.id = "salir";
itc5.value = "Salir";
itc5.title = "Salir del Chat";

FieldC2.appendChild(itc1);
FieldC2.appendChild(br1);
FieldC2.appendChild(itc2);
FieldC2.appendChild(itc3);
FieldC2.appendChild(itc4);
FieldC2.appendChild(itc5);

DivDatosC.appendChild(DivHistory);
DivDatosC.appendChild(pTeclado);
DivDatosC.appendChild(FieldC2);


var DivDatosS = document.createElement("DIV");
DivDatosS.id = "datosS";

var FieldC3 = document.createElement("FIELDSET");
FieldC3.className = "datosF";

var pCalifica1 = document.createElement("p");
pCalifica1.innerHTML = "CALIFÍCANOS"

var DivCalifica = document.createElement("DIV");
DivCalifica.id = "califica";

var SpanCalifica = document.createElement("span");
SpanCalifica.className = "starRating";

var itcs5 = document.createElement("INPUT");
itcs5.setAttribute("type", "radio");
itcs5.id = "rating5";
itcs5.name = "rating";
itcs5.value = "5";

var lCalifica5 = document.createElement("label");
lCalifica5.htmlFor = "rating5";
lCalifica5.innerHTML = "5";

var itcs4 = document.createElement("INPUT");
itcs4.setAttribute("type", "radio");
itcs4.id = "rating4";
itcs4.name = "rating";
itcs4.value = "4";

var lCalifica4 = document.createElement("label");
lCalifica4.htmlFor = "rating4";
lCalifica4.innerHTML = "4";

var itcs3 = document.createElement("INPUT");
itcs3.setAttribute("type", "radio");
itcs3.id = "rating3";
itcs3.name = "rating";
itcs3.value = "3";
itcs3.checked = true;

var lCalifica3 = document.createElement("label");
lCalifica3.htmlFor = "rating3";
lCalifica3.innerHTML = "3";


var itcs2 = document.createElement("INPUT");
itcs2.setAttribute("type", "radio");
itcs2.id = "rating2";
itcs2.name = "rating";
itcs2.value = "2";

var lCalifica2 = document.createElement("label");
lCalifica2.htmlFor = "rating2";
lCalifica2.innerHTML = "2";

var itcs1 = document.createElement("INPUT");
itcs1.setAttribute("type", "radio");
itcs1.id = "rating1";
itcs1.name = "rating";
itcs1.value = "1";

var lCalifica1 = document.createElement("label");
lCalifica1.htmlFor = "rating1";
lCalifica1.innerHTML = "1";

SpanCalifica.appendChild(itcs5);
SpanCalifica.appendChild(lCalifica5);
SpanCalifica.appendChild(itcs4);
SpanCalifica.appendChild(lCalifica4);
SpanCalifica.appendChild(itcs3);
SpanCalifica.appendChild(lCalifica3);
SpanCalifica.appendChild(itcs2);
SpanCalifica.appendChild(lCalifica2);
SpanCalifica.appendChild(itcs1);
SpanCalifica.appendChild(lCalifica1);

DivCalifica.appendChild(SpanCalifica);

var pCalifica2 = document.createElement("p");
pCalifica2.innerHTML = "DÉJANOS UN COMENTARIO:";


var itcs6 = document.createElement("TEXTAREA");
itcs6.id = "mCalifica";
itcs6.placeholder = "Escriba su comentario aquí";

var br2 = document.createElement("BR");

var itcs7 = document.createElement("INPUT");
itcs7.setAttribute("type", "button");
itcs7.id = "enviar2";
itcs7.value = "Enviar";
itcs7.title = "Enviar comentario del chat";

var itcs8 = document.createElement("INPUT");
itcs8.setAttribute("type", "button");
itcs8.id = "cancelar";
itcs8.value = "Cancelar";
itcs8.title = "Cancelar";


FieldC3.appendChild(pCalifica1);
FieldC3.appendChild(DivCalifica);
FieldC3.appendChild(pCalifica2);
FieldC3.appendChild(itcs6);
FieldC3.appendChild(br2);
FieldC3.appendChild(itcs7);
FieldC3.appendChild(itcs8);

DivDatosS.appendChild(FieldC3);

DivChatC.appendChild(DivDatosC);
DivChatC.appendChild(DivDatosS);


DivLChat.appendChild(Header);
DivLChat.appendChild(DivChat);
DivLChat.appendChild(DivChatC);

document.body.appendChild(DivLChat);