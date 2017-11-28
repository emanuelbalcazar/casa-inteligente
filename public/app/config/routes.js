// Modulo de rutas.
(function () {
	'use strict';

	var app = angular.module('app');

  	// Obtiene las rutas definidas.
  	app.constant('routes', getRoutes());

	// Configura las rutas y quien las resuelve.
    app.config(['$routeProvider', 'routes', routeConfigurator]);

	// Registra cada ruta en el provider, con su correspondiente configuracion.
	function routeConfigurator($routeProvider, routes) {

        routes.forEach(function(r) {
            $routeProvider.when(r.url, r.config);
        });

        $routeProvider.otherwise({ redirectTo: '/home' });
    }

	//	Define las rutas disponibles de la aplicacion.
  	function getRoutes() {
		return [
			{
				url: '/home',
				config: {
					title: 'Inicio',
					templateUrl: 'app/home/home.view.html',
					controller: 'homeCtrl'
				}
			},
			{
				url: '/simulation',
				config: {
					title: 'Simulación',
					templateUrl: 'app/simulation/simulator.view.html',
					controller: 'simulatorCtrl'
				}
			},
			{
				url: '/machine/edit/:id',
				config: {
					title: 'Edicion de una maquina',
					templateUrl: 'app/machines/machine.edit.html',
					controller: 'machineEditCtrl'
				}
			}
	  	];
	}

})();
