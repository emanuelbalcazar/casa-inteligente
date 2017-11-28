(function() {
    'use strict';

    var controllerName = 'simulatorCtrl';

    angular.module('app').controller(controllerName, ['$scope', 'dialogs', simulatorCtrl]);

    /**
     * Controlador de la pantalla principal.
     */
    function simulatorCtrl($scope,dialogs) {

      // Entradas
      $scope.inputs = [
        {type : 'temperature', name : 'Temperatura', unit : '°c', min : 0, max : 40},
        {type : 'humidity', name : 'Humedad', unit : '%', min : 0, max : 100}
      ]

      $scope.openInputSimulator = function(input){
        var dialog = dialogs.create('app/simulation/simulator.input.view.html', 'simulatorInputCtrl',input,{size:'sm'});

        dialog.result.then(function(result){
          console.log("Resultado: " + result);
        }, function(){
          console.log("Cancelo el dialogo!");
        });
      };

    } // fin controlador.

})();
