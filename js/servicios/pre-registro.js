'use strict'

app.factory('PreRegistro', function($firebaseArray, $firebaseObject, $firebaseAuth, Aut){
  /*
  var ref = firebase.database().ref();
  var preRegistros = $firebaseArray(ref.child('pre-registro'));

  // Check user auth
  var Auth = $firebaseAuth();
  var firebaseUser = Auth.$getAuth();

  var Registro = {
    all: preRegistros,

    pre_Registro: function(registro){
      registro.datetime = firebase.database.ServerValue.TIMESTAMP;
      registro.creado_por = firebaseUser.uid;
      return preRegistros.$add(registro);
    }
  };


  return Registro;
  */
});
