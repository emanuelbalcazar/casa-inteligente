(function() {
    'use strict';

    var controllerName = 'simulatorCtrl';

    angular.module('app').controller(controllerName, ['$scope', 'dialogs', '$location', 'simulatorSrv', 'machinesSrv', simulatorCtrl]);

    /**
     * Controlador de la pantalla principal.
     */
    function simulatorCtrl($scope,dialogs,$location,simulatorSrv,machinesSrv) {

      // Entradas
      $scope.inputs = [];
      // Maquinas
      $scope.machines = [];

      // Obtiene todas las entradas disponibles.
      $scope.findAllInputs = function(){
        simulatorSrv.findAllInputs().then(function(data){
          $scope.inputs = data;
        });
      }

      // Obtiene todas las maquinas disponibles.
      $scope.findAllMachines = function(){
        machinesSrv.findAll().then(function(data){
          $scope.machines = data.response;
        });
      }

      // Se obtienen todas las entradas.
      $scope.findAllInputs();
      // Se obtienen todas las maquinas de estados.
      $scope.findAllMachines();

      // Se abre el dialogo para ingresar una entrada en la simulacion.
      $scope.openInputSimulator = function(input){
        var dialog = dialogs.create('app/simulation/simulator.input.view.html', 'simulatorInputCtrl',input,{size:'sm'});

        dialog.result.then(function(result){
          console.log("Las maquinas han sido actualizadas!");
          $scope.machines = result.response;
        }, function(){
          console.log("Cancelo el dialogo!");
        });
      };

      // Edicion de una maquina.
      $scope.editMachine = function(id){
        console.log("Id recibido: " + id);
        $location.path('/machine/edit/' + id);
      }
    } // fin controlador.

})();
