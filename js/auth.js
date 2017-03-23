'use strict'

app.factory('Aut', function($firebaseAuth, $firebaseObject, $firebaseArray){
  var Auth = $firebaseAuth();
  var ref = firebase.database().ref();

  var Aut = {



  	usuario: {},

  	crearPerfil: function(preUser){
      Auth.$onAuthStateChanged(function(authData){
        if (authData) {
          if (preUser.perfil === "cliente") {
            return ref.child('usuarios').child(authData.uid).set({

              cantidad_cepas_destinadas_blancos: preUser.cantidad_cepas_destinadas_blancos,
              cantidad_cepas_destinadas_tintos:preUser.cantidad_cepas_destinadas_tintos,
              cantidad_cubas_totales:preUser.cantidad_cubas_totales,
              cepa_cuba_conectada:preUser.cepa_cuba_conectada,
              cepas_producidas:preUser.cepas_producidas,
              coordenadas:preUser.coordenadas,
              creado_por:preUser.creado_por,
              datetime: firebase.database.ServerValue.TIMESTAMP,
              email:preUser.email,
              fecha_conexion_cuba:preUser.fecha_conexion_cuba,
              fecha_desconexion_cuba:preUser.fecha_desconexion_cuba,
              fecha_instalacion_equipo_bodega:preUser.fecha_instalacion_equipo_bodega,
              fono:preUser.fono,
              litros_anuales:preUser.litros_anuales,
              nombre_empresa:preUser.nombre_empresa,
              password:preUser.password,
              perfil:preUser.perfil,
              representante_legal:preUser.representante_legal,
              rut:preUser.rut,
              rut_representante:preUser.rut_representante,
              ubicacion_bodega:preUser.ubicacion_bodega,
              ubicacion_oficina:preUser.ubicacion_oficina
            });
          };

          if (preUser.perfil === "admin") {
            return ref.child('usuarios').child(authData.uid).set({
              nombre: preUser.nombre,
              email: preUser.email,
              perfil: "admin"
            });
          // };
        };
      }
    },

  	sesion: function(usuario){
  		return Auth.$signInWithEmailAndPassword(usuario.email, usuario.password);
  	},

  	registro: function(usuario){
      // Solo para el 1er Admin de la BDD, una vez creado, comentar este codigo!!

      return Auth.$createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(function(firebaseUser) {
        return Aut.crearPerfil(usuario);
      }).catch(function(error) {
        console.log( error);
      });


//*********** Código para crear el resto de usuarios *****************

      // var preRegistros = $firebaseArray(ref.child('pre-registro'));

      // preRegistros.$loaded()
      //   .then(function(){
      //       angular.forEach(preRegistros, function(preUser) {
      //           if (usuario.email === preUser.email && usuario.password === preUser.password) {
      //             console.log("Existe!");
      //             return Auth.$createUserWithEmailAndPassword(usuario.email, usuario.password)
      //             .then(function(firebaseUser) {
      //               return Aut.crearPerfil(preUser);
      //             }).catch(function(error) {
      //               console.log( error);
      //             });

      //           } else {
      //             console.log("No Existe!");
      //           }
      //       })
      //   });
  	},

  	cerrarSesion: function(){
      Auth.$signOut();
    },

    sesionIniciada: function(){
		return !!Aut.usuario.perfil; //Devuelve false, null en caso de que el usuario haya o no iniciado sesión.
	},
    currentUser: function(){
        Auth.$onAuthStateChanged(function(authData){
              if (authData) {
                return authData;
              }else{
                return null;
              }
          });
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
    });

  return Aut;
});
