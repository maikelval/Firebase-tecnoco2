app.controller('IClienteCtrl', function($scope, $location,$interval, $routeParams,Usuario, Aut, $firebaseAuth, Grafico,toaster) {

	String.prototype.splice = function(idx, rem, str) {
	    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
	};


	$scope.promedio = "-";





	var usuarioId = $routeParams.usuarioId;

	$scope.usuarioActual = Usuario.usuarioElegido(usuarioId);
	console.log($scope.usuarioActual);

	$scope.graph = {
		data: [],
		options: {
			showPopover: false,
			labels:["Fecha", "Temperatura"],
			ylabel: "Temperaturas",
			xlabel: "Fecha"
		}
	};

	 Grafico.getVariables(usuarioId).$loaded(function(data){
		 var suma = 0;
		 for(i in data){
			 if(data[i].hasOwnProperty('valor')){
				 var fecha = data[i].$id;
				 fecha = fecha.splice(4,0,"-");
				 fecha = fecha.splice(7,0,"-");
				 fecha = fecha.splice(10,0," ");
				 fecha = fecha.splice(13,0,":");
				 fecha = fecha.splice(16,0,":");
				 //console.log(new Date(fecha));
				 suma = suma + parseFloat(data[i].valor);
				 $scope.graph.data.push([ new Date(fecha),data[i].valor]);
			 }else{

			 }
		 }
		 //console.log(suma);
		 $scope.promedio = Math.round(suma/data.length * 100) / 100;

	 });

	 /*
	 var guardarRegistro = function(){
	 	Grafico.postVariables(usuarioId,$scope.variables).then(function(){
	 		 toaster.pop('success','Historial guardado exitosamente');
	 	 });
	 };

	 var promise;
	 $scope.start = function(){
		 if ( angular.isDefined(promise) ) return;

		 $scope.produccionIniciada = true;
		 promise = $interval(guardarRegistro, 5000);
	 };

	 $scope.stop = function(){
		if (angular.isDefined(promise)) {
            $interval.cancel(promise);
            promise = undefined;
			$scope.produccionIniciada = false;
			toaster.pop('success','El guardado de historial de ha detenido exitosamente');
          }
	 };
	 */
$scope.neW = false;
$scope.nuevaPro = function(){
	$scope.neW = true;
}
	 $scope.iniciarProduccion = function(){
		 Grafico.getVariables(usuarioId).$loaded(function(list){
			 var total = list.length;
			 var x = {
				 id: list[total-3].$id,
				 temperatura: list[total-3].valor
			 }
			 var nombreForm = document.getElementById('formu').value;
			 var produccion = {
		 		tipo_cepa: '',
		 		cantidad_cuba: '',
		 		fecha: Date.now(),
		 		inicio: x,
		 		nombre:nombreForm,
		 		fin: null
		 	};

			return produccion
		}).then(function(produccion){
			Grafico.postInicioProduccion(usuarioId,produccion).then(function(){
				console.log(produccion);
				console.log("guardado");
				$scope.produccionIniciada = true;
				$scope.neW = false;
				iniciar();
			})
			.catch(function(err){
				console.log(err);
			});
		});
	};

	$scope.terminarProduccion = function(){
		Grafico.getVariables(usuarioId).$loaded(function(list){
			var total = list.length;
			var x = {
				id: list[total-1].$id,
				temperatura: list[total-1].valor
			}
		   return x;
	   }).then(function(x){
		   Grafico.getProducciones(usuarioId).$loaded(function(producciones){
	   			 var total = producciones.length;
				 producciones[total-1];
	   			 if(!producciones[total-1].hasOwnProperty('fin')){
	   				 producciones[total-1].fin = x;
					 producciones.$save(total-1).then(function(ref){
						 console.log("Registro modificado");
						 $scope.produccionIniciada = false;
						 return ref.key === producciones[total-1].$id;
						
					 });
	   			 }else{
					 return false;
	   			 }
   			})
		});
   	};


function iniciar(){
	Grafico.getProducciones(usuarioId).$loaded(function(producciones){
		var total = producciones.length;
		if(producciones[total-1].hasOwnProperty('fin')){
			$scope.produccionIniciada = false;
		}else{
			$scope.produccionIniciada = true;
			var suma = 0;
			var media = 0;

			Grafico.getVariables(usuarioId).$loaded(function(variables){

				var inicio = variables.$indexFor(producciones[total-1].inicio.id);

				var data  = variables.slice(inicio);

				for(j in data){
					if(data[j].hasOwnProperty('valor')){
						console.log(data[j]);
						suma = suma + parseFloat(data[j].valor);
					}
				}
				$scope.promedioProduccion = media = Math.round(suma/data.length * 100) / 100;

				var i = data.length;
				var sumaVarianza = 0;
				while( i-- ){

					sumaVarianza += Math.pow( (data[i].temperatura - media), 2 );
				}

				$scope.varianza = varianza = Math.round(sumaVarianza/data.length * 100) / 100;
			});
		}
	});
}

iniciar();




	function formatearFecha(tmp){
		var date = new Date(tmp);
		var mes = date.getMonth()+1;
		var dia = date.getDate()+1;
		var ano = date.getFullYear()+1;
		console.log(dia+"/"+mes+"/"+anio);
		return date;
	}

});
