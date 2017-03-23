app.controller('AuthCtrl', function($scope, $location, Aut,Usuario, toaster) {


	$scope.registro = function(usuario) {
		console.log(usuario);
		Aut.crearUsuario(usuario).then(function(){
			toaster.pop('success', 'Usuario creado exitosamente!');
			$location.path('/');
		}, function(err) {
			errMessage(err);
		});
	};

	$scope.sesion = function(usuario) {
		Aut.sesion(usuario).then(function(usuarioLogueado){

			Usuario.usuarioElegido(usuarioLogueado.uid).$loaded(function(user){

				if(user.perfil == 'cliente'){

					toaster.pop('success', 'Sesión iniciada exitosamente!');
					$location.path('/inicioCliente/'+user.$id);
				}else{
					toaster.pop('success', 'Sesión iniciada exitosamente!');
					$location.path('/usuarios');
				}
			});



		}, function(err) {
			errMessage(err);
		});
	};

	$scope.changeEmail = function(user) {
		Auth.changeEmail(user)
		.then(function() {

			// Reset form
			$scope.newEmail = '';
			$scope.oldPass = '';
			$scope.newPass = '';

			toaster.pop('success', "Email cambiado exitosamente");
		}, function(err) {
			errMessage(err);
		});
	};

	function errMessage(err) {

		var msg = "Unknown Error...";

		if(err && err.code) {
			switch (err.code) {
				case "EMAIL_TAKEN":
				msg = "Este correo ya existe"; break;
				case "INVALID_EMAIL":
				msg = "Correo inválido"; break;
				case "NETWORK_ERROR":
				msg = "Error de conexión"; break;
				case "INVALID_PASSWORD":
				msg = "Password inválido"; break;
				case "INVALID_USER":
				msg = "Usuario inválido"; break;
			}
		}

		 toaster.pop('error', msg + err);
	};


});
