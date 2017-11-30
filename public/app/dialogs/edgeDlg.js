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

    // Buscar el tipo de entrada que fue seteada para este arco.
    $scope.inputs.forEach(function(item, index){
      if($scope.edge.type == item.type){
          $scope.selectedInput = item;
          $scope.min = item.min;
          $scope.max = item.max;
      }
    })

    // Cierra la ventana del modal.
    $scope.close = function() {
      $modalInstance.dismiss('Canceled');
    };

    // Cierra el modal devolviendo los datos utilizados.
    $scope.save = function() {
      if($scope.edge.min > $scope.edge.max){
        alert("El minimo no puede ser mayor al maximo!");
      }
      else{
        $modalInstance.close($scope.edge);
      }
    }

    // Se vigilan los cambios realizados dentro de la entrada seleccionada.
    $scope.$watch('selectedInput',function(newValue,oldValue) {

      if (newValue===oldValue) {
        return;
      }
      $scope.edge.type = newValue.type;
      $scope.edge.label = newValue.name;
      $scope.min = newValue.min;
      $scope.max = newValue.max;
      $scope.edge.min = newValue.min;
      $scope.edge.max = newValue.max;
    });

  } // end edgeDlg

})();
