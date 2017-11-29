(function () {
  'use strict';

  var controllerId = 'edgeDlgCtrl';

  angular.module('app').controller(controllerId, ['$scope','$uibModalInstance','data', edgeDlgCtrl]);

  /**
  * Controlador del dialog de relaciones.
  */
  function edgeDlgCtrl($scope, $modalInstance, data) {

    $scope.edge = data.edge;
    $scope.inputs = data.inputs;

    $scope.inputs.forEach(function(item, index){
      if($scope.edge.type == item.type){
          $scope.selectedInput = item;
      }
    })

    // Cierra la ventana del modal.
    $scope.close = function() {
      $modalInstance.dismiss('Canceled');
    };

    // Cierra el modal devolviendo los datos utilizados.
    $scope.save = function() {
      $modalInstance.close($scope.edge);
    }

    $scope.$watch('selectedInput',function(newValue,oldValue) {

      if (newValue===oldValue) {
        return;
      }
      $scope.edge.type = newValue.type;
      $scope.edge.label = newValue.name;

    });

  } // end edgeDlg

})();
