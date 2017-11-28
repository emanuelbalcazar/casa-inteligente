(function() {
    'use strict';

    var serviceName = 'machinesSrv';

    angular.module('app').factory(serviceName, ['$http', machinesSrv]);

        function machinesSrv($http) {

            var service = {
                findAll: findAll,
                findById: findById,
                save: save,
                update: update,
                destroy: destroy
            }

            return service;

            /**
			 * Busca todos los automatas registrados.
			 */
            function findAll() {
                return $http.get('api/machines').then(
                function success(response) {
                    return response.data;
                },
                function error(error) {
                    return error.data;
                });
            }

            /**
             * Busca un automata por su ID.
             * @param {Number} id 
             */
            function findById(id) {
                return $http.get('api/machine/' + id).then(
                    function success(response) {
                        return response.data;
                    },
                    function error(error) {
                        return error.data;
                    });
            }

            /**
             * Envia a persistir un nuevo automata.
             * @param {Object} machine 
             */
            function save(machine) {
                return $http.post('api/machine/', {data: machine}).then(
                    function success(response) {
                        return response.data;
                    },
                    function error(error) {
                        return error.data;
                    });
            }

            /**
             * Envia a actualizar un automata
             * @param {Number} id 
             * @param {Object} machine 
             */
            function update(id, machine) {
                return $http.post('api/machine/' + id, machine).then(
                    function success(response) {
                        return response.data;
                    },
                    function error(error) {
                        return error.data;
                    });
            }

            /**
             * Envia a eliminar un automata.
             * @param {Number} id 
             */
            function destroy(id) {
                return $http.delete('api/machine/' + id).then(
                    function success(response) {
                        return response.data;
                    },
                    function error(error) {
                        return error.data;
                    });
            }

        } // fin servicio.
})();