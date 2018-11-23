
var rutaWCF = "http://172.16.7.4/wcfCalculadora/calcCoope.svc/";

function mostrar_ocultar(){
     var $target = $('html,body'); 
     $("#datos").toggle();
     $target.animate({scrollTop: $target.height()}, 1000);
}



function init(){
     $('#info').click(mostrar_ocultar);

      $( "#selMoneda" ).change(function() {
         
       cargarComboLinea();

     });

       $( "#selLinea" ).change(function() {
         $( "#tasa" ).val($( "#selLinea" ).val());
     });


   $('#calc_value').click(function(){
        obtenerValores();
   });

   $('#enviar').click(function(){
        enviarInformacion();
   });

    cargarComboMoneda();
    cargarComboLinea();
    cargarComboPlazo();
}


 function isNumberKey(evt){
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
 
         return true;
        }

function limpiarCampos(){
    $( "#monto" ).val('0.00');
    $( "#cuota" ).val('0.00');
    $( "#nombre" ).val('');
    $( "#email" ).val('');
    $( "#telefono" ).val('');
    $( "#mensaje" ).val('');
}


function calcularCuota(nmonto,ninteres,nplazo){
      var resultado=(nmonto)*((ninteres/100)/12) / (1-Math.pow((1+(ninteres/100)/12),(-nplazo)));
      return resultado=Math.round(resultado*100) /100;
}

function obtenerValores()
{

    $( "#MsjError1").html("");

    //Las tres variables utilizadas en la fórmula 
    var nmonto=parseFloat($( "#monto" ).val());
    var ninteres=parseFloat($( "#tasa" ).val());
    var nplazo =  parseFloat($( "#selPlazo" ).val());


    if ((nmonto < 100000) || (nmonto > 60000000)){
        $( "#MsjError1").html("<p class='labelE'>El rango del monto debe estar entre 100,000.00 y 60,000,000.00</p>");
        return;
    }

    




    //Esta última línea muestra el resulado dentro del casillero
    $( "#cuota" ).val(calcularCuota(nmonto,ninteres,nplazo));

}


function enviarInformacion(){
    var nmonto = $( "#monto" ).val();
    var smoneda = $( "#selMoneda" ).val();
    var slinea = jQuery('#selLinea option:selected').text();
    var ninteres=$( "#tasa").val();
    var nplazo =  $("#selPlazo").val();
    var ncuota = $( "#cuota" ).val();
    var snombre = $( "#nombre" ).val();
    var semail = $( "#email" ).val();
    var stelefono = $( "#telefono" ).val();
    var smensaje = $( "#mensaje" ).val();
    var nenviar = 0;
    var modal = document.getElementById('myModal');

    $( "#MsjError1").html("");

    
    if ($('#autoriza').is(":checked"))
    {
        if ($('#envCorreo').is(":checked")){
            nenviar = 1
        }

    }else{

       $( "#MsjError2").html("<p class='labelE'>Debe autorizar a Coopecaja para el envío de información.</p>");
       return;
    }


     if (ncuota <= 0){
        $( "#MsjError2").html("<p class='labelE'>Debe calcular la cuota primero</p>");
        return;
    }

    if ($( "#nombre" ).val().trim().length < 10){
        $( "#MsjError2").html("<p class='labelE'>Digite un nombre valido de mas de 10 caracteres</p>");
        return;
    }




    var atpos = semail.indexOf("@");
    var dotpos = semail.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=semail.length) {
        //alert("La dirección de correo es incorrecta");
        $( "#MsjError2").html("<p class='labelE'>La dirección de correo es incorrecta</p>");
        return ;
    }

    modal.style.display = "block";

    // var potencial = {
    //     nombre: snombre,
    //     email: semail,
    //     telefono: stelefono,
    //     mensaje: smensaje, 
    //     monto: nmonto,
    //     moneda: smoneda,
    //     linea: slinea,
    //     tasa: ninteres,
    //     plazo: nplazo,
    //     cuota: ncuota,
    // };


    	var datop = {"dato":{
		"nombre": snombre,
        "email":semail,
        "telefono": stelefono,
        "mensaje" : smensaje,
        "monto": nmonto,
        "moneda": smoneda,
        "linea": slinea,
        "tasa": ninteres,
        "plazo": nplazo,
        "cuota": ncuota,
        "enviar" : nenviar }
	}

	$.ajax({
            type: "POST",
            url: rutaWCF + "obtenerDatos",
            data: JSON.stringify(datop),
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
               modal.style.display = "none";
               if (msg== 1){
                    $( "#MsjError1").html("<p class='labelC'>Mensaje enviado correctamente</p>");
                    limpiarCampos();
                     $("#datos").toggle();
                     $('#info').prop('checked', false);
               }else{
                    $( "#MsjError2").html("<p class='labelE'>Ocurrió un error en el envío de información, por favor intente nuevamente</p>");
               }

    			
               
            },
            error: function (e) {
            	modal.style.display = "none";
                $( "#MsjError2").html("<p class='labelE'>Existe un error en el envio de información. Por favor intente nuevamente.</p>");
            }
        });

	
}

function limpiarCampos(){
    $( "#monto" ).val('0.00');
    $( "#cuota" ).val('0.00');
    $( "#nombre" ).val('');
    $( "#email" ).val('');
    $( "#telefono" ).val('');
    $( "#mensaje" ).val('');
}

function cargarComboMoneda(){

	$( "#selMoneda" ).html("");
	$.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("web", " ");
            },
            url: rutaWCF + "ObtenerListaMonedas",
            data: {cpass: "" },
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                mensaje = "";
                var resultado = eval(msg);
                $.each(resultado, function () {
                     $( "#selMoneda" ).append("<option value='" + this.nidMoneda + "'>" + this.cnombreMo + "</option>");
                });
            },
            error: function (e) {
            }
        });
}

function cargarComboLinea(){


	$( "#selLinea" ).html("");

	var idMoneda =  $("#selMoneda" ).val();

	$.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("web", " ");
            },
            url: rutaWCF + "ObtenerListaLineas",
            data: {cpass: "",nidMoneda:idMoneda },
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                mensaje = "";
                var resultado = eval(msg);
                $.each(resultado, function () {
                     $( "#selLinea" ).append("<option value='" + this.ntasainter + "'>" + this.cnombreLin + "</option>");
                });
            },
            error: function (e) {
            }
        });
		 $( "#tasa" ).val($( "#selLinea" ).val());
}

function cargarComboPlazo(){


    $( "#selPlazo" ).html("");

    $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("web", " ");
            },
            url: rutaWCF + "ObtenerListaPlazos",
            data: {cpass: "" },
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                mensaje = "";
                var resultado = eval(msg);
                $.each(resultado, function () {
                     $( "#selPlazo" ).append("<option value='" + this.nPlazo + "'>" + this.nPlazo + "</option>");
                });
            },
            error: function (e) {
            }
        });

}






 $(document).ready(function(){
    init();    
    $( "#tasa" ).val($( "#selLinea" ).val());
    $('#monto').number( true, 2 );
    $('#cuota').number( true, 2 );




 });