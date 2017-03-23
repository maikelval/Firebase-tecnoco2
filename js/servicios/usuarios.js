'use strict'

app.factory('Usuario', function($firebaseArray, $firebaseObject){
  
  var ref = firebase.database().ref();
  var usuarios = $firebaseArray(ref.child('usuarios'));

  var Usuario = {
    all: usuarios,

    usuarioElegido: function(usuarioId){
      return $firebaseObject(ref.child('usuarios').child(usuarioId));
    },

    editarUsuario: function(usuarioElegido){
      return usuarioElegido.$save();
    }
  };


  return Usuario;
});