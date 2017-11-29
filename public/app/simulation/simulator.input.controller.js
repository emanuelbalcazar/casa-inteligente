(function() {
    'use strict';

    var controllerName = 'simulatorInputCtrl';

    angular.module('app').controller(controllerName, ['$scope', '$uibModalInstance', 'data', 'simulatorSrv', simulatorInputCtrl]);

    /**
     * Controlador de la pantalla principal.
     */
    function simulatorInputCtrl($scope,$modalInstance,data,service) {

      // Entrada recibida
      $scope.receiveInput = data;

      // Entrada ingresada por el usuario.
      $scope.userInput = data.min;

      // Se ejecuta la entrada deseada.
      $scope.excecute = function(){
        var out = {
          type : $scope.receiveInput.type,
          value : $scope.userInput
        }

        service.excecuteInput(out).then(function(data){
          console.log("Simulacion realizada con exito!");
          $modalInstance.close(data);
        },function(error){
          console.log('error');
        })
      };

      // Cierra la ventana del modal.
      $scope.close = function() {
        $modalInstance.dismiss('Canceled');
      };
    } // fin controlador.

})();
