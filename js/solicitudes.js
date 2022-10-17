//EVENTOS O FUNCIONALIDADES PARA TABLA CABAÑAS

function limpiar_formulario(){

		$("#idClient").val("");
		$("#nombreClient").val("");
		$("#mailClient").val("");
		$("#edadClient").val("");
		$("#idMensaje").val("");
		$("#valorMensaje").val("");
		$("#idCabin").val("");
		$("#idBrand").val("");
		$("#idRooms").val("");
		$("#CategoryID").val("");
		$("#idName").val("");
}

function consultarclientes(){
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			
		},
		
        success:function(clientes){
			//console.log(clientes);
			let cs=clientes.items;
			//let myTable = "<table border='3px outset'>";
			let myTable = "<center> <table border='3px solid brown'> <tr> <th>ID</th> <th>NOMBRE</th> <th>CORREO</th> <th>EDAD</th></tr>"
			$("#listaClientes").empty();
			for (i=0;i<cs.length;i++){
				myTable+="<tr>";
				myTable+="<td style='width:25px'>"+cs[i].id+"</td>";
				myTable+="<td style='width:150px'>"+cs[i].name+"</td>";
				myTable+="<td style='width:150px'>"+cs[i].email+"</td>";
				myTable+="<td style='width:25px'>"+cs[i].age+"</td>";
				myTable+="<td> <button onclick='borrarCliente("+cs[i].id+")'>Borrar</Button>";
				myTable+="</tr>";
				//$("#listaClientes").append("<b>"+cs[i].id+"</b> "+cs[i].name+cs[i].email+cs[i].age);
				//$("#listaClientes").append("<Button onclick='borrarCliente("+cs[i].id+")'>Borrar</Button><br>");
			}
			myTable+="</table>";
			$("#listaClientes").append(myTable);
        }

    });
}

function guardarCliente(){
	
	let idClient=$("#idClient").val();
	let nombreClient=$("#nombreClient").val();
	let mailClient=$("#mailClient").val();
	let edadClient=$("#edadClient").val();
	
	let data={
		id:idClient,
		name:nombreClient,
		email:mailClient,
		age:edadClient
	}
	let datosaenviar=JSON.stringify(data)
	console.log(datosaenviar);
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        datatype:'json',
		data:datosaenviar,
		contentType:'application/json',
		
		error: function(xhr, status){
			//alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultarclientes();
			
		},
		
        success:function(json){
			console.log(json);
        }

    });
}

function editarCliente(){
	
	let idClient=$("#idClient").val();
	let nombreClient=$("#nombreClient").val();
	let mailClient=$("#mailClient").val();
	let edadClient=$("#edadClient").val();
	
	let data={
		id:idClient,
		name:nombreClient,
		email:mailClient,
		age:edadClient
	}
	let datosaenviar=JSON.stringify(data)
	console.log(datosaenviar);
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        datatype:'json',
		data:datosaenviar,
		contentType:'application/json',
		
		error: function(xhr, status){
			//alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultarclientes();
			
		},
		
        success:function(json){
			console.log(json);
        }

    });
}

function borrarCliente(idClient){
	
	let data={
		id:idClient
	}
	let datosaenviar=JSON.stringify(data)
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        datatype:'json',
		data:datosaenviar,
		contentType:'application/json',
		
		error: function(xhr, status){
			//alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultarclientes();
			
		},
		
        success:function(json){
			console.log(json);
        }

    });
}

function validarCampo(id){
	if(id!= ""){
		return true;
	}
	else{
		return false;
	}
}

function consultaID(id){

	if(!validarCampo(id)){
		alert("Debe ingresar ID valido a buscar"+id.attr("id"));
	
	}
	else{
		
	let idClient=$("#idClient").val();
	console.log(idClient);
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client/"+idClient,
		type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('Escriba un valor numerico y existente');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			
		},
		
        success:function(clientes){
			
			tabla = "<center><table border='1'>";
				filas = "";
				if (clientes.items.length > 0){
					
					//console.log(clientes);
					let cs=clientes.items;
					//let myTable = "<table border='3px outset'>";
					let myTable = "<center> <table border='3px solid brown'> <tr> <th>ID</th> <th>NOMBRE</th> <th>CORREO</th> <th>EDAD</th></tr>"
					$("#listaClientes").empty();
					for (i=0;i<cs.length;i++){
						myTable+="<tr>";
						myTable+="<td style='width:25px'>"+cs[i].id+"</td>";
						myTable+="<td style='width:150px'>"+cs[i].name+"</td>";
						myTable+="<td style='width:150px'>"+cs[i].email+"</td>";
						myTable+="<td style='width:25px'>"+cs[i].age+"</td>";
						myTable+="</tr>";
						//$("#listaClientes").append("<b>"+cs[i].id+"</b> "+cs[i].name+cs[i].email+cs[i].age);
						//$("#listaClientes").append("<Button onclick='borrarCliente("+cs[i].id+")'>Borrar</Button><br>");
					}
					myTable+="</table>";
					$("#listaClientes").append(myTable);
					
					
					

					
				}
				else{
					alert("El registro No existe")
					limpiar_formulario();
					$("#listaClientes").empty();
				}
			
				
        }

    });
	}
}

function escribirMensaje(){
	
	let idMensaje=$("#idMensaje").val();
	let valorMensaje=$("#valorMensaje").val();
	
	let data3={
		id:idMensaje,
		messagetext:valorMensaje,
	}
	let datosaenviar3=JSON.stringify(data3)
	console.log(datosaenviar3);
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        datatype:'json',
		data:datosaenviar3,
		contentType:'application/json',
		
		error: function(xhr, status){
			//alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			
		}

    });

}


function mostrarMensajes(){
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			
		},
		
        success:function(mensajes){

			let ms=mensajes.items;
			let tabla2 = "<center> <table border='3px solid brown'> <tr> <th>ID</th> <th>MENSAJE</th></tr>"
			$("#listaMensajes").empty();
			for (i=0;i<ms.length;i++){
				tabla2+="<tr>";
				tabla2+="<td style='width:25px'>"+ms[i].id+"</td>";
				tabla2+="<td style='width:360px'>"+ms[i].messagetext+"</td>";
				tabla2+="<td> <button onclick='borrarMensaje("+ms[i].id+")'>Borrar</Button>";
				tabla2+="</tr>";
			}
			tabla2+="</table></center>";
			$("#listaMensajes").append(tabla2);
        }

    });
}

function borrarMensaje(idMensaje){
	
		let data6={
		id:idMensaje
	}
	let datosaenviar6=JSON.stringify(data6)
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        datatype:'json',
		data:datosaenviar6,
		contentType:'application/json',
		
		error: function(xhr, status){
			//alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			mostrarMensajes();
			
		},
		
        success:function(json){
			console.log(json);
        }

    });
}

function consultarCabin(){
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			
		},
		
        success:function(cabines){
			//console.log(clientes);
			let cb=cabines.items;
			//let myTable = "<table border='3px outset'>";
			let Tabla3 = "<center> <table border='3px solid brown'> <tr> <th>ID</th> <th>BRAND</th> <th>ROOMS</th> <th>CATEGORY ID</th><th>NAME</th></tr>"
			$("#listacabines").empty();
			for (i=0;i<cb.length;i++){
				Tabla3+="<tr>";
				Tabla3+="<td style='width:30px'>"+cb[i].id+"</td>";
				Tabla3+="<td style='width:150px'>"+cb[i].brand+"</td>";
				Tabla3+="<td style='width:30px'>"+cb[i].rooms+"</td>";
				Tabla3+="<td style='width:120px'>"+cb[i].category_id+"</td>";
				Tabla3+="<td style='width:300px'>"+cb[i].name+"</td>";
				Tabla3+="<td> <button onclick='borrarCabin("+cb[i].id+")'>Borrar</Button>";
				Tabla3+="</tr>";
			}
			Tabla3+="</table>";
			$("#listacabines").append(Tabla3);
        }

    });
}

function guardarCabin(){
	
	let idCabin=$("#idCabin").val();
	let idBrand=$("#idBrand").val();
	let idRooms=$("#idRooms").val();
	let CategoryID=$("#CategoryID").val();
	let idName=$("#idName").val();
	
	let data7={
		id:idCabin,
		brand:idBrand,
		rooms:idRooms,
		category_id:CategoryID,
		name:idName
	}
	let datosaenviar7=JSON.stringify(data7)
	console.log(datosaenviar7);
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"POST",
        datatype:'json',
		data:datosaenviar7,
		contentType:'application/json',
		
		error: function(xhr, status){
			//alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultarCabin();
			
		},
		
        success:function(json){
			console.log(json);
        }

    });
}

function editarCabin(){
	
	let idCabin=$("#idCabin").val();
	let idBrand=$("#idBrand").val();
	let idRooms=$("#idRooms").val();
	let CategoryID=$("#CategoryID").val();
	let idName=$("#idName").val();
	
	let data8={
		id:idCabin,
		brand:idBrand,
		rooms:idRooms,
		category_id:CategoryID,
		name:idName
	}
	let datosaenviar8=JSON.stringify(data8)
	console.log(datosaenviar8);
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"PUT",
        datatype:'json',
		data:datosaenviar8,
		contentType:'application/json',
		
		error: function(xhr, status){
			//alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultarCabin();
			
		},
		
        success:function(json){
			console.log(json);
        }

    });
}

function borrarCabin(idCabin){
	
	let data9={
		id:idCabin
	}
	let datosaenviar9=JSON.stringify(data9)
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:"DELETE",
        datatype:'json',
		data:datosaenviar9,
		contentType:'application/json',
		
		error: function(xhr, status){
			//alert('ha sucedido un problema');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultarCabin();
			
		},
		
        success:function(json){
			console.log(json);
        }

    });
}

function cabinID(id){

	let idCabin=$("#idCabin").val();
	console.log(idCabin);
	
	$.ajax({
        url:"https://g8865d0e120845c-bdtest.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/cabin/cabin/"+idCabin,
		type:"GET",
        datatype:"json",

		error: function(xhr, status){
			alert('Escriba un valor numerico y existente');
		},
		
		complete: function(xhr, status){
			//alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			
		},
		
        success:function(cabines){
			
			tabla = "<center><table border='1'>";
				filas = "";
				if (cabines.items.length > 0){
					
			let cbe=cabines.items;
			//let myTable = "<table border='3px outset'>";
			let Tabla4 = "<center> <table border='3px solid brown'> <tr> <th>ID</th> <th>BRAND</th> <th>ROOMS</th> <th>CATEGORY ID</th><th>NAME</th></tr>"
			$("#listacabines").empty();
			for (i=0;i<cbe.length;i++){
				Tabla4+="<tr>";
				Tabla4+="<td style='width:30px'>"+cbe[i].id+"</td>";
				Tabla4+="<td style='width:150px'>"+cbe[i].brand+"</td>";
				Tabla4+="<td style='width:30px'>"+cbe[i].rooms+"</td>";
				Tabla4+="<td style='width:120px'>"+cbe[i].category_id+"</td>";
				Tabla4+="<td style='width:300px'>"+cbe[i].name+"</td>";
				Tabla4+="<td> <button onclick='borrarCabin("+cbe[i].id+")'>Borrar</Button>";
				Tabla4+="</tr>";
			}
			Tabla4+="</table>";
			$("#listacabines").append(Tabla4);
						
				}
				else{
					alert("El registro No existe")
					limpiar_formulario();
					$("#listacabines").empty();
				}
			
				
        }

    });
}