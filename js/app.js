'use strict';

var app = angular
  .module('app', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'firebase',
    'angular-dygraphs',
    'ngCsv',
    'toaster'
  ])

  .run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.adminnistrador =localStorage.getItem('admin');
    $rootScope.state = $location.$$path;
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error thrown when the $requireSignIn promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/");
      }
    });
  }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'vistas/sesion.html',
        controller: 'AuthCtrl'
      })
      .when('/sesion', {
        templateUrl: 'vistas/sesion.html',
        controller: 'AuthCtrl'
      })
      .when('/registro', {
        templateUrl: 'vistas/registro.html',
        controller: 'AuthCtrl'
      })
      .when('/graficos/:usuarioId', {
        templateUrl: 'vistas/graficos.html',
        controller: 'GraphsCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      
      .when('/graficos/:usuarioId/:nombreGrafico',{
          templateUrl: 'vistas/graficosDetalle.html',
          controller: 'GrapihsCtrl',
          resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
              // $requireSignIn returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$requireSignIn();
            }]
          }
      })
      .when('/inicioCliente/:usuarioId', {
        templateUrl: 'vistas/inicioCliente.html',
        controller: 'IClienteCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .when('/produccion/:usuarioId', {
        templateUrl: 'vistas/historialProduccion.html',
        controller: 'HistorialCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .when('/usuarios', {
        templateUrl: 'vistas/usuarios.html',
        controller: 'BrowseCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .when('/usuarioAdmin/:usuarioId', {
        templateUrl: 'vistas/detalleAdmin.html',
        controller: 'BrowseCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .when('/usuarioCliente/:usuarioId', {
        templateUrl: 'vistas/detalleCliente.html',
        controller: 'BrowseCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .when('/perfilCliente/:usuarioId', {
        templateUrl: 'vistas/perfil-cliente.html',
        controller: 'BrowseCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .when('/perfilAdmin/:usuarioId', {
        templateUrl: 'vistas/perfil-admin.html',
        controller: 'BrowseCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
}]);
