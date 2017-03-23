app.controller('BrowseCtrl', function($scope, $location, $routeParams, Usuario, Aut, $firebaseAuth, toaster) {

    var Auth = $firebaseAuth();
    var ref = firebase.database().ref();
    
    var config2 = {apiKey: "AIzaSyDt_uz9TUBRaj7hEI5EEuj18xYV9TWbyts",
    authDomain: "tecno-co2-c4ab9.firebaseapp.com",
    databaseURL: "https://tecno-co2-c4ab9.firebaseio.com",
    storageBucket: "tecno-co2-c4ab9.appspot.com",
    messagingSenderId: "895802275556"};
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
