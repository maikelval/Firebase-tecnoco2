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
       
      // Prepare Excel data:
  $scope.fileName = "Reporte";
  $scope.exportData = [];
  // Headers:
  $scope.exportData.push([ "Fecha", "Hora"]);
  // Data:
        Grafico.getVariablesTemperatura(usuarioId).$loaded(function(data){
               $scope.maximo = [];
             for (var i = 0; i < data.length-1; i++) {
                
                $scope.maximo.push(data[i].valor);
          var  maxi = Math.max.apply(Math,$scope.maximo);
          var  mini = Math.min.apply(Math,$scope.maximo);
          var options2 = {
            showPopover: false,
                    labels:["Fecha", "Valor"],
                    ylabel: "Valor",
                    xlabel: "Fecha",
                    valueRange: [mini,maxi]
          } 
           grafico.graph.options = options2;
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
                    var fechados = data[i].$id;
                    fechados = fechados.splice(4,0,"-");
                    fechados = fechados.splice(7,0,"-");
                    fechados = fechados.splice(10,0," ");
                    fechados = fechados.splice(13,0,":");
                    fechados = fechados.splice(16,0,":");
                    //console.log(new Date(fecha));
                    suma = suma + parseFloat(data[i].valor);
                    $scope.graph.data.push([ new Date(fecha),data[i].valor]);
                    $scope.exportData.push([fechados, data[i].valor]);
    
                }else{

                }
            }
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
                    var fechados = data[i].$id;
                    fechados = fechados.splice(4,0,"-");
                    fechados = fechados.splice(7,0,"-");
                    fechados = fechados.splice(10,0," ");
                    fechados = fechados.splice(13,0,":");
                    fechados = fechados.splice(16,0,":");
                    //console.log(new Date(fecha));
                    suma = suma + parseFloat(data[i].valor);
                    $scope.graph.data.push([ new Date(fecha),data[i].valor]);
                    $scope.exportData.push([fechados, data[i].valor]);
                }else{

                }
            }
            //console.log(suma);
            $scope.promedio = Math.round(suma/data.length * 100) / 100;
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
          var options2 = {
            showPopover: false,
                    labels:["Fecha", "Valor"],
                    ylabel: "Valor",
                    xlabel: "Fecha",
                    valueRange: [mini,maxi]
          } 
           grafico.graph.options = options2;
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
                    var fechados = data[i].$id;
                    fechados = fechados.splice(4,0,"-");
                    fechados = fechados.splice(7,0,"-");
                    fechados = fechados.splice(10,0," ");
                    fechados = fechados.splice(13,0,":");
                    fechados = fechados.splice(16,0,":");
                    //console.log(new Date(fecha));
                    suma = suma + parseFloat(data[i].valor);
                    $scope.graph.data.push([ new Date(fecha),data[i].valor]);
                    $scope.exportData.push([fechados, data[i].valor]);
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
                    var fechados = data[i].$id;
                    fechados = fechados.splice(4,0,"-");
                    fechados = fechados.splice(7,0,"-");
                    fechados = fechados.splice(10,0," ");
                    fechados = fechados.splice(13,0,":");
                    fechados = fechados.splice(16,0,":");
                    //console.log(new Date(fecha));
                    suma = suma + parseFloat(data[i].valor);
                    $scope.graph.data.push([ new Date(fecha),data[i].valor]);
                    $scope.exportData.push([fechados, data[i].valor]);
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
          var options2 = {
            showPopover: false,
                    labels:["Fecha", "Valor"],
                    ylabel: "Valor",
                    xlabel: "Fecha",
                    valueRange: [mini,maxi]
          } 
         grafico.graph.options = options2;
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
                    var fechados = data[i].$id;
                    fechados = fechados.splice(4,0,"-");
                    fechados = fechados.splice(7,0,"-");
                    fechados = fechados.splice(10,0," ");
                    fechados = fechados.splice(13,0,":");
                    fechados = fechados.splice(16,0,":");
                    //console.log(new Date(fecha));
                    suma = suma + parseFloat(data[i].valor);
                    $scope.graph.data.push([ new Date(fecha),data[i].valor]);
                    $scope.exportData.push([fechados, data[i].valor]);
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


/* Directive */
app
  .directive('excelExport',
    function () {
      return {
        restrict: 'A',
        scope: {
          fileName: "@",
            data: "&exportData"
        },
        replace: true,
        template: '<button class="btn btn-primary btn-ef btn-ef-3 btn-ef-3c mb-10" ng-click="download()">Export to Excel <i class="fa fa-download"></i></button>',
        link: function (scope, element) {
          
          scope.download = function() {

            function datenum(v, date1904) {
                if(date1904) v+=1462;
                var epoch = Date.parse(v);
                return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
              };
              
              function getSheet(data, opts) {
                var ws = {};
                var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
                for(var R = 0; R != data.length; ++R) {
                  for(var C = 0; C != data[R].length; ++C) {
                    if(range.s.r > R) range.s.r = R;
                    if(range.s.c > C) range.s.c = C;
                    if(range.e.r < R) range.e.r = R;
                    if(range.e.c < C) range.e.c = C;
                    var cell = {v: data[R][C] };
                    if(cell.v == null) continue;
                    var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
                    
                    if(typeof cell.v === 'number') cell.t = 'n';
                    else if(typeof cell.v === 'boolean') cell.t = 'b';
                    else if(cell.v instanceof Date) {
                      cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                      cell.v = datenum(cell.v);
                    }
                    else cell.t = 's';
                    
                    ws[cell_ref] = cell;
                  }
                }
                if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                return ws;
              };
              
              function Workbook() {
                if(!(this instanceof Workbook)) return new Workbook();
                this.SheetNames = [];
                this.Sheets = {};
              }
               
              var wb = new Workbook(), ws = getSheet(scope.data());
              /* add worksheet to workbook */
              wb.SheetNames.push(scope.fileName);
              wb.Sheets[scope.fileName] = ws;
              var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

              function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
              }
              
            saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), scope.fileName+'.xlsx');
            
          };
        
        }
      };
    }
 );