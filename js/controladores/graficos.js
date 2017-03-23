app.controller('GrapihsCtrl', function($scope, $firebaseArray,$location,$interval,$firebaseObject, $routeParams, Aut, $firebaseAuth, Grafico,toaster) {
var ref = firebase.database().ref();
$scope.usuarioActual = Aut.usuario; //Variable para controlar la info del usuario que inicia sesión
    $scope.sesionIniciada = Aut.sesionIniciada;//Variable para saber si se inició sesión o no

    $scope.usuarioId =  usuarioId = $routeParams.usuarioId;

    var nombreGrafico = $routeParams.nombreGrafico;

     String.prototype.splice = function(idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    $scope.graficosEditables = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/'));
     $scope.detalle = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/temperatura/detalles/'));
  $scope.detalleCo2 = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/co2/detalles/'));
   $scope.detalleCuba = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/cuba/detalles/'));
 $scope.detalleEstanque = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/estanque/detalles/'));
  $scope.detallePaso = $firebaseObject(ref.child('usuarios').child(usuarioId).child('graficos/paso/detalles/'));
  






    switch (nombreGrafico) {
        case "temperatura":
      
      

        grafico = {
            nombre: $scope.detalle,
            graph: {
                data: [],
                options: {
                    
        
                }
            }
        };
       

        Grafico.getVariablesTemperatura(usuarioId).$loaded(function(data){
               $scope.maximo = [];
             for (var i = 0; i < data.length-1; i++) {
                
                $scope.maximo.push(data[i].valor);
          var  maxi = Math.max.apply(Math,$scope.maximo);
          var  mini = Math.min.apply(Math,$scope.maximo);
          console.log(maxi);
          console.log(mini);
          var options2 = {
            showPopover: false,
                    labels:["Fecha", "Valor"],
                    ylabel: "Valor",
                    xlabel: "Fecha",
                    valueRange: [mini,maxi]
          } 
           grafico.graph.options = options2;
          console.log(grafico.graph.options);
          // $scope.graph.options.push({valueRange:[mini,maxi]});
        }
        console.log(options2);
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

        break;
        case "presioncuba":
        
        grafico = {
            nombre: $scope.detalleCuba,
            graph: {
                data: [],
                options: {
                }
            }
        };
        Grafico.getVariablesCuba(usuarioId).$loaded(function(data){
            $scope.maximo = [];
             for (var i = 0; i < data.length-1; i++) {
                
                $scope.maximo.push(data[i].valor);
          var  maxi = Math.max.apply(Math,$scope.maximo);
          var  mini = Math.min.apply(Math,$scope.maximo);
          console.log(maxi);
          console.log(mini);
          var options2 = {
            showPopover: false,
                    labels:["Fecha", "Valor"],
                    ylabel: "Valor",
                    xlabel: "Fecha",
                    valueRange: [mini,maxi]
          } 
         grafico.graph.options = options2;
          console.log(grafico.graph.options);
          // $scope.graph.options.push({valueRange:[mini,maxi]});
        }
        console.log(options2);
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
            console.log("FINAL!!");
            console.log(grafico);
        });
        break;
        case "concentracionco2":
        grafico = {
            nombre:  $scope.detalleCo2,
            graph: {
                data: [],
                options: {
                }
            }
        };
        Grafico.getVariablesCo2(usuarioId).$loaded(function(data){
              $scope.maximo = [];
             for (var i = 0; i < data.length-1; i++) {
                
                $scope.maximo.push(data[i].valor);
          var  maxi = Math.max.apply(Math,$scope.maximo);
          var  mini = Math.min.apply(Math,$scope.maximo);
          console.log(maxi);
          console.log(mini);
          var options2 = {
            showPopover: false,
                    labels:["Fecha", "Valor"],
                    ylabel: "Valor",
                    xlabel: "Fecha",
                    valueRange: [mini,maxi]
          } 
           grafico.graph.options = options2;
          console.log(grafico.graph.options);
          // $scope.graph.options.push({valueRange:[mini,maxi]});
        }
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
        break;
        case "presionestanque":
        grafico = {
            nombre:  $scope.detalleEstanque,
            graph: {
                data: [],
                options: {                  
                }
            }

        };
        Grafico.getVariablesEstanque(usuarioId).$loaded(function(data){
              $scope.maximo = [];
             for (var i = 0; i < data.length-1; i++) {
                
                $scope.maximo.push(data[i].valor);
          var  maxi = Math.max.apply(Math,$scope.maximo);
          var  mini = Math.min.apply(Math,$scope.maximo);
          console.log(maxi);
          console.log(mini);
          var options2 = {
            showPopover: false,
                    labels:["Fecha", "Valor"],
                    ylabel: "Valor",
                    xlabel: "Fecha",
                    valueRange: [mini,maxi]
          } 
          grafico.graph.options = options2;
          console.log(grafico.graph.options);
          // $scope.graph.options.push({valueRange:[mini,maxi]});
        }
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
        break;
        case "presionpaso":
        grafico = {
            nombre:  $scope.detallePaso,
            graph: {
                data: [],
                options: {
                }
            }
        };
        Grafico.getVariablesPaso(usuarioId).$loaded(function(data){
              $scope.maximo = [];
             for (var i = 0; i < data.length-1; i++) {
                
                $scope.maximo.push(data[i].valor);
          var  maxi = Math.max.apply(Math,$scope.maximo);
          var  mini = Math.min.apply(Math,$scope.maximo);
          console.log(maxi);
          console.log(mini);
          var options2 = {
            showPopover: false,
                    labels:["Fecha", "Valor"],
                    ylabel: "Valor",
                    xlabel: "Fecha",
                    valueRange: [mini,maxi]
          } 
         grafico.graph.options = options2;
          console.log(grafico.graph.options);
          // $scope.graph.options.push({valueRange:[mini,maxi]});
        }
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
        break;


    }


$scope.grafica={};
$scope.editarTemperatura = function(){
   
    
     switch (nombreGrafico)
     {
         case "temperatura":
         
         $scope.detalle.nombre =$scope.grafica.name;
    $scope.detalle.$save();
    console.log($scope.detalle.nombre);
    break;
    case "presioncuba":
    console.log($scope.detalleCuba);
        $scope.detalleCuba.nombre =$scope.grafica.name;
    $scope.detalleCuba.$save();
    break;
    case "presioncuba":
    console.log($scope.detalleCuba);
        $scope.detalleCuba.nombre =$scope.grafica.name;
    $scope.detalleCuba.$save();
    break;
    case "concentracionco2":
    console.log($scope.detalleCo2);
        $scope.detalleCo2.nombre =$scope.grafica.name;
    $scope.detalleCo2.$save();
    break;
     case "presionestanque":
    console.log($scope.detalleEstanque);
        $scope.detalleEstanque.nombre =$scope.grafica.name;
    $scope.detalleEstanque.$save();
    break;
    case "presionpaso":
    console.log($scope.detallePaso);
        $scope.detallePaso.nombre =$scope.grafica.name;
    $scope.detallePaso.$save();
    break;
     }
}


    $scope.grafico = grafico;

    $scope.graph = grafico.graph;

   


});
