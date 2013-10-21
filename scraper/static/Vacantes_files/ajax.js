var ajax;

    //Funcion que crea el Ajax
    function creaajax(){
        var objajax=false;
        if (window.ActiveXObject){
            objajax = new ActiveXObject("Microsoft.XMLHttp");
        }else if((window.XMLHtppRequest) || (typeof XMLHttpRequest)!=undefined){
        	objajax = new XMLHttpRequest;
        } else {
        	alert("No soporta Ajax");
        	return;
    	}
    	return objajax;
    }
    
    function linkIExplorer8(){
	window.open("modulo/popup/IExplorer8.jsp", "POPUP01", "width=637, height=259,status=no,menubar=no");
    }

    function solonumero(campo){
        permitidos=/[^0-9.]/;
        if(permitidos.test(campo.value)){
            campo.value="";
            campo.focus();
        }
    }

    function removeAllOptions(selectbox)
    {
        var i;
        for(i=selectbox.options.length-1;i>=0;i--){
            selectbox.remove(i);
        }
    }
    
    function validarEmail(valor) {
        var s = valor;
        var filter=/^[A-Za-z][A-Za-z0-9_.]*@[A-Za-z0-9_]+.[A-Za-z0-9_.]+[A-za-z]$/;
        if (s.length == 0 ) return true;
           if (filter.test(s))
              return true;
           else
             alert('El formato del correo no es valido');
            //theElement.focus();
            return false;
    }

    function validadni(dni){
        if (dni.value.length!=8){
            alert("DNI: Requiere 8 digitos.");
            dni.focus();
            return;
        }
    }

    function estiloFocusCtrl(control,estado){
        if(estado==1){
            control.style.borderColor="red";
        }else{
            control.style.borderColor="";
        }
    }

    function mostrardiv(div){
        document.getElementById(div).style.visibility="visible";
    }

    function oculardiv(div){
        document.getElementById(div).style.visibility="hidden";
    }

    function lnkeliminarover(div){
        document.getElementById(div).className="lnkeliminarover";
    }

    function lnkeliminarout(div){
        document.getElementById(div).className="";
    }


    /*========================= Inicio Valida Fecha ============================*/

    function validaformularioFecha(tituloCampo,fechaIngreso,fechaTermino){
        var bOk = 0;
        if (valFecha(fechaIngreso)){
            if (valFecha(fechaTermino)){
                if (fechaMayorOIgualQue(fechaTermino, fechaIngreso)){
                    bOk = 1;
                } else {
                    alert(tituloCampo + ": Rango invalido");
                    fechaTermino.focus();
                }
            } else {
                alert(tituloCampo + ": Fecha invalida");
                fechaTermino.focus();
            }
        } else {
            alert(tituloCampo + ": Fecha invalida");
            fechaIngreso.focus();
        }
        return bOk;
   }


   function esDigito(sChr){
    var sCod = sChr.charCodeAt(0);
    return ((sCod > 47) && (sCod < 58));
   }

   function valSep(oTxt){
    var bOk = false;
    bOk = bOk || ((oTxt.value.charAt(2) == "-") && (oTxt.value.charAt(5) == "-"));
    bOk = bOk || ((oTxt.value.charAt(2) == "/") && (oTxt.value.charAt(5) == "/"));
    return bOk;
   }

   function finMes(oTxt){
    var nMes = parseInt(oTxt.value.substr(3, 2), 10);
    var nAno = parseInt(oTxt.value.substr(6), 10);
    var nRes = 0;
    switch (nMes){
     case 1: nRes = 31; break;
     case 2: nRes = 28; break;
     case 3: nRes = 31; break;
     case 4: nRes = 30; break;
     case 5: nRes = 31; break;
     case 6: nRes = 30; break;
     case 7: nRes = 31; break;
     case 8: nRes = 31; break;
     case 9: nRes = 30; break;
     case 10: nRes = 31; break;
     case 11: nRes = 30; break;
     case 12: nRes = 31; break;
    }
    return nRes + (((nMes == 2) && (nAno % 4) == 0)? 1: 0);
   }


   function valDia(oTxt){
    var bOk = false;
    var nDia = parseInt(oTxt.value.substr(0, 2), 10);
    bOk = bOk || ((nDia >= 1) && (nDia <= finMes(oTxt)));
    return bOk;
   }

   function valMes(oTxt){
    var bOk = false;
    var nMes = parseInt(oTxt.value.substr(3, 2), 10);
    bOk = bOk || ((nMes >= 1) && (nMes <= 12));
    return bOk;
   }

   function valAno(oTxt){
    var bOk = true;
    var nAno = oTxt.value.substr(6);
    bOk = bOk && ((nAno.length == 2) || (nAno.length == 4));
    if (bOk){
     for (var i = 0; i < nAno.length; i++){
      bOk = bOk && esDigito(nAno.charAt(i));
     }
    }
    return bOk;
   }


   function valFecha(oTxt){
    var bOk = true;
    if (oTxt.value != ""){
     bOk = bOk && (valAno(oTxt));
     bOk = bOk && (valMes(oTxt));
     bOk = bOk && (valDia(oTxt));
     bOk = bOk && (valSep(oTxt));
     return bOk;
    }
   }


   function fechaMayorOIgualQue(fec0, fec1){
    var bRes = false;
    var sDia0 = fec0.value.substr(0, 2);
    var sMes0 = fec0.value.substr(3, 2);
    var sAno0 = fec0.value.substr(6, 4);
    var sDia1 = fec1.value.substr(0, 2);
    var sMes1 = fec1.value.substr(3, 2);
    var sAno1 = fec1.value.substr(6, 4);
    if (sAno0 > sAno1) bRes = true;
    else {
     if (sAno0 == sAno1){
      if (sMes0 > sMes1) bRes = true;
      else {
       if (sMes0 == sMes1)
        //if (sDia0 >= sDia1) bRes = true;-->Esta linea es para >=
        if (sDia0 > sDia1) bRes = true;
      }
     }
    }
    return bRes;
   }

   function valFechas(form){
    var bOk = false;
    if (valFecha(document.f1.fec0)){
     if (valFecha(document.f1.fec1)){
      if (fechaMayorOIgualQue(document.f1.fec1, document.f1.fec0)){
       bOk = true;
       alert("Ok");
      } else {
       alert("Rango inv√°lido");
       document.f1.fec1.focus();
      }
     } else {
      alert("Fecha inv√°lida");
      document.f1.fec1.focus();
     }
    } else {
     alert("Fecha inv√°lida");
     document.f1.fec0.focus();
    }
   }
   /*========================= Fin Valida Fecha ============================*/

    function abrirVentana(direccion){
        nuevaVentana = window.open(direccion,"","height=300,width=580,resizable=0,noresize=yes,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes")
    }

    function deleteRowsTable(miTabla){
        //obtener el numero de filas
        var tabla = document.getElementById(miTabla);
        var numFilas = tabla.rows.length;
        for (f=1;f<=numFilas-1;f++){
            tabla.deleteRow(1);
            //tabla.tBodies[0].deleteRow(0);
        }
    }


    /*========================= Inicio Popup ============================*/
    function popupSelecionarProfesion(codProfesion,ctrlProfesion){ctrlProfesion.value=codProfesion;}
    function popupSelecionarItemCombo(codigo,ctrl){ctrl.value=codigo;}
    /*========================= Fin Popup    ============================*/


    /*========================= Inicio Postulante ============================*/
    function enviadni(form){
        if(form.POST_NUMDOCUM.value==""){alert("Ingrese dni");form.existe.value=1;form.POST_NUMDOCUM.focus();return false;}
        //if(form.POST_NUMDOCUM.value.lenght!=8){alert("DNI: Requiere 8 digitos");form.POST_NUMDOCUM.focus();return false;}

        //form.usuario.value=dni.value;
        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=obtenerCiudadanotoXML&POST_NUMDOCUM=" + form.POST_NUMDOCUM.value,true);
        ajax.onreadystatechange =function procesaenviaprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                      var xmlDoc = ajax.responseXML;
                                                      var xmlDocCant = xmlDoc.getElementsByTagName('CIUDADANO').length;
                                                      
                                                      for (i = 0; i < xmlDocCant; i++){
                                                             xmlciudadano = xmlDoc.getElementsByTagName('CIUDADANO')[i];
                                                             xmlapellidopat = xmlciudadano.getElementsByTagName('APELLIDOPAT')[0];
                                                             xmlapellidomat = xmlciudadano.getElementsByTagName('APELLIDOMAT')[0];
                                                             xmlnombres = xmlciudadano.getElementsByTagName('NOMBRES')[0];
                                                             xmlfechanac = xmlciudadano.getElementsByTagName('FECHANAC')[0];
                                                             xmlsexo = xmlciudadano.getElementsByTagName('SEXO')[0];

                                                             if(xmlapellidopat.firstChild.data=="null"){
                                                                 document.getElementById("POST_APELLPAT").value = "";
                                                                 document.getElementById("POST_APELLMAT").value = "";
                                                                 document.getElementById("POST_NOMBRE").value = "";
                                                                 document.getElementById("vPOST_FECHANAC").value = "";
                                                                 //document.getElementById("sexo").value = "0";
                                                                 document.getElementById("EXISTECIUDADANOENBD").value=0;
                                                             }else{
                                                                 document.getElementById("POST_APELLPAT").value = xmlapellidopat.firstChild.data;
                                                                 document.getElementById("POST_APELLMAT").value = xmlapellidomat.firstChild.data;
                                                                 document.getElementById("POST_NOMBRE").value = xmlnombres.firstChild.data;
                                                                 document.getElementById("vPOST_FECHANAC").value = xmlfechanac.firstChild.data;
                                                                 //
                                                                 if(document.getElementById("POST_NOMBRE").value==""){
                                                                	 document.getElementById("EXISTECIUDADANOENBD").value=0;
                                                                 }else{
                                                                	 document.getElementById("EXISTECIUDADANOENBD").value=1;
                                                                 }
                                                             }
                                                        }

                                                        document.getElementById("divdni").
                                                            innerHTML="<img src='images/correcto.png' width='20px' height='20px'>";

                                                        enviaisexiste(form);
                                                  }else{
                                                        document.getElementById("divdni").
                                                            innerHTML="<font color='red'><b>error</b></font>";
                                                        }
                                     }else if(ajax.readyState==1){
                                         document.getElementById("divdni").
                                            innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };

        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }

    function enviaisexiste(form){
        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getPostulanteIsExistetoXML&POST_USUARIO=" + form.POST_NUMDOCUM.value,true);
        ajax.onreadystatechange =function procesaisexiste(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                         var xmlDoc = ajax.responseXML;
                                                         xmlciudadano = xmlDoc.getElementsByTagName('POSTULANTE')[0];
                                                         xmlexiste = xmlciudadano.getElementsByTagName('EXISTE')[0];
                                                         form.existe.value = xmlexiste.firstChild.data;
                                                         if (xmlexiste.firstChild.data==1){
                                                             document.getElementById("divdni").innerHTML =
                                                                 "<img src='images/exclamacion.png' width='15px' height='15px' alt='Existe Usuario'> Usuario ya existe.";
                                                             estiloFocusCtrl(form.POST_NUMDOCUM,1);
                                                         }else{
                                                             document.getElementById("divdni").innerHTML =
                                                                 "<img src='images/correcto.png' width='20px' height='20px'>";
                                                             estiloFocusCtrl(form.POST_NUMDOCUM,0);
                                                         }
                                                  }else{
                                                        document.getElementById("divdni").
                                                            innerHTML="<font color='red'><b>error</b></font>";
                                                        }
                                     }else if(ajax.readyState==1){
                                         document.getElementById("divdni").
                                            innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }
    
    function obtenerdepartamento(form){
    	var optionPais = form.UBI_CODPAIS.options[form.UBI_CODPAIS.selectedIndex].value;
    	
    	removeAllOptions(form.UBI_CODDEPARTAMENTO);
    	removeAllOptions(form.UBI_CODPROVINCIA);
        removeAllOptions(form.UBI_CODDISTRITO);
        
        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getUbigeoDeparamentotoXML&codpais=" + optionPais,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                         form.UBI_CODDEPARTAMENTO.options[0] = new Option("","");

                                                        var xmlDoc = ajax.responseXML;
                                                        for (i = 0; i < xmlDoc.getElementsByTagName('DEPARTAMENTO').length; i++){

                                                             xmldepartamento = xmlDoc.getElementsByTagName('DEPARTAMENTO')[i];
                                                             xmlco_departamento = xmldepartamento.getElementsByTagName('CO_DEPARTAMENTO')[0];
                                                             xmlde_departamento = xmldepartamento.getElementsByTagName('DE_DEPARTAMENTO')[0];
                                                             form.UBI_CODDEPARTAMENTO.options[i+1] = new Option(xmlde_departamento.firstChild.data,xmlco_departamento.firstChild.data);
                                                        }
                                                        form.UBI_CODDEPARTAMENTO.disabled = false;
                                                  }else{
                                                            form.UBI_CODDEPARTAMENTO.disabled = false;
                                                        }
                                     }else if(ajax.readyState==1){
                                                       form.UBI_CODDEPARTAMENTO.disabled = true;
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
        
    }

    function obtenerprovincia(form){
        var optionDepartamento = form.UBI_CODDEPARTAMENTO.options[form.UBI_CODDEPARTAMENTO.selectedIndex].value;

        removeAllOptions(form.UBI_CODPROVINCIA);
        removeAllOptions(form.UBI_CODDISTRITO);

        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getUbigeoProvinciatoXML&coddepartamento=" + optionDepartamento,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                         form.UBI_CODPROVINCIA.options[0] = new Option("","");

                                                        var xmlDoc = ajax.responseXML;
                                                        for (i = 0; i < xmlDoc.getElementsByTagName('PROVINCIA').length; i++){

                                                             xmlprovincia = xmlDoc.getElementsByTagName('PROVINCIA')[i];
                                                             xmlco_provincia = xmlprovincia.getElementsByTagName('CO_PROVINCIA')[0];
                                                             xmlde_provincia = xmlprovincia.getElementsByTagName('DE_PROVINCIA')[0];
                                                             form.UBI_CODPROVINCIA.options[i+1] = new Option(xmlde_provincia.firstChild.data,xmlco_provincia.firstChild.data);
                                                        }
                                                        form.UBI_CODPROVINCIA.disabled = false;
                                                  }else{
                                                            form.UBI_CODPROVINCIA.disabled = false;
                                                        }
                                     }else if(ajax.readyState==1){
                                                       form.UBI_CODPROVINCIA.disabled = true;
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }

    function obtienedistrito(form){
        var optionDepartamento = form.UBI_CODDEPARTAMENTO.options[form.UBI_CODDEPARTAMENTO.selectedIndex].value;
        var optionProvincia = form.UBI_CODPROVINCIA.options[form.UBI_CODPROVINCIA.selectedIndex].value;

        removeAllOptions(form.UBI_CODDISTRITO);

        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getUbigeoDistritotoXML&coddepartamento=" + optionDepartamento + "&codprovincia=" + optionProvincia,true);
        ajax.onreadystatechange =
                                function procesaobtienedistrito(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                        form.UBI_CODDISTRITO.options[0] = new Option("","");

                                                        var xmlDoc = ajax.responseXML;
                                                        for (i = 0; i < xmlDoc.getElementsByTagName('DISTRITO').length; i++){
                                                             xmldistrito = xmlDoc.getElementsByTagName('DISTRITO')[i];
                                                             xmlco_distrito = xmldistrito.getElementsByTagName('CO_DISTRITO')[0];
                                                             xmlde_distrito = xmldistrito.getElementsByTagName('DE_DISTRITO')[0];
                                                             form.UBI_CODDISTRITO.options[i+1] = new Option(xmlde_distrito.firstChild.data,xmlco_distrito.firstChild.data);
                                                        }
                                                        form.UBI_CODDISTRITO.disabled = false;
                                                  }else{
                                                            form.UBI_CODDISTRITO.disabled = true;
                                                        }
                                     }else if(ajax.readyState==1){
                                                       form.UBI_CODDISTRITO.disabled = true;
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }

    function validaformularioRegistroPostulanteTipoTelefCasa(form){
        var opcTipoTelefono1 = form.POST_CODTELTIPO1.options[form.POST_CODTELTIPO1.selectedIndex].value;
        if (opcTipoTelefono1=="010002"){
            form.POST_TELEFONOACONTACTAR1.value="";
            form.POST_TELEFONOACONTACTAR1.disabled=false;
        }else{
            form.POST_TELEFONOACONTACTAR1.value="";
            form.POST_TELEFONOACONTACTAR1.disabled=true;
        }


        var opcTipoTelefono2 = form.POST_CODTELTIPO2.options[form.POST_CODTELTIPO2.selectedIndex].value;
        if (opcTipoTelefono2=="010002"){
            form.POST_TELEFONOACONTACTAR2.value="";
            form.POST_TELEFONOACONTACTAR2.disabled=false;
        }else{
            form.POST_TELEFONOACONTACTAR2.value="";
            form.POST_TELEFONOACONTACTAR2.disabled=true;
        }
    }
    
    function validaFormRegPostDiscapacidad(form){
    	if(form.POST_DiSCAPACIDAD1.checked){form.POST_DISCAPACIDAD.value = '1';}else{form.POST_DISCAPACIDAD.value = 'null';}
        if(form.POST_DiSCAPACIDAD2.checked){form.POST_DISCAPACIDAD.value = form.POST_DISCAPACIDAD.value +',1';}else{form.POST_DISCAPACIDAD.value = form.POST_DISCAPACIDAD.value +',null';}
        if(form.POST_DiSCAPACIDAD3.checked){form.POST_DISCAPACIDAD.value = form.POST_DISCAPACIDAD.value +',1';}else{form.POST_DISCAPACIDAD.value = form.POST_DISCAPACIDAD.value +',null';}
        if(form.POST_DiSCAPACIDAD4.checked){form.POST_DISCAPACIDAD.value = form.POST_DISCAPACIDAD.value +',1';}else{form.POST_DISCAPACIDAD.value = form.POST_DISCAPACIDAD.value +',null';}
        if(form.POST_DiSCAPACIDAD5.checked){form.POST_DISCAPACIDAD.value = form.POST_DISCAPACIDAD.value +',1';}else{form.POST_DISCAPACIDAD.value = form.POST_DISCAPACIDAD.value +',null';}
    }

    function validaformularioRegistroPostulante(form){
        if(form.terminook.checked==false){alert("Debe de aceptar los Terminos.");form.terminook.focus();return false;}

        //Login
        if(form.existe.value==1){alert("Postulante ya existe.");form.POST_NUMDOCUM.focus();return false;}
        if(form.POST_PASSWORD.value==""){alert("Ingrese password");form.POST_PASSWORD.focus();return false;}
        if(form.passwordrep.value==""){alert("Ingrese confirmaci√≤n del password");form.passwordrep.focus();return false;}
        if(form.POST_PASSWORD.value!=form.passwordrep.value){alert("Verifique contraseÒa");form.POST_PASSWORD.focus();return false;}
        
        if (form.EXISTECIUDADANOENBD.value==1){
        	if(form.POST_FECHANAC.value!=form.vPOST_FECHANAC.value){alert("Verifique Fecha de Nacimiento");form.POST_FECHANAC.focus();return false;}
        }     

        //NombreApellido
        if (form.POST_APELLPAT.value==""){alert("Ingrese Apellido Paterno");form.POST_APELLPAT.focus();return false;}
        if (form.POST_APELLMAT.value==""){alert("Ingrese Apellido Materno");form.POST_APELLMAT.focus();return false;}
        if (form.POST_NOMBRE.value==""){alert("Ingrese Nombres");form.POST_NOMBRE.focus();return false;}

        //Ubigeo
        if (form.UBI_CODDEPARTAMENTO.selectedIndex==0){alert("Seleccione departamento");form.UBI_CODDEPARTAMENTO.focus();return false;}
        if (form.UBI_CODPROVINCIA.selectedIndex==0){alert("Seleccione provincia");form.UBI_CODPROVINCIA.focus();return false;}
        if (form.UBI_CODDISTRITO.selectedIndex==0){alert("Seleccione distrito");form.UBI_CODDISTRITO.focus();return false;}
        if(form.POST_DIRECCION.value==""){alert("Ingrese Direccion");form.POST_DIRECCION.focus();return false;}

        //Telefonos
        if(form.POST_TELEFONO1.value!=""){
            if(form.POST_CODTELTIPO1.selectedIndex==0){alert("Seleccione Tipo de telefono");form.POST_CODTELTIPO1.focus();return false;}
            else{
                var opcTipoTelefono = form.POST_CODTELTIPO1.options[form.POST_CODTELTIPO1.selectedIndex].value;
                if(opcTipoTelefono=="010002"){
                    if(form.POST_TELEFONOACONTACTAR1.value==""){alert("Ingrese nombre del contacto");form.POST_TELEFONOACONTACTAR1.focus();return false;}
                }
            }
        }
        if(form.POST_TELEFONO2.value!=""){
            if(form.POST_CODTELTIPO2.selectedIndex==0){alert("Seleccione Tipo de telefono");form.POST_CODTELTIPO2.focus();return false;}
            else{
                var opcTipoTelefono2 = form.POST_CODTELTIPO2.options[form.POST_CODTELTIPO2.selectedIndex].value;
                if(opcTipoTelefono2=="010002"){
                    if(form.POST_TELEFONOACONTACTAR2.value==""){alert("Ingrese nombre del contacto");form.POST_TELEFONOACONTACTAR2.focus();return false;}
                }
            }
        }

        //EstCivil
        if (form.POST_CODESTCIVIL.selectedIndex==0){alert("Seleccione estado civil");form.POST_CODESTCIVIL.focus();return false;}

        return validarEmail(form.POST_EMAIL.value);

        return true;
    }
    /*========================= Fin Postulante ============================*/



    /*========================= Inicio Registro Postulante Educacion =======*/
    function validaCEstudio(cestudio,otrocestudio){
    	if (cestudio.selectedIndex==0){
    		//Ingresar· Otro Centro de Estudio
    		//otrocestudio.disabled = false;
    		otrocestudio.style.visibility ="visible";
    		//otrocestudio.style.backgroundColor="";
    	}else{
    		//Ya selecciono Centro de Estudio
    		var opcCEst = cestudio.options[cestudio.selectedIndex].value;
    		if (opcCEst==5000){
    			otrocestudio.style.visibility ="visible";
    		}else{
    			otrocestudio.style.visibility ="hidden";
    		}
    		//otrocestudio.disabled = true;
    		//otrocestudio.style.visibility ="hidden";
    		//otrocestudio.style.backgroundColor="#CCCCCC";
    		otrocestudio.value="";
    	}
    }
    
    function enviaBusquedaProfesion(form,ctrlProfesion,tableName){
        deleteRowsTable(tableName);

        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getFiltroProfesiontoXML&MAES_DESMAESTRO=" + form.MAES_DESMAESTRO.value,true);
        ajax.onreadystatechange =
                                function procesaenviaBusquedaProfesion(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                       document.getElementById("divbusqprofesion").
                                                            innerHTML="<img src='images/correcto.png' width='15px' height='15px'>";

                                                      var xmlDoc = ajax.responseXML;
                                                      var tbody = document.getElementById(tableName).getElementsByTagName("TBODY")[0];
                                                      for (i = 0; i < xmlDoc.getElementsByTagName('PROFESION').length; i++){
                                                          xmlprofesion = xmlDoc.getElementsByTagName('PROFESION')[i];
                                                          xmlprof_codprofesion = xmlprofesion.getElementsByTagName('PROF_CODPROFESION')[0];
                                                          xmlprof_desprofesion = xmlprofesion.getElementsByTagName('PROF_DESPROFESION')[0];

                                                          var row = document.createElement("TR");
                                                          row.onclick="function () { alert('ff'); }  ";
                                                          var td1 = document.createElement('TD');
                                                          var td2 = document.createElement('TD');
                                                          var td3 = document.createElement('TD');

                                                          
                                                          

                                                          td1.innerHTML="<a href\"#\" class=\"close\"><img src=\"images/seleccionar01.JPG\" onclick=\"popupSelecionarProfesion("+xmlprof_codprofesion.firstChild.data+","+ctrlProfesion+");\" class=\"imgseleccionar\"></a>";
                                                          td2.appendChild(document.createTextNode(xmlprof_codprofesion.firstChild.data))
                                                          td2.className="filadato";
                                                          //td2.innerHTML="<a href=\"javascript:popupSelecionarProfesion("+xmlprof_codprofesion.firstChild.data+","+ctrlProfesion+");\"  class=\"close\">"+xmlprof_desprofesion.firstChild.data+"</a>";
                                                          td3.appendChild(document.createTextNode(xmlprof_desprofesion.firstChild.data))
                                                          td3.className="filadato";
                                                          
                                                          
                                                          row.appendChild(td1);
                                                          row.appendChild(td2);
                                                          row.appendChild(td3);
                                                          tbody.appendChild(row);
                                                      }
                                                  }else{
                                                      document.getElementById("divbusqprofesion").
                                                                    innerHTML="error";
                                                  }
                                     }else if(ajax.readyState==1){
                                            document.getElementById("divbusqprofesion").
                                                innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }

    function enviaBusquedaCEstudio(form,ctrlCEstudio,tableName){
        deleteRowsTable(tableName);

        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getFiltroCEstudiotoXML&MAES_DESMAESTRO=" + form.MAES_DESMAESTRO.value,true);
        ajax.onreadystatechange =
                                function procesaenviaBusquedaProfesion(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                       document.getElementById("divcarga").
                                                            innerHTML="<img src='images/correcto.png' width='15px' height='15px'>";

                                                       var xmlDoc = ajax.responseXML;
                                                       var tbody = document.getElementById(tableName).getElementsByTagName("TBODY")[0];

                                                       for (i = 0; i < xmlDoc.getElementsByTagName('CESTUDIO').length; i++){
                                                          xmlcestudio = xmlDoc.getElementsByTagName('CESTUDIO')[i];
                                                          xmlcest_codcestudio = xmlcestudio.getElementsByTagName('CEST_CODCESTUDIO')[0];
                                                          xmlcest_descestudio = xmlcestudio.getElementsByTagName('CEST_DESCESTUDIO')[0];

                                                          var row = document.createElement("TR")
                                                          row.onclick="function () { alert('ff'); }  ";
                                                          var td1 = document.createElement('TD')
                                                          var td2 = document.createElement('TD')
                                                          var td3 = document.createElement('TD')




                                                          td1.innerHTML="<a href\"#\" class=\"close\"><img src=\"images/seleccionar01.JPG\" onclick=\"popupSelecionarItemCombo("+xmlcest_codcestudio.firstChild.data+","+ctrlCEstudio+");\" class=\"imgseleccionar\"></a>";
                                                          td2.appendChild(document.createTextNode(xmlcest_codcestudio.firstChild.data))
                                                          td2.className="filadato";
                                                          td3.appendChild(document.createTextNode(xmlcest_descestudio.firstChild.data))
                                                          td3.className="filadato";


                                                          row.appendChild(td1);
                                                          row.appendChild(td2);
                                                          row.appendChild(td3);
                                                          tbody.appendChild(row);
                                                       }

                                                  }else{
                                                      document.getElementById("divcarga").
                                                                    innerHTML="error";
                                                  }
                                     }else if(ajax.readyState==1){
                                            document.getElementById("divcarga").
                                                innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }

    function validarFormPostulanteEducacion(form){
    	if(form.POST_CODMAXNIVEL.selectedIndex==""){alert("Seleccione m·ximo nivel de estudios alcanzados.");form.POST_CODMAXNIVEL.focus();return false;}
    	
    	
        if(form.SEC_POSTEDU_OTROCESTUDIO.value==""){alert("Secundaria: Ingrese Centro de Estudio");form.SEC_POSTEDU_OTROCESTUDIO.focus();return false;}
        if(form.SEC_POSTEDU_FECHAINICIO.value==""){alert("Secundaria: Ingrese Fecha Inicio");form.SEC_POSTEDU_FECHAINICIO.focus();return false;}
        if(form.SEC_POSTEDU_FECHATERMINO.value==""){alert("Secundaria: Ingrese Fecha Termino");form.SEC_POSTEDU_FECHATERMINO.focus();return false;}
        //if(validaformularioFecha("Secundaria",form.SEC_POSTEDU_FECHAINICIO,form.SEC_POSTEDU_FECHATERMINO)==0){return false;}

        //Validando Tecnico
        if(form.TEC_PROF_CODPROFESION.selectedIndex!=0){
            //if(form.TEC_CEST_CODCESTUDIO.selectedIndex==0){alert("Tecnico: Seleccione Centro de estudio");form.TEC_CEST_CODCESTUDIO.focus();return false;}
            if (form.TEC_POSTEDU_FECHAINICIO.value==""){alert("Tecnico: Ingrese Fecha de inicio");form.TEC_POSTEDU_FECHAINICIO.focus();return false;}
            if (form.TEC_POSTEDU_FECHATERMINO.value==""){alert("Tecnico: Ingrese Fecha de termino");form.TEC_POSTEDU_FECHATERMINO.focus();return false;}
            //if (validaformularioFecha("Tecnico",form.TEC_POSTEDU_FECHAINICIO,form.TEC_POSTEDU_FECHATERMINO)==0){return false;}
        }

        //Validando Universitaria
        if(form.UNI_PROF_CODPROFESION.selectedIndex!=0){
            //if(form.UNI_CEST_CODCESTUDIO.selectedIndex==0){alert("Universidad: Seleccione Centro de estudio");form.UNI_CEST_CODCESTUDIO.focus();return false;}
            if (form.UNI_POSTEDU_FECHAINICIO.value==""){alert("Universidad: Ingrese Fecha de inicio");form.UNI_POSTEDU_FECHAINICIO.focus();return false;}
            if (form.UNI_POSTEDU_FECHATERMINO.value==""){alert("Universidad: Ingrese Fecha de termino");form.UNI_POSTEDU_FECHATERMINO.focus();return false;}
            //if (validaformularioFecha("Universidad",form.UNI_POSTEDU_FECHAINICIO,form.UNI_POSTEDU_FECHATERMINO)==0){return false;}
        }

        //Validando PostGrago
        if(form.POS_PROF_CODPROFESION.selectedIndex!=0){
            //if(form.POS_CEST_CODCESTUDIO.selectedIndex==0){alert("Post Grado: Seleccione Centro de estudio");form.POS_CEST_CODCESTUDIO.focus();return false;}
            if (form.POS_POSTEDU_FECHAINICIO.value==""){alert("Post Grado: Ingrese Fecha de inicio");form.POS_POSTEDU_FECHAINICIO.focus();return false;}
            if (form.POS_POSTEDU_FECHATERMINO.value==""){alert("Post Grado: Ingrese Fecha de termino");form.POS_POSTEDU_FECHATERMINO.focus();return false;}
            //if (validaformularioFecha("PostGrado",form.POS_POSTEDU_FECHAINICIO,form.POS_POSTEDU_FECHATERMINO)==0){return false;}
        }

        return true;
    }

    function validarFormPostulanteCompuIdioma(form){
        //Validando Idioma
        if (form.IDI_PIDI_CODIDIOMA1.selectedIndex!=0){
            if(form.IDI_PIDI_IDINIVEL1.selectedIndex==0){alert("Idioma(1) :Seleccione nivel.");form.IDI_PIDI_IDINIVEL1.focus();return false;}
        }
        if (form.IDI_PIDI_CODIDIOMA2.selectedIndex!=0){
            if(form.IDI_PIDI_IDINIVEL2.selectedIndex==0){alert("Idioma(2) :Seleccione nivel.");form.IDI_PIDI_IDINIVEL2.focus();return false;}
        }
        if (form.IDI_PIDI_CODIDIOMA3.selectedIndex!=0){
            if(form.IDI_PIDI_IDINIVEL3.selectedIndex==0){alert("Idioma(3) :Seleccione nivel.");form.IDI_PIDI_IDINIVEL3.focus();return false;}
        }

        //Validando Computacion
        if (form.COM_PCOM_CODCOMPUTACION1.selectedIndex!=0){
            if(form.COM_PCOM_CODCOMPNIVEL1.selectedIndex==0){alert("Computaci√≤n(1) :Seleccione nivel.");form.COM_PCOM_CODCOMPNIVEL1.focus();return false;}
        }
        if (form.COM_PCOM_CODCOMPUTACION2.selectedIndex!=0){
            if(form.COM_PCOM_CODCOMPNIVEL2.selectedIndex==0){alert("Computaci√≤n(2) :Seleccione nivel.");form.COM_PCOM_CODCOMPNIVEL2.focus();return false;}
        }
        if (form.COM_PCOM_CODCOMPUTACION3.selectedIndex!=0){
            if(form.COM_PCOM_CODCOMPNIVEL3.selectedIndex==0){alert("Computaci√≤n(3) :Seleccione nivel.");form.COM_PCOM_CODCOMPNIVEL3.focus();return false;}
        }

        return true;
    }

    /*========================= Fin Registro Postulante Educacion =======*/


    /*========================= Inicio Registro Postulante Experiencia =======*/
    
    function validaFormPostExpSector(form){
    	if(form.PEXP_CODSECTOR.selectedIndex==0){
    		//No Selecciono nada, Bloquea
    		form.PEXP_DESEMPRESA.disabled=true;
    		form.AECO_CODACTECO.disabled=true;
    		form.PEXP_DESOTROAREA.disabled=true;
    		form.OCUP_CODOCUPACION.disabled=true;
    		form.PEXP_CODTCONTRATO.disabled=true;
    		form.PEXP_CANTPERACARGO.disabled=true;
    		form.PEXP_DETALLE.disabled=true;
    		form.PEXP_SUELDO.disabled=true;
    		form.PEXP_FECHAINICIO.disabled=true;
    		form.PEXP_FECHATERMINO.disabled=true;
    		form.PEXP_MOTIVOCESE.disabled=true;
    		form.PEXP_JEFENOMBRE.disabled=true;
    		form.PEXP_JEFECARGO.disabled=true;
    		form.PEXP_JEFETELEFONO.disabled=true;
    		form.PEXP_CONTINUATRAB.disabled=true;
    	}else{
    		//SeleccionÛ, Se habilitaran los controles
    		form.PEXP_DESEMPRESA.disabled=false;
    		form.AECO_CODACTECO.disabled=false;
    		form.PEXP_DESOTROAREA.disabled=false;
    		form.OCUP_CODOCUPACION.disabled=false;
    		form.PEXP_CODTCONTRATO.disabled=false;
    		form.PEXP_CANTPERACARGO.disabled=false;
    		form.PEXP_DETALLE.disabled=false;
    		form.PEXP_SUELDO.disabled=false;
    		form.PEXP_FECHAINICIO.disabled=false;
    		form.PEXP_FECHATERMINO.disabled=false;
    		form.PEXP_MOTIVOCESE.disabled=false;
    		form.PEXP_JEFENOMBRE.disabled=false;
    		form.PEXP_JEFECARGO.disabled=false;
    		form.PEXP_JEFETELEFONO.disabled=false;
    		form.PEXP_CONTINUATRAB.disabled=false;
    	}
    }

    function enviaBusquedaActEconomica(form,ctrlActEconomica,tableName){
        deleteRowsTable(tableName);

        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getFiltroActEconomicatoXML&MAES_DESMAESTRO=" + form.MAES_DESMAESTRO.value,true);
        ajax.onreadystatechange =
                                function procesaenviaBusquedaProfesion(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                       document.getElementById("divcarga").
                                                            innerHTML="<img src='images/correcto.png' width='15px' height='15px'>";

                                                       var xmlDoc = ajax.responseXML;
                                                       var tbody = document.getElementById(tableName).getElementsByTagName("TBODY")[0];

                                                       for (i = 0; i < xmlDoc.getElementsByTagName('ACTECONOMICA').length; i++){
                                                           itemXml = xmlDoc.getElementsByTagName('ACTECONOMICA')[i];
                                                           xmlaeco_codacteco = itemXml.getElementsByTagName('AECO_CODACTECO')[0];
                                                           xmlaeco_desacteco = itemXml.getElementsByTagName('AECO_DESACTECO')[0];

                                                           var row = document.createElement("TR")
                                                           var td1 = document.createElement('TD')
                                                           var td2 = document.createElement('TD')
                                                           var td3 = document.createElement('TD')

                                                           td1.innerHTML="<a href\"#\" class=\"close\"><img src=\"images/seleccionar01.JPG\" onclick=\"popupSelecionarItemCombo("+xmlaeco_codacteco.firstChild.data+","+ctrlActEconomica+");\" class=\"imgseleccionar\"></a>";
                                                           td2.appendChild(document.createTextNode(xmlaeco_codacteco.firstChild.data))
                                                           td2.className="filadato";
                                                           td3.appendChild(document.createTextNode(xmlaeco_desacteco.firstChild.data))
                                                           td3.className="filadato";


                                                           row.appendChild(td1);
                                                           row.appendChild(td2);
                                                           row.appendChild(td3);
                                                           tbody.appendChild(row);
                                                       }

                                                  }else{
                                                      document.getElementById("divcarga").
                                                                    innerHTML="error";
                                                  }
                                     }else if(ajax.readyState==1){
                                            document.getElementById("divcarga").
                                                innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }


    function enviaBusquedaOcupacion(form,ctrlOcupacion,tableName){
        deleteRowsTable(tableName);

        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getFiltroOcupaciontoXML&MAES_DESMAESTRO=" + form.MAES_DESMAESTRO.value,true);
        ajax.onreadystatechange =
                                function procesaenviaBusquedaOcupacion(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                       document.getElementById("divcarga").
                                                            innerHTML="<img src='images/correcto.png' width='15px' height='15px'>";

                                                       var xmlDoc = ajax.responseXML;
                                                       var tbody = document.getElementById(tableName).getElementsByTagName("TBODY")[0];

                                                       for (i = 0; i < xmlDoc.getElementsByTagName('OCUPACION').length; i++){
                                                           itemXml = xmlDoc.getElementsByTagName('OCUPACION')[i];
                                                           xmlOCUP_CODOCUPACION = itemXml.getElementsByTagName('OCUP_CODOCUPACION')[0];
                                                           xmlOCUP_DESOCUPACION = itemXml.getElementsByTagName('OCUP_DESOCUPACION')[0];

                                                           var row = document.createElement("TR")
                                                           var td1 = document.createElement('TD')
                                                           var td2 = document.createElement('TD')
                                                           var td3 = document.createElement('TD')

                                                           //td1.innerHTML="<a href\"#\" class=\"close\"><img src=\"images/bullet_verde.gif\" onclick=\"popupSelecionarItemCombo("+xmlOCUP_CODOCUPACION.firstChild.data+","+ctrlOcupacion+");\" class=\"imgseleccionar\"></a>";
                                                           td1.innerHTML="<a href\"#\" class=\"close\"><img src=\"images/seleccionar01.JPG\" onclick=\"popupSelecionarItemCombo("+xmlOCUP_CODOCUPACION.firstChild.data+","+ctrlOcupacion+");\" class=\"imgseleccionar\"></a>";
                                                           td2.appendChild(document.createTextNode(xmlOCUP_CODOCUPACION.firstChild.data))
                                                           td2.className="filadato";
                                                           td3.appendChild(document.createTextNode(xmlOCUP_DESOCUPACION.firstChild.data))
                                                           td3.className="filadato";


                                                           row.appendChild(td1);
                                                           row.appendChild(td2);
                                                           row.appendChild(td3);
                                                           tbody.appendChild(row);
                                                       }
                                                  }else{
                                                      document.getElementById("divcarga").
                                                                    innerHTML="error";
                                                  }
                                     }else if(ajax.readyState==1){
                                            document.getElementById("divcarga").
                                                innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }


    function validarFormPostulanteExperiencia(form){
        if(form.PEXP_CODSECTOR.selectedIndex==0) {
        	return true;
        }else{
        	if(form.PEXP_DESEMPRESA.value==""){alert("Ingrese Empresa");form.PEXP_DESEMPRESA.focus();return false;}
            if(form.AECO_CODACTECO.selectedIndex==0){alert("Seleccione Actvidiad Economica");form.AECO_CODACTECO.focus();return false;}
            if(form.PEXP_DESOTROAREA.value==""){alert("Ingrese Area");form.PEXP_DESOTROAREA.focus();return false;}
            /*
            if(form.OCUP_CODGGRUPO.selectedIndex==0){alert("Seleccione Ocupacion - Grupo A");form.OCUP_CODGGRUPO.focus();return false;}
            if(form.OCUP_CODGRUPO.selectedIndex==0){alert("Seleccione Ocupacion - Grupo B");form.OCUP_CODGRUPO.focus();return false;}
            if(form.OCUP_CODSGRUPO.selectedIndex==0){alert("Seleccione Ocupacion - Grupo C");form.OCUP_CODSGRUPO.focus();return false;}
            */
            if(form.OCUP_CODOCUPACION.selectedIndex==0){alert("Seleccione Ocupacion");form.OCUP_CODOCUPACION.focus();return false;}
            
            if(form.PEXP_CODTCONTRATO.selectedIndex==0){alert("Seleccione Tipo de contrato");form.PEXP_CODTCONTRATO.focus();return false;}
            if(form.PEXP_DETALLE.value==""){alert("Ingrese Funciones del cargo");form.PEXP_DETALLE.focus();return false;}
            if(form.PEXP_FECHAINICIO.value==""){alert("Ingrese Fecha de inicio");form.PEXP_FECHAINICIO.focus();return false;}
            if (form.PEXP_CONTINUATRAB.checked==false){
            	if(form.PEXP_FECHATERMINO.value==""){alert("Ingrese Fecha de termino");form.PEXP_FECHATERMINO.focus();return false;}
            	
            	if (validaformularioFecha("Tecnico",form.PEXP_FECHAINICIO,form.PEXP_FECHATERMINO)==0){return false;}
            }
            
            
            return true;
        }
    }
    
    function validaFormPostExpContinuaLab(form){
    	if (form.PEXP_CONTINUATRAB.checked){
    		form.PEXP_FECHATERMINO.disabled=true;
    		form.PEXP_MOTIVOCESE.disabled=true;
    		form.PEXP_JEFENOMBRE.disabled=true;
    		form.PEXP_JEFECARGO.disabled=true;
    		form.PEXP_JEFETELEFONO.disabled=true;
    	}else{
    		form.PEXP_FECHATERMINO.disabled=false;
    		form.PEXP_MOTIVOCESE.disabled=false;
    		form.PEXP_JEFENOMBRE.disabled=false;
    		form.PEXP_JEFECARGO.disabled=false;
    		form.PEXP_JEFETELEFONO.disabled=false;
    	}
    }
    /*========================= Fin Registro Postulante Experiencia ==========*/


    /*========================= Inicio Registro Empresa ======================*/
    function validaExisteEmpresaContacto(form){
        if(form.ECON_USUARIO.value==""){return false;}
        if (form.ECON_USUARIO.value.length!=8){form.ECON_USUARIO.focus();return false;}


        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getEmpContactoIsExistetoXML&ECON_USUARIO=" + form.ECON_USUARIO.value,true);
        ajax.onreadystatechange =function procesaisexiste(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                         var xmlDoc = ajax.responseXML;
                                                         xmlItem = xmlDoc.getElementsByTagName('CONTACTO')[0];
                                                         xmlexiste = xmlItem.getElementsByTagName('EXISTE')[0];
                                                         form.existe.value = xmlexiste.firstChild.data;
                                                         if (xmlexiste.firstChild.data>0){
                                                             form.ECON_DNI.value="";
                                                             document.getElementById("divdni").innerHTML =
                                                                 "<img src='images/exclamacion.png' width='15px' height='15px' alt='Existe Usuario'> Usuario ya existe.";
                                                         }else{
                                                             form.ECON_DNI.value=form.ECON_USUARIO.value;
                                                             document.getElementById("divdni").innerHTML =
                                                                 "<img src='images/correcto.png' width='20px' height='20px'>";
                                                         }
                                                  }else{
                                                        document.getElementById("divdni").
                                                            innerHTML="<font color='red'><b>error</b></font>";
                                                        }
                                     }else if(ajax.readyState==1){
                                         document.getElementById("divdni").
                                            innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }

    function validaFormRegistroEmpresa(form){
        if(form.terminook.checked==false){alert("Debe de aceptar los Terminos.");form.terminook.focus();return false;}
        
        if(form.existe.value==1){alert("Empresa: Contacto ya existe");form.ECON_USUARIO.focus();return false;}
        if(form.ECON_USUARIO.value==""){alert("Empresa: Ingrese dni como usuario.");form.ECON_USUARIO.focus();return false;}
        if(form.ECON_PASSWORD.value==""){alert("Empresa: Ingrese password.");form.ECON_PASSWORD.focus();return false;}
        if(form.ECON_PASSWORD.value!=form.passwordrep.value){alert("Verifique contrase√±a");form.ECON_PASSWORD.focus();return false;}

        //Datos de la Empresa
        if(form.EMP_RUC.value==""){alert("Empresa: Ingrese RUC.");form.EMP_RUC.focus();return false;}
        //var opcEMP_RUC = form.EMP_RUC.options[form.EMP_RUC.selectedIndex].value;
                
        if(form.EMP_RUC.value.length!=11){alert("Empresa: RUC 11 digitos.");form.EMP_RUC.focus();return false;}

        if(form.EMP_RAZONSOCIAL.value==""){alert("Empresa: Ingrese Razon social.");form.EMP_RAZONSOCIAL.focus();return false;}
        if(form.EMP_DESCRIPCION.value==""){alert("Empresa: Descripcion.");form.EMP_DESCRIPCION.focus();return false;}
        if(form.AECO_CODACTECO.selectedIndex==0){alert("Seleccione Actividad Economica");form.AECO_CODACTECO.focus();return false;}
        if(form.EMP_DIRECCION.value==""){alert("Empresa: Ingrese Direcci√≥n.");form.EMP_DIRECCION.focus();return false;}
        //Ubigeo
        if(form.UBI_CODDEPARTAMENTO.selectedIndex==0){alert("Empresa: Seleccione Departamento");form.UBI_CODDEPARTAMENTO.focus();return false;}
        if(form.UBI_CODPROVINCIA.selectedIndex==0){alert("Empresa: Seleccione Provincia");form.UBI_CODPROVINCIA.focus();return false;}
        if(form.UBI_CODDISTRITO.selectedIndex==0){alert("Empresa: Seleccione Distrito");form.UBI_CODDISTRITO.focus();return false;}

        //Contacto
        if(form.ECON_DNI.value==""){alert("Contacto: Ingrese DNI.");form.ECON_USUARIO.focus();return false;}
        if(form.ECON_NOMBRE.value==""){alert("Contacto: Ingrese Nombre.");form.ECON_NOMBRE.focus();return false;}
        if(form.ECON_CARGO.value==""){alert("Contacto: Ingrese Cargo.");form.ECON_CARGO.focus();return false;}
        if(form.ECON_EMAIL.value==""){alert("Contacto: Ingrese Email.");form.ECON_EMAIL.focus();return false;}
        return validarEmail(form.ECON_EMAIL.value);
    }
    /*========================= Fin Registro Empresa ======================*/


    /*======================= Inicio Registro Pedido ======================*/
    function validaFormRegistroPedido(form){
        if(form.PED_DESPEDIDO.value==""){alert("Pedido: Ingrese Nombre del Pedido.");form.PED_DESPEDIDO.focus();return ;}
        if(form.OCUP_CODOCUPACION.selectedIndex==0){alert("Pedido: Seleccione Puesto.");form.OCUP_CODOCUPACION.focus();return ;}
        if(form.PED_NUMVACANTE.value==""){alert("Pedido: Ingrese n√∫mero de vacantes.");form.PED_NUMVACANTE.focus();return ;}
        if(form.PED_NUMVACANTE.value=="0"){alert("Pedido: N˙mero de vacantes como minimo 1.");form.PED_NUMVACANTE.focus();return ;}
        if(form.PED_ESTFORMALES.selectedIndex==0){alert("Pedido: Seleccione Estudio formales.");form.PED_ESTFORMALES.focus();return ;}
        
        //Validando Profesion
        var opcEstForm = form.PED_ESTFORMALES.options[form.PED_ESTFORMALES.selectedIndex].value;
        
        if((opcEstForm==7) || (opcEstForm==9)){
        	if(form.PROF_CODPROFESION.selectedIndex==0){alert("Pedido: Seleccione Especialidad.");form.PROF_CODPROFESION.focus();return ;}
            if(form.PED_CODPROFESIONGRADO.selectedIndex==0){alert("Pedido: Seleccione Grado de Especialidad.");form.PED_CODPROFESIONGRADO.focus();return ;}
        }
        
        if (form.PED_TIENELICCONDUCIR.selectedIndex==1){
        	if (form.PED_LICCONDUCIR.selectedIndex==0){
        		alert("Pedido: Seleccione Categoria de Licencia de Conducir");
        		form.PED_LICCONDUCIR.focus();
        		return false;
        	}
        }
 
        if (form.PED_VEHPROPIO.selectedIndex==1){
        	if (form.PED_VEHTIPO.selectedIndex==0){
        		alert("Pedido: Seleccione Tipo de Vehiculo");
        		form.PED_VEHTIPO.focus();
        		return false;
        	}
        }
                       
        //Actitud Persona
        /*if(form.PED_ACTPERSONA1.checked){form.PED_ACTPERSONA.value = '1';}else{form.PED_ACTPERSONA.value = '0';}
        if(form.PED_ACTPERSONA2.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA3.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA4.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA5.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA6.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA7.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA8.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA9.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA10.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        if(form.PED_ACTPERSONA11.checked){form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',1';}else{form.PED_ACTPERSONA.value = form.PED_ACTPERSONA.value +',0';}
        */
        
        if(form.PED_TAREAS.value==""){alert("InformaciÛn Adicional sobre el puesto: Ingrese tareas a realizar de la vacante.");form.PED_TAREAS.focus();return ;}
        if(form.PED_REMUNERACION.value==""){alert("InformaciÛn Adicional sobre el puesto: Ingrese Remuneraci√≥n.");form.PED_REMUNERACION.focus();return ;}
        //if(form.PED_REMUNERACION.value=="0.0"){alert("Informaci√≥n Adicional sobre el puesto: Ingrese Remuneraci√≥n.");form.PED_REMUNERACION.focus();return ;}
        //if(form.PED_REMUNERACION.value=="0"){alert("Informaci√≥n Adicional sobre el puesto: Ingrese Remuneraci√≥n.");form.PED_REMUNERACION.focus();return ;}
        if(form.PED_TIPREMUNERACION.selectedIndex==0){alert("Informaci√≥n Adicional sobre el puesto: Seleccione tipo de Remuneraci√≥n.");form.PED_TIPREMUNERACION.focus();return ;}
        if (form.UBI_CODDEPARTAMENTO.selectedIndex==0){alert("Informaci√≥n Adicional sobre el puesto: Seleccione departamento");form.UBI_CODDEPARTAMENTO.focus();return false;}
        if (form.UBI_CODPROVINCIA.selectedIndex==0){alert("Informaci√≥n Adicional sobre el puesto: Seleccione provincia");form.UBI_CODPROVINCIA.focus();return false;}
        if (form.UBI_CODDISTRITO.selectedIndex==0){alert("Informaci√≥n Adicional sobre el puesto: Seleccione distrito");form.UBI_CODDISTRITO.focus();return false;}

        //Beneficio
        if(form.PED_BENEFICIO1.checked){form.PED_BENEFICIO.value = '1';}else{form.PED_BENEFICIO.value = '0';}
        if(form.PED_BENEFICIO2.checked){form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',1';}else{form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',0';}
        if(form.PED_BENEFICIO3.checked){form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',1';}else{form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',0';}
        if(form.PED_BENEFICIO4.checked){form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',1';}else{form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',0';}
        if(form.PED_BENEFICIO5.checked){form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',1';}else{form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',0';}
        if(form.PED_BENEFICIO6.checked){form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',1';}else{form.PED_BENEFICIO.value = form.PED_BENEFICIO.value +',0';}

        //Discapacidad
        if(form.PED_DISCAPACIDAD1.checked){form.PED_DISCAPACIDAD.value = '1';}else{form.PED_DISCAPACIDAD.value = '0';}
        if(form.PED_DISCAPACIDAD2.checked){form.PED_DISCAPACIDAD.value = form.PED_DISCAPACIDAD.value +',1';}else{form.PED_DISCAPACIDAD.value = form.PED_DISCAPACIDAD.value +',0';}
        if(form.PED_DISCAPACIDAD3.checked){form.PED_DISCAPACIDAD.value = form.PED_DISCAPACIDAD.value +',1';}else{form.PED_DISCAPACIDAD.value = form.PED_DISCAPACIDAD.value +',0';}
        if(form.PED_DISCAPACIDAD4.checked){form.PED_DISCAPACIDAD.value = form.PED_DISCAPACIDAD.value +',1';}else{form.PED_DISCAPACIDAD.value = form.PED_DISCAPACIDAD.value +',0';}
        if(form.PED_DISCAPACIDAD5.checked){form.PED_DISCAPACIDAD.value = form.PED_DISCAPACIDAD.value +',1';}else{form.PED_DISCAPACIDAD.value = form.PED_DISCAPACIDAD.value +',0';}


        if(form.PEDF_PUESTOES.selectedIndex==0){alert("Pedido: Seleccione Informacion ocupacional.");form.PEDF_PUESTOES.focus();return ;}
        //if(form.PEDF_ENTREVISTAFECHA.value==""){alert("Pedido: Ingrese Fecha de entrevista.");form.PEDF_ENTREVISTAFECHA.focus();return ;}
        //if(form.PEDF_FECHAEXPIRA.value==""){alert("Pedido: Ingrese Fecha de que expira la vacante.");form.PEDF_FECHAEXPIRA.focus();return ;}
        //if(form.PEDF_CONSULTOR.value==""){alert("Pedido: Ingrese el consultor responsable.");form.PEDF_CONSULTOR.focus();return ;}

        if(form.PEDF_FECHAEXPIRA.value==""){alert("Pedido: Ingrese Fecha de Cierre del Pedido.");form.PEDF_FECHAEXPIRA.focus();return ;}
        
        form.submit();
    }

    function validarPedidoEstForm(form){
    	var opcEstForm = form.PED_ESTFORMALES.options[form.PED_ESTFORMALES.selectedIndex].value;
    	
    	if((opcEstForm==7) || (opcEstForm==9)){
    		//Poder Seleccionar (Especialidad y Grado)
    		form.PROF_CODPROFESION.disabled=false;
    		form.PED_CODPROFESIONGRADO.disabled=false;
    	}else{
    		//bloquear
    		form.PROF_CODPROFESION.disabled=true;
    		form.PROF_CODPROFESION.selectedIndex=0;
    		form.PED_CODPROFESIONGRADO.disabled=true;
    		form.PED_CODPROFESIONGRADO.selectedIndex=0;
    	}
    }
    

    function validarPedidoComputacionSeleccion(comp,nivel){
        if(comp.selectedIndex==0){nivel.disabled=true;nivel.selectedIndex=0;}
        else{nivel.disabled=false;}
    }

    function validarPedidoIdiomaSeleccion(idioma,nivel){
        if(idioma.selectedIndex==0){nivel.disabled=true;nivel.selectedIndex=0;}
        else{nivel.disabled=false;}
    }

    function validarPedidoLicConducir(form){
        if(form.PED_TIENELICCONDUCIR.selectedIndex==0){ //NO
            form.PED_LICCONDUCIR.disabled=true;
            form.PED_LICCONDUCIR.selectedIndex=0;
        	//form.PED_LICCONDUCIR.style.visibility ="hidden";
        }else{
        	form.PED_LICCONDUCIR.disabled=false;
        	//form.PED_LICCONDUCIR.style.visibility ="visible";
        }
    }

    function validarPedidoVehPropio(form){
        if(form.PED_VEHPROPIO.selectedIndex==0){ //NO
            form.PED_VEHTIPO.disabled=true;
            form.PED_VEHTIPO.selectedIndex=0;
            //form.PED_VEHTIPO.style.visibility ="hidden";
        }else{
        	form.PED_VEHTIPO.disabled=false;
        	//form.PED_VEHTIPO.style.visibility ="visible";
        }
    }

    function validarPedidoPersonaACargo(form){
        if(form.PED_TIENEPERSACARGO.selectedIndex==0){  //NO
            form.PED_PERSCARGO.disabled=true;
            form.PED_PERSCARGO.selectedIndex=0;
            //form.PED_PERSCARGO.style.visibility ="hidden";
        }else{
        	form.PED_PERSCARGO.disabled=false;
        	//form.PED_PERSCARGO.style.visibility ="visible";
        }
    }
    
    function validarPedidoActPersona(form){
    	var actpersona = form.PED_ACTPERSONA.value;

    	for(var f=0;f<actpersona.length;f+=2){
    		var lb = f;
    		var opc_valor = actpersona.substring(f,lb+1);
    		
    		if(f==0){
    			if (opc_valor==1){form.PED_ACTPERSONA1.checked=true;}
    		}else if(f==2){
    			if (opc_valor==1){form.PED_ACTPERSONA2.checked=true;}
    		}else if(f==4){
    			if (opc_valor==1){form.PED_ACTPERSONA3.checked=true;}
    		}else if(f==6){
    			if (opc_valor==1){form.PED_ACTPERSONA4.checked=true;}
    		}else if(f==8){
    			if (opc_valor==1){form.PED_ACTPERSONA5.checked=true;}
    		}else if(f==10){
    			if (opc_valor==1){form.PED_ACTPERSONA6.checked=true;}
    		}else if(f==12){
    			if (opc_valor==1){form.PED_ACTPERSONA7.checked=true;}
    		}else if(f==14){
    			if (opc_valor==1){form.PED_ACTPERSONA8.checked=true;}
    		}else if(f==16){
    			if (opc_valor==1){form.PED_ACTPERSONA9.checked=true;}
    		}else if(f==18){
    			if (opc_valor==1){form.PED_ACTPERSONA10.checked=true;}
    		}else if(f==20){
    			if (opc_valor==1){form.PED_ACTPERSONA11.checked=true;}
    		}
    	}
    }
    
    function validarPedidoBeneficio(form){
    	var beneficio = form.PED_BENEFICIO.value;
    	
    	for(var f=0;f<beneficio.length;f+=2){
    		var lb = f;
    		var opc_valor = beneficio.substring(f,lb+1);
    		
    		if(f==0){
    			if (opc_valor==1){form.PED_BENEFICIO1.checked=true;}
    		}else if(f==2){
    			if (opc_valor==1){form.PED_BENEFICIO2.checked=true;}
    		}else if(f==4){
    			if (opc_valor==1){form.PED_BENEFICIO3.checked=true;}
    		}else if(f==6){
    			if (opc_valor==1){form.PED_BENEFICIO4.checked=true;}
    		}else if(f==8){
    			if (opc_valor==1){form.PED_BENEFICIO5.checked=true;}
    		}else if(f==10){
    			if (opc_valor==1){form.PED_BENEFICIO6.checked=true;}
    		}
    	}
    }
    
    function validaPedidoDiscapacidad(form){
    	var discapacidad = form.PED_DISCAPACIDAD.value;
    	
    	for(var f=0;f<discapacidad.length;f+=2){
    		var lb = f;
    		var opc_valor = discapacidad.substring(f,lb+1);
    		
    		if(f==0){
    			if (opc_valor==1){form.PED_DISCAPACIDAD1.checked=true;}
    		}else if(f==2){
    			if (opc_valor==1){form.PED_DISCAPACIDAD2.checked=true;}
    		}else if(f==4){
    			if (opc_valor==1){form.PED_DISCAPACIDAD3.checked=true;}
    		}else if(f==6){
    			if (opc_valor==1){form.PED_DISCAPACIDAD4.checked=true;}
    		}else if(f==8){
    			if (opc_valor==1){form.PED_DISCAPACIDAD5.checked=true;}
    		}
    	}
    }

    function validarPedidoDiscapacidad(form){
        if(form.PED_DISCONDISCAP.selectedIndex==0){  //NO
            form.PED_DISCAPACIDAD1.disabled=true;
            form.PED_DISCAPACIDAD2.disabled=true;
            form.PED_DISCAPACIDAD3.disabled=true;
            form.PED_DISCAPACIDAD4.disabled=true;
            form.PED_DISCAPACIDAD5.disabled=true;
            form.PED_DISCAPACIDAD1.checked=0;
            form.PED_DISCAPACIDAD2.checked=0;
            form.PED_DISCAPACIDAD3.checked=0;
            form.PED_DISCAPACIDAD4.checked=0;
            form.PED_DISCAPACIDAD5.checked=0;
        }else{
            form.PED_DISCAPACIDAD1.disabled=false;
            form.PED_DISCAPACIDAD2.disabled=false;
            form.PED_DISCAPACIDAD3.disabled=false;
            form.PED_DISCAPACIDAD4.disabled=false;
            form.PED_DISCAPACIDAD5.disabled=false;
        }
    }
    /*======================= Fin Registro Pedido ======================*/



    /*======================= Inicio Panel Postulante ===================*/
    function enviarPostPreseBreve(presentacionbreve){
        ajax = creaajax();
        ajax.open("POST","Ajax.do?method=updatePostulantePresBreve&POST_PRESENTACIONBREVE=" + presentacionbreve,true);
        ajax.onreadystatechange =function procesaisexiste(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){

                                                  }else{
                                                        //document.getElementById("divdni").
                                                          //  innerHTML="<font color='red'><b>error</b></font>";
                                                        }
                                     }else if(ajax.readyState==1){
                                         //document.getElementById("divdni").
                                            //innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }
    /*========================== Fin Panel Postulante ===================*/
    
    
    /*========================== Inicio Buscador de Pedido ==============*/
    function valdarFormBusqPedido(form){
    	form.submit();
    }
    /*======================== Fin Buscador de Pedido ===================*/
    
    
    /*========================== Inicio Form Post Idioma  ==============*/
    function validarformpostidioma(form){
    	if(form.PIDI_CODIDIOMA.selectedIndex==0){alert("Seleccione Idioma");form.PIDI_CODIDIOMA.focus();return false;}
    	if(form.PIDI_CODNIVEL.selectedIndex==0){alert("Seleccione Nivel");form.PIDI_CODNIVEL.focus();return false;}
    	
    	return true;
    }
    
    function deletePostIdioma(id){
    	if (confirm("øSeguro que desea eliminar?")) {
    		location.href="PostulanteIdioma.do?method=delete&PIDI_CODPOSTIDI="+id;
    	}else {
    	}
    }
    /*============================ Fin Form Post Idioma ================*/
    
    
    
    
    /*========================== Inicio Form Post Computacion  ==============*/
    function deletePostComputacion(id){
    	if (confirm("øSeguro que desea eliminar?")) {
    		location.href="PostulanteComputacion.do?method=delete&PCOM_CODPOSTCOM="+id;
    	}else {
    	}
    }
    
    function validarformpostcomp(form){
    	if(form.PCOM_CODCOMP.selectedIndex==0){alert("Seleccione Computacion");form.PCOM_CODCOMP.focus();return false;}
    	if(form.PCOM_CODCOMPNIVEL.selectedIndex==0){alert("Seleccione Nivel");form.PCOM_CODCOMPNIVEL.focus();return false;}
    	
    	
    	return true;
    }
    /*========================== Fin Form Post Computacion  ==============*/
    
    
    /*========================== Inicio Form Post Educacion  ==============*/
    function deletePostEducacion(id){
    	if (confirm("øSeguro que desea eliminar?")) {
    		location.href="PostulanteEducacion.do?method=delete&POSTEDU_CODPOSTEDU="+id;
    	}else {
    	}
    }
    
    function validarformpostedu(form){
    	if(form.PROF_CODPROFESION.selectedIndex==0){alert("Seleccione Profesion");form.PROF_CODPROFESION.focus();return false;}
    	if(form.POSTEDU_CODPROFESIONNIVEL.selectedIndex==0){alert("Seleccione nivel de educaciÛn");form.POSTEDU_CODPROFESIONNIVEL.focus();return false;}
    	
    	
    	
    	return true;
    }
    /*========================== Fin Form Post Educacion  ==============*/
    
    
    /*========================== Inicio Form Post Experiencia  ==============*/
    function deletePostExp(id){
    	if (confirm("øSeguro que desea eliminar?")) {
    		location.href="PostulanteExperiencia.do?method=delete&PEXP_CODPOSTEXP="+id;
    	}else {
    	}
    }
    
    function validarformpostexp(form){
    	if(form.PEXP_DESEMPRESA.value==""){alert("Postulante Experiencia Laboral: Ingrese nombre de Empresa.");form.PEXP_DESEMPRESA.focus();return false;}
    	if(form.AECO_CODACTECO.selectedIndex==0){alert("Postulante Experiencia Laboral: Seleccione actividad economica.");form.AECO_CODACTECO.focus();return false;}
    	if(form.PEXP_DESOTROAREA.value==""){alert("Postulante Experiencia Laboral: Ingrese nombre de la area.");form.PEXP_DESOTROAREA.focus();return false;}
    	
    	/*
    	if(form.OCUP_CODGGRUPO.selectedIndex==0){alert("Seleccione Ocupacion - Grupo A");form.OCUP_CODGGRUPO.focus();return false;}
        if(form.OCUP_CODGRUPO.selectedIndex==0){alert("Seleccione Ocupacion - Grupo B");form.OCUP_CODGRUPO.focus();return false;}
        if(form.OCUP_CODSGRUPO.selectedIndex==0){alert("Seleccione Ocupacion - Grupo C");form.OCUP_CODSGRUPO.focus();return false;}
        */
    	if(form.OCUP_CODOCUPACION.selectedIndex==0){alert("Postulante Experiencia Laboral: Seleccione ocupacion");form.OCUP_CODOCUPACION.focus();return false;}
    	
    	if(form.PEXP_CODTCONTRATO.selectedIndex==0){alert("Postulante Experiencia Laboral: Seleccione tipo de contrato.");form.PEXP_CODTCONTRATO.focus();return false;}
    	if(form.PEXP_DETALLE.value==""){alert("Postulante Experiencia Laboral: Ingrese funciones del cargo.");form.PEXP_DETALLE.focus();return false;}
    	if(form.PEXP_FECHAINICIO.value==""){alert("Postulante Experiencia Laboral: Ingrese fecha de inicio.");form.PEXP_FECHAINICIO.focus();return false;}
    	
    	if (form.PEXP_CONTINUATRAB.checked==false){
    		if(form.PEXP_FECHATERMINO.value==""){alert("Postulante Experiencia Laboral: Ingrese fecha de termino.");form.PEXP_FECHATERMINO.focus();return false;}
    	}
    		
    	return true;
    }
    /*========================== Fin Form Post Experiencia  ==============*/
    
    
    /*========================== Inicio Form Empresa ==================*/
    function validarFormEmpresa(form){
    	if(form.EMP_RAZONSOCIAL.value==""){alert("Empresa: Ingrese Razon social.");form.EMP_RAZONSOCIAL.focus();return false;}
    	
    	
    	return true;
    }
    /*========================== Fin Form Empresa ==================*/
    
    
    /*================ Inicio Postulante Olvido Password ==================*/
    function enviarPostulanteOlvidoPassword(form){
    	 ajax = creaajax();
         ajax.open("POST","Ajax.do?method=sendPostulantePassword&POST_NUMDOCUM=" + form.POST_NUMDOCUM.value,true);
         ajax.onreadystatechange =
                                 function procesaobtenerprovincia(){
                                      if (ajax.readyState==4){
                                                   if(ajax.status==200){
                                                	   document.getElementById("divresultado").
                                                 		innerHTML=ajax.responseText;
                                                	   form.POST_NUMDOCUM.value="";
                                                   }else{
                                                	   document.getElementById("divresultado").
                                                 		innerHTML="error";     
                                                         }
                                      }else if(ajax.readyState==1){
                                    	  document.getElementById("divresultado").
                                          		innerHTML="<img src='images/loadubunto.gif'>";
                                      }
                                     };
         ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
         ajax.send(null);
    }
    /*================ Fin Postulante Olvido Password ==================*/
    
    
    /*================ Inicio Empresa Olvido Password ==================*/
    function enviarEmpresaOlvidoPassword(form){
    	 ajax = creaajax();
         ajax.open("POST","Ajax.do?method=sendEmpresaPassword&ECON_DNI=" + form.ECON_DNI.value,true);
         ajax.onreadystatechange =
                                 function procesaobtenerprovincia(){
                                      if (ajax.readyState==4){
                                                   if(ajax.status==200){
                                                	   document.getElementById("divresultado").
                                                 		innerHTML=ajax.responseText;
                                                	   form.ECON_DNI.value="";
                                                   }else{
                                                	   document.getElementById("divresultado").
                                                 		innerHTML="error";     
                                                         }
                                      }else if(ajax.readyState==1){
                                    	  document.getElementById("divresultado").
                                          		innerHTML="<img src='images/loadubunto.gif'>";
                                      }
                                     };
         ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
         ajax.send(null);
    }
    /*================ Fin Empresa Olvido Password ==================*/
    
    
    
    /*================ Inicio Pedido enviar a un amigo ==================*/
    function enviarPedidotoAmigo(form){    	
    	if(validarEmail(form.CORREO.value)==false){return ;}
    	
    	ajax = creaajax();
        ajax.open("POST","../../Ajax.do?method=sendPedidotoAmigo&info=" + form.info.value + "&PED_CODPEDIDO=" + form.PED_CODPEDIDO.value + "&NOMBRES=" + form.NOMBRES.value + "&CORREO=" + form.CORREO.value,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                               	   document.getElementById("divcompartiraamigo").
                                                		innerHTML=ajax.responseText;
                                               	   form.NOMBRES.value="";form.CORREO.value="";
                                                  }else{
                                               	   document.getElementById("divcompartiraamigo").
                                                		innerHTML="error";     
                                                        }
                                     }else if(ajax.readyState==1){
                                   	  document.getElementById("divcompartiraamigo").
                                         		innerHTML="<img src='../../images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }    
    /*================ Fin Pedido enviar a un amigo ==================*/
    
    
    /*============= Inicio Form Actualizar Postulante ================*/
    function validarFormUpdatePostulante(form){
    	if(validarEmail(form.POST_EMAIL.value)==false){return false;}
        	
    	return true;
    }
    /*============= Fin Form Actualizar Postulante ================*/
    
    
    /*============= Inicio Graba Comentario Postulante ================*/
    function enviaPostComentario(form){    	
    	ajax = creaajax();
        ajax.open("POST","Ajax.do?method=grabaPostulanteComentario&POST_COMENTARIO=" + form.POST_COMENTARIO.value,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                               	   document.getElementById("divcargacomentario").
                                                		innerHTML=ajax.responseText;
                                                  }else{
                                               	   document.getElementById("divcargacomentario").
                                                		innerHTML="error";     
                                                        }
                                     }else if(ajax.readyState==1){
                                   	  document.getElementById("divcargacomentario").
                                         		innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }
    /*============= Fin Graba Comentario Postulante ================*/
    
    
    /*========== Inicio Actualia Convocatoria de Postulante y Pedido ================*/
    function enviaPostConvocatoria(postulante,pedido,estconvocatoria,mes,anho,div){
    	var cboMes = document.getElementById(mes);
    	var opcMes= cboMes.options[cboMes.selectedIndex].value;
    	
    	var cboAnho = document.getElementById(anho);
    	var opcAnho= cboAnho.options[cboAnho.selectedIndex].value;
    	
    	var fechaColocacion='01/01/1900';
    	if (estconvocatoria==1){
    		fechaColocacion="01/" + opcMes + "/" + opcAnho;
    	}
    	
    	ajax = creaajax();
        ajax.open("POST","Ajax.do?method=updatePostConvocado"
        		+ "&codpostulante=" + postulante
        		+ "&codpedido=" + pedido
        		+ "&convocado=" + estconvocatoria
        		+ "&divname=" + div
        		+ "&mes=" + mes
        		+ "&anho=" + anho
        		+ "&fcolocacion=" + fechaColocacion,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                	  document.getElementById(div).
                                                	  	innerHTML=ajax.responseText;
                                                	  
                                                	  if (estconvocatoria==0){
                                                		  //
                                                		  cboMes.disabled = false;
                                                		  cboAnho.disabled = false;
                                                	  }else{
                                                		  //
                                                		  cboMes.disabled = true;
                                                		  cboAnho.disabled = true;
                                                	  }
                                                  }else{
                                                	  document.getElementById(div).
                                                	  	innerHTML="error";     
                                                        }
                                     }else if(ajax.readyState==1){
                                    	 document.getElementById(div).
                                    	 	innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
        
    	//alert(div);
    	// div.innerHTML="<img src='images/loadubunto.gif'>";
    }
    /*========== Fin Actualia Convocatoria de Postulante y Pedido ================*/
    
    
    /*================== Inicio de Validacion de Cierre de Pedido =================*/
    function validarFormPedidoCierre(form){
    	if(form.PEDF_FECHACIERRE.value==""){alert("Pedido cierre: Ingrese fecha de Cierre");form.PEDF_FECHACIERRE.focus();return false;}
    	
    	
    	return true;
    }
    /*================== Fin de Validacion de Cierre de Pedido =================*/
    
    /*========== Inicio de Validacion de Busqueda de Pedido x Ubigeo ==============*/
    function validarFormPedidoBusqxUbigeo(form){
    	if (form.UBI_CODDEPARTAMENTO.selectedIndex==0){alert("Seleccionad Deparamento");form.UBI_CODDEPARTAMENTO.focus();return false;}
    	if (form.UBI_CODPROVINCIA.selectedIndex==0){alert("Seleccionad Provincia");form.UBI_CODPROVINCIA.focus();return false;}
    	if (form.UBI_CODDISTRITO.selectedIndex==0){alert("Seleccionad Distrito");form.UBI_CODDISTRITO.focus();return false;}
    	return true;
    }
    /*========== Fin de Validacion de Busqueda de Pedido x Ubigeo ==============*/
    
    /*========== Inicio de Filtro de Ocupaciones por Grupos ==============*/
    function enviaOcupGGrupo(form){
    	var opcGGrupo = form.OCUP_CODGGRUPO.options[form.OCUP_CODGGRUPO.selectedIndex].value;
    	
    	removeAllOptions(form.OCUP_CODGRUPO);
    	removeAllOptions(form.OCUP_CODSGRUPO);
    	removeAllOptions(form.OCUP_CODOCUPACION);
    	
    	form.OCUP_CODSGRUPO.disabled = true;
    	form.OCUP_CODOCUPACION.disabled = true;
    	
    	ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getFiltroOcupGrupotoXML&ggrupo=" + opcGGrupo,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                	  var xmlDoc = ajax.responseXML;
                                                	  for (i = 0; i < xmlDoc.getElementsByTagName('OCUPACION').length; i++){
                                                          xmlocupacion = xmlDoc.getElementsByTagName('OCUPACION')[i];
                                                          xmlco_ocupacion = xmlocupacion.getElementsByTagName('OCUP_CODOCUPACION')[0];
                                                          xmlde_ocupacion = xmlocupacion.getElementsByTagName('OCUP_DESOCUPACION')[0];
                                                          form.OCUP_CODGRUPO.options[i+1] = new Option(xmlde_ocupacion.firstChild.data,xmlco_ocupacion.firstChild.data);
                                                	  }
                                                	  form.OCUP_CODGRUPO.disabled = false;
                                                  }else{
                                               	   	document.getElementById("divcarga").
                                                		innerHTML="error";     
                                                        }
                                     }else if(ajax.readyState==1){
                                    	 form.OCUP_CODGRUPO.disabled = true;
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }
    
    function enviaOcupGrupo(form){
    	var opcGGrupo = form.OCUP_CODGGRUPO.options[form.OCUP_CODGGRUPO.selectedIndex].value;
    	var opcGrupo = form.OCUP_CODGRUPO.options[form.OCUP_CODGRUPO.selectedIndex].value;
    	
    	removeAllOptions(form.OCUP_CODSGRUPO);
    	removeAllOptions(form.OCUP_CODOCUPACION);
    	
    	form.OCUP_CODOCUPACION.disabled = true;
    	
    	ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getFiltroOcupSGrupotoXML&ggrupo=" + opcGGrupo + "&grupo=" + opcGrupo,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                	  var xmlDoc = ajax.responseXML;
                                                	  for (i = 0; i < xmlDoc.getElementsByTagName('OCUPACION').length; i++){
                                                          xmlocupacion = xmlDoc.getElementsByTagName('OCUPACION')[i];
                                                          xmlco_ocupacion = xmlocupacion.getElementsByTagName('OCUP_CODOCUPACION')[0];
                                                          xmlde_ocupacion = xmlocupacion.getElementsByTagName('OCUP_DESOCUPACION')[0];
                                                          form.OCUP_CODSGRUPO.options[i+1] = new Option(xmlde_ocupacion.firstChild.data,xmlco_ocupacion.firstChild.data);
                                                	  }
                                                	  form.OCUP_CODSGRUPO.disabled = false;
                                                  }else{
                                               	   	document.getElementById("divcarga").
                                                		innerHTML="error";     
                                                        }
                                     }else if(ajax.readyState==1){
                                    	 form.OCUP_CODSGRUPO.disabled = true;
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }
    
    function obtieneOcupApert(form){
    	var opcGGrupo = form.OCUP_CODGGRUPO.options[form.OCUP_CODGGRUPO.selectedIndex].value;
    	var opcGrupo = form.OCUP_CODGRUPO.options[form.OCUP_CODGRUPO.selectedIndex].value;
    	var opcSGrupo = form.OCUP_CODSGRUPO.options[form.OCUP_CODSGRUPO.selectedIndex].value;
    	
    	removeAllOptions(form.OCUP_CODOCUPACION);
    	
    	ajax = creaajax();
        ajax.open("POST","Ajax.do?method=getFiltroOcupAperttoXML&ggrupo=" + opcGGrupo + "&grupo=" + opcGrupo + "&sgrupo=" + opcSGrupo,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                	  var xmlDoc = ajax.responseXML;
                                                	  for (i = 0; i < xmlDoc.getElementsByTagName('OCUPACION').length; i++){
                                                          xmlocupacion = xmlDoc.getElementsByTagName('OCUPACION')[i];
                                                          xmlco_ocupacion = xmlocupacion.getElementsByTagName('OCUP_CODOCUPACION')[0];
                                                          xmlde_ocupacion = xmlocupacion.getElementsByTagName('OCUP_DESOCUPACION')[0];
                                                          form.OCUP_CODOCUPACION.options[i+1] = new Option(xmlde_ocupacion.firstChild.data,xmlco_ocupacion.firstChild.data);
                                                	  }
                                                	  form.OCUP_CODOCUPACION.disabled = false;
                                                  }else{
                                               	   	document.getElementById("divcarga").
                                                		innerHTML="error";     
                                                        }
                                     }else if(ajax.readyState==1){
                                    	 form.OCUP_CODOCUPACION.disabled = true;
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }
    
    /*========== Fin de Filtro de Ocupaciones por Grupos ==============*/
    
    
    /* Inicio Modif Password del Postulante*/
    function validaFormPostUpdPassword(form){
    	if (form.POST_ANTPASSWORD.value==""){alert("Ingrese password anterior.");form.POST_ANTPASSWORD.focus();return false;}
    	if (form.POST_NEWPASSWORD.value==""){alert("Ingrese nuevo password.");form.POST_NEWPASSWORD.focus();return false;}
    	if (form.POST_REPPASSWORD.value==""){alert("Ingrese password nuevamente.");form.POST_REPPASSWORD.focus();return false;}
    	
    	if (form.POST_NEWPASSWORD.value!=form.POST_REPPASSWORD.value){alert("Verificar Password.");form.POST_NEWPASSWORD.focus();return false;}
    	
    	return true;
    }
    /* Fin Modif Password del Postulante*/
    
    
    function updateSoporteOnLineEmpresa(form){
    	ajax = creaajax();
        ajax.open("POST","Ajax.do?method=saveSoporteOnLinePed&PED_CODPEDIDO=" + form.PED_CODPEDIDO.value + "&SOP_MENSAJE=" + form.SOP_MENSAJE.value,true);
        ajax.onreadystatechange =
                                function procesaobtenerprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                	  document.getElementById("divchat_carga").innerHTML="";
                                                	  form.SOP_MENSAJE.value="";
                                                	  
                                                	  obtenerSoporteOnLineEmpresa('tableChat',form);
                                                  }else{
                                               	   	document.getElementById("divchat_carga").innerHTML="error";     
                                                  }
                                     }else if(ajax.readyState==1){
                                    	 form.OCUP_CODOCUPACION.disabled = true;
                                     }
                                    };
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }
    
    function obtenerSoporteOnLineEmpresa(tableName,form){
    	deleteRowsTable(tableName);
    	
    	ajax = creaajax();
    	ajax.open("POST","Ajax.do?method=listaSoporteOnLinexPedtoXML&PED_CODPEDIDO=" + form.PED_CODPEDIDO.value,true);
        ajax.onreadystatechange =function procesaenviaprovincia(){
                                     if (ajax.readyState==4){
                                                  if(ajax.status==200){
                                                      var xmlDoc = ajax.responseXML;
                                                      var tbody = document.getElementById(tableName).getElementsByTagName("TBODY")[0];
                                                      
                                                      for (i = 0; i < xmlDoc.getElementsByTagName('SOPORTE').length; i++){
                                                    	  xmlsoporte = xmlDoc.getElementsByTagName('SOPORTE')[i];
                                                    	  
                                                    	  xmlSOP_CODSOPORTE = xmlsoporte.getElementsByTagName('SOP_CODSOPORTE')[0];
                                                    	  xmlPED_CODPEDIDO = xmlsoporte.getElementsByTagName('PED_CODPEDIDO')[0];
                                                    	  xmlSOP_DE = xmlsoporte.getElementsByTagName('SOP_DE')[0];
                                                    	  xmlSOP_MENSAJE = xmlsoporte.getElementsByTagName('SOP_MENSAJE')[0];
                                                    	  xmlSOP_FECHAREG = xmlsoporte.getElementsByTagName('SOP_FECHAREG')[0];
                                                    	  
                                                    	  var row = document.createElement("TR");
                                                          var td1 = document.createElement('TD');
                                                          var td2 = document.createElement('TD');

                                                          td1.innerHTML = "<b>" + xmlSOP_DE.firstChild.data + "</b> dice: ";
                                                    	  td2.innerHTML = "<span style=\"font-style: italic;\">" + xmlSOP_MENSAJE.firstChild.data + "</span> " +
                                                    	  			"<span style=\"color: gray;font-size: 8pt;\">" + xmlSOP_FECHAREG.firstChild.data + "</span>";
                                                          row.appendChild(td1);
                                                          row.appendChild(td2);
                                                    	  
                                                    	  tbody.appendChild(row);                                                             
                                                      }
                                                      
                                                      document.getElementById("divchat_carga").innerHTML="";
                                                  }else{
                                                        document.getElementById("divchat_carga").
                                                            innerHTML="<font color='red'><b>error</b></font>";
                                                  }
                                     }else if(ajax.readyState==1){
                                         document.getElementById("divchat_carga").
                                            innerHTML="<img src='images/loadubunto.gif'>";
                                     }
                                    };

        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(null);
    }
    
    
    