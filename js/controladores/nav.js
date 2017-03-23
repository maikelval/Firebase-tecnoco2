'use strict'

app.controller("NavCtrl", function($scope, $location, Aut, toaster){
	
	$scope.usuarioActual = Aut.usuario; //Variable para controlar la info del usuario que inicia sesión
	$scope.sesionIniciada = Aut.sesionIniciada;//Variable para saber si se inició sesión o no

	$scope.cerrarSesion = function(){
		Aut.cerrarSesion();
		toaster.pop('success', "Sesión cerrada exitosamente!")
		$location.path("/buscar");
	}
});