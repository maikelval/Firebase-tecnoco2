app.controller('BrowseCtrl', function($scope, $location, $routeParams, Usuario, Aut, $firebaseAuth, toaster) {

    var Auth = $firebaseAuth();
    var ref = firebase.database().ref();
    
    var config2 = { apiKey: "AIzaSyBAawMfRuoOuliMEEmqbN9aFOySmkvwbxI",
    authDomain: "wefwefewf-3d07c.firebaseapp.com",
    databaseURL: "https://wefwefewf-3d07c.firebaseio.com",
    storageBucket: "wefwefewf-3d07c.appspot.com",
    messagingSenderId: "821672946646"};
    var secondaryApp;

    $scope.usuarios = Usuario.all;
    $scope.usuarioActual = Aut.usuario;
    var usuarioId = $routeParams.usuarioId;

    if (usuarioId) {
        $scope.usuarioElegido = Usuario.usuarioElegido(usuarioId);
    };

    $scope.registroCliente = function(usuarioElegido){
        console.log(usuarioElegido);

        if(secondaryApp == null){
           initApp2();
        }

        secondaryApp.auth().createUserWithEmailAndPassword(usuarioElegido.email, usuarioElegido.password).then(function(firebaseUser) {


            console.log(usuarioElegido)
            Aut.crearUsuario(usuarioElegido,firebaseUser.uid).then(function(){
                toaster.pop('success', 'Usuario creado exitosamente!');
            });

            secondaryApp.auth().signOut();
        });
    };

    $scope.registroAdmin = function(usuarioElegido){
        console.log(usuarioElegido);

        if(secondaryApp == null){
            initApp2();
        }

        secondaryApp.auth().createUserWithEmailAndPassword(usuarioElegido.email, usuarioElegido.password).then(function(firebaseUser) {
            console.log("User " + firebaseUser.uid + " created successfully!");
            Aut.crearUsuario(usuarioElegido,firebaseUser.uid).then(function(){
                toaster.pop('success', 'Usuario creado exitosamente!');
            });
            secondaryApp.auth().signOut();
        });
    };

    $scope.editarCliente = function(usuarioElegido){
        console.log(usuarioElegido);
        Usuario.editarUsuario(usuarioElegido).then(function(){
            toaster.pop('success', 'Usuario editado exitosamente');
        });
    };
   
    


    $scope.editarAdmin = function(usuarioElegido){
        console.log(usuarioElegido);
        Usuario.editarUsuario(usuarioElegido).then(function(){
            toaster.pop('success','Usuario editado exitosamente');
        });
    };

    $scope.editarAdminPass = function(usuarioElegido){
        console.log(usuarioElegido);
        Auth.$updatePassword(usuarioElegido.password).then(function() {
            toaster.pop('success',"Password cambiado exitosamente!");
        }).catch(function(error) {
            toaster.pop("Error", error);
        });
    };

    $scope.editarClientePass = function(usuarioElegido){
        console.log(usuarioElegido);
        Auth.$updatePassword(usuarioElegido.password).then(function() {
            toaster.pop('success', "Password changed successfully!");
        }).catch(function(error) {
            toaster.pop("error", error);
        });
    };






    function initApp2(){
        secondaryApp =  firebase.initializeApp(config2, "fghfhgfhfg");
    }


});
