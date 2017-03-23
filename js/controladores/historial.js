app.controller('HistorialCtrl', function($scope, $location, $routeParams,Usuario, Aut, $firebaseAuth,$firebaseObject,$firebaseArray, Grafico,toaster) {
var ref = firebase.database().ref();
 $scope.usuarioId =  usuarioId = $routeParams.usuarioId;
 $scope.historialNombre = $firebaseArray(ref.child('usuarios').child(usuarioId).child('/historial_produccion/'));

for (var i = 0; i < $scope.historialNombre.length; i++) {
    console.log($scope.historialNombre[i].nombre);
}
     console.log($scope.historialNombre);
	 $scope.graficos = [];
     var usuarioId = $routeParams.usuarioId;


	 $scope.getData = function(data){

		 var newData = [];

		 for(i in data){
			 var fecha = Date.parse(data[i][0]);
			 var temperatura = data[i][1];

			 newData.push([fecha,temperatura]);
		 }

		 return newData;

	 };



     Grafico.getVariables(usuarioId).$loaded(function(variables){
         Grafico.getProducciones(usuarioId).$loaded(function(producciones){
			 var count= 0;
             for(i in producciones){
                 if(producciones[i].hasOwnProperty('fin')){
                     console.log(i);
					 count++;


					 var tipocepa = '';
					 var cantidadcuba = '';
                     var nombre = '';

					 if(producciones[i].hasOwnProperty('tipo_cepa')){
						 tipocepa = producciones[i].tipo_cepa;
					 }
					  if(producciones[i].hasOwnProperty('cantidad_cuba')){
 						 cantidadcuba = producciones[i].cantidad_cuba;
 					 }
                     if(producciones[i].hasOwnProperty('nombre')){
                         nombre = producciones[i].nombre;
                     }

					 var grafico = {
                        nombre: nombre,
						 inicio: '',
						 fin: '',
						 cantidad_cuba: cantidadcuba,
						 tipo_cepa: tipocepa,
						 graph: {
                     		data: [],
                     		options: {
                     			showPopover: false,
                     			labels:["Fecha", "Temperatura"],
   								title: 'Producción '+ count,
                     			ylabel: "Temperaturas",
                     			xlabel: "Fecha"
                     		}
                     	}
					};

                     var inicio = variables.$indexFor(producciones[i].inicio.id);
                     var nombrando = variables.$indexFor(producciones[i].nombre);
					 console.log(variables[nombrando]);
                     var fin = variables.$indexFor(producciones[i].fin.id);
					 console.log(variables[fin]);
                     var data  = variables.slice(inicio, fin+1);

                      for(j in data){
             			 if(data[j].hasOwnProperty('temperatura')){
                             String.prototype.splice = function(idx, rem, str) {
                         	    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
                         	};
             				 var fecha = data[j].$id;
             				 fecha = fecha.splice(4,0,"-");
             				 fecha = fecha.splice(7,0,"-");
             				 fecha = fecha.splice(10,0," ");
             				 fecha = fecha.splice(13,0,":");
             				 fecha = fecha.splice(16,0,":");
							 if(j == 0){
								 grafico.inicio= fecha;
							 }
							 if(j==data.length -1 ){
								  grafico.fin = fecha;
							 }
             				 //console.log(new Date(fecha));
             				 //suma = suma + parseFloat(data[i].temperatura);
             				 grafico.graph.data.push([ new Date(fecha),data[j].temperatura]);
             			 }
             		 }

                     $scope.graficos.push(grafico);
                 }


             }

         });
     });

});
