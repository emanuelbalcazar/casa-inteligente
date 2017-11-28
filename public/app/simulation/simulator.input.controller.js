(function() {
    'use strict';

    var controllerName = 'simulatorInputCtrl';

    angular.module('app').controller(controllerName, ['$scope', '$uibModalInstance', 'data', simulatorInputCtrl]);

    /**
     * Controlador de la pantalla principal.
     */
    function simulatorInputCtrl($scope,$modalInstance,data) {

      // Entrada recibida
      $scope.receiveInput = data;
      
      // Cierra la ventana del modal.
      $scope.close = function() {
        $modalInstance.dismiss('Canceled');
      };

    } // fin controlador.

})();
