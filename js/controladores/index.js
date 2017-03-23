app.controller('IndexCtrl', function($scope, $location, $routeParams, Aut, $firebaseAuth,$firebaseObject,toaster) {

    var Auth = $firebaseAuth();
    var ref = firebase.database().ref();

    console.log(Aut.sesionIniciada());
    console.log();


    if(Aut.sesionIniciada()){
        Auth.$onAuthStateChanged(function(authData){


            if(authData.hasOwnProperty('uid')){
                var user = $firebaseObject(ref.child('usuarios').child(authData.uid));

                user.$loaded().then(function(){

                    if(user.perfil == 'cliente'){
                        $location.path('/inicioCliente/'+user.$id);
                    }else{

                    }
                });
            }

        });


    }





});
