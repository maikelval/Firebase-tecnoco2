'use strict'

app.controller("NavCtrl", function($scope,$rootScope, $location, Aut, toaster){
	
	$scope.usuarioActual = Aut.usuario; //Variable para controlar la info del usuario que inicia sesión
	$scope.sesionIniciada = Aut.sesionIniciada;//Variable para saber si se inició sesión o no
	console.log($rootScope.admin);
    console.log($rootScope.cliente);
	$scope.cerrarSesion = function(){
		Aut.cerrarSesion();
		toaster.pop('success', "Sesión cerrada exitosamente!")
		$location.path("/buscar");
	}
});