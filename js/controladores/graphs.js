app.controller('GraphsCtrl', function($scope, $firebaseArray,$location,$interval,$firebaseObject, $routeParams, Aut, $firebaseAuth, Grafico,toaster) {
var ref = firebase.database().ref();
$scope.usuarioActual = Aut.usuario; //Variable para controlar la info del usuario que inicia sesión
    $scope.sesionIniciada = Aut.sesionIniciada;//Variable para saber si se inició sesión o no

    $scope.usuarioId =  usuarioId = $routeParams.usuarioId;

    var nombreGrafico = $routeParams.nombreGrafico;

    
       $scope.detalle = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/temperatura/detalles/'));
  $scope.detalleCo2 = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/co2/detalles/'));
   $scope.detalleCuba = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/cuba/detalles/'));
 $scope.detalleEstanque = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/estanque/detalles/'));
  $scope.detallePaso = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/paso/detalles/'));
  



});
