'use strict'

app.factory('Aut', function($firebaseAuth, $firebaseObject, $firebaseArray){
    var Auth = $firebaseAuth();
    var ref = firebase.database().ref();



    var Aut = {

        usuario: {},

        crearUsuario: function(newUser,idUser){
            console.log(newUser);

            /*return Auth.$createUserWithEmailAndPassword(newUser.email,newUser.password)
                .then(function(firebaseUser){
                console.log(firebaseUser);*/
                if (newUser.perfil === "cliente") {
                    return  ref.child('usuarios').child(idUser/*firebaseUser.uid*/).set(newUser);
                }else if (newUser.perfil === "admin") {
                    return ref.child('usuarios').child(idUser/*firebaseUser.uid*/).set({
                        nombre: newUser.nombre,
                        email: newUser.email,
                        perfil: "admin"
                    });
                }

            /*});*/


        },

        sesion: function(usuario){
            return Auth.$signInWithEmailAndPassword(usuario.email, usuario.password);
        },

        cerrarSesion: function(){
            Auth.$signOut();
        },

        sesionIniciada: function(){
            return !!Aut.usuario.perfil; //Devuelve false, null en caso de que el usuario haya o no iniciado sesión.
        }
    };

    Auth.$onAuthStateChanged(function(authData){
        if (authData) {
            Aut.usuario.perfil = $firebaseObject(ref.child('usuarios').child(authData.uid));
        }else{
            if (Aut.usuario && Aut.usuario.perfil) {
                Aut.usuario.perfil = null;
            }
        }
    })

    return Aut;
});
