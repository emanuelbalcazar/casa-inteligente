(function() {
    'use strict';

    var serviceName = 'simulatorSrv';

    angular.module('app').factory(serviceName, ['$http', simulatorSrv]);

        function simulatorSrv($http) {

            var service = {
                // Entradas
                findAllInputs : findAllInputs,
                excecuteInput : excecuteInput,
                // Maquinas
                findAllMachines : findAllMachines
            }

            return service;

            // Obtiene todas la entradas.
            function findAllInputs() {
                return $http.get('api/inputs').then(
                function success(response) {
                    return response.data;
                },
                function error(error) {
                    return error.data;
                });
            }

            // Obtiene todas la entradas.
            function excecuteInput(input) {
                return $http.get('api/execute/' + input.type + '/' + input.value).then(
                function success(response) {
                    return response.data;
                },
                function error(error) {
                    return error.data;
                });
            }

            // Obtiene todas la maquinas de estados definidas.
            function findAllMachines(input) {
                return $http.get('api/machines').then(
                function success(response) {
                    return response.data;
                },
                function error(error) {
                    return error.data;
                });
            }
        } // fin servicio.
})();
