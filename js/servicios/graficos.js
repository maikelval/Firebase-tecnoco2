'use strict'

app.factory('Grafico', function($firebaseArray, $firebaseObject){

  var ref = firebase.database().ref();

  var ret = {
      getVariables: function(usuarioId){
          return $firebaseArray(ref.child('usuarios').child(usuarioId).child('variables'));
      },

      getVariablesTemperatura: function(usuarioId){
          return $firebaseArray(ref.child('usuarios').child(usuarioId).child('graficos/temperatura'));
      },

            getVariablesPaso: function(usuarioId){
          return $firebaseArray(ref.child('usuarios').child(usuarioId).child('graficos/paso'));
      },

            getVariablesEstanque: function(usuarioId){
          return $firebaseArray(ref.child('usuarios').child(usuarioId).child('graficos/estanque'));
      },

            getVariablesCuba: function(usuarioId){
          return $firebaseArray(ref.child('usuarios').child(usuarioId).child('graficos/cuba'));
      },

            getVariablesCo2: function(usuarioId){
          return $firebaseArray(ref.child('usuarios').child(usuarioId).child('graficos/co2'));
      },

      postInicioProduccion: function(usuarioId,registro){
          var historial = $firebaseArray(ref.child('usuarios').child(usuarioId).child('historial_produccion'));
          //registro.datetime = firebase.database.ServerValue.TIMESTAMP;
          return historial.$add(registro);
      },
      postFinProduccion: function(usuarioId,produccion){
          var historial = $firebaseArray(ref.child('usuarios').child(usuarioId).child('historial_produccion'));
          return historial.$save(produccion);
      },
      getProduccion: function(usuarioId,produccionId){
          return $firebaseArray(ref.child('usuarios').child(usuarioId).child('historial_produccion').child(produccionId));
      },
      getProducciones: function(usuarioId){
          return $firebaseArray(ref.child('usuarios').child(usuarioId).child('historial_produccion'));
      },
      
  };

  return ret;
});
