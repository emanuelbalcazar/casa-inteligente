(function() {
    'use strict';

    var controllerName = 'machineEditCtrl';

    angular.module('app').controller(controllerName, ['$scope', machineEditCtrl]);

    /**
     * Controlador de la pantalla principal.
     */
    function machineEditCtrl($scope) {

      /**
         * Opciones de visualizacion.
         * @type {Object}
         */
        $scope.networkOptions = {
            edges: {
                arrows: {
                    to: true
                }
            },
            nodes: {
                physics: true
            },
            locale: 'es',
            interaction: {
                navigationButtons: true,
                hoverConnectedEdges: false
            }
        };

    } // fin controlador.

})();
