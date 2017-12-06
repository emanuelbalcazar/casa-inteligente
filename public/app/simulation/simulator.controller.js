(function () {
  'use strict';

  var controllerName = 'simulatorCtrl';

  angular.module('app').controller(controllerName, ['$scope', 'dialogs', '$location', 'simulatorSrv', 'machinesSrv', '$interval', simulatorCtrl]);

  /**
   * Controlador de la pantalla principal.
   */
  function simulatorCtrl($scope, dialogs, $location, simulatorSrv, machinesSrv, $interval) {

    // Entradas
    $scope.inputs = [];
    // Maquinas
    $scope.machines = [];

    // Obtiene todas las entradas disponibles.
    $scope.findAllInputs = function () {
      simulatorSrv.findAllInputs().then(function (data) {
        $scope.inputs = data.response;
      });
    }

    // Obtiene todas las maquinas disponibles.
    $scope.findAllMachines = function () {
      machinesSrv.findAll().then(function (data) {
        $scope.machines = data.response;
        $scope.verifyOutputs();

      });
    }

    // Se obtienen todas las entradas.
    $scope.findAllInputs();
    // Se obtienen todas las maquinas de estados.
    $scope.findAllMachines();

    // Se abre el dialogo para ingresar una entrada en la simulacion.
    $scope.openInputSimulator = function (input) {
      var dialog = dialogs.create('app/simulation/simulator.input.view.html', 'simulatorInputCtrl', input, { size: 'sm' });

      dialog.result.then(function (result) {
        console.log("Las maquinas han sido actualizadas!");
        // $scope.machines = result.response;
        // $scope.verifyOutputs();
        $scope.simulationSequence.push(result);
      }, function () {
        console.log("Cancelo el dialogo!");
      });
    };

    // Edicion de una maquina.
    $scope.editMachine = function (id) {
      console.log("Id recibido: " + id);
      $location.path('/machine/edit/' + id);
    }

    $scope.verifyOutputs = function () {
      $scope.machines.forEach(function (item, index) {
        for (var i = 0; i < item.nodes.length; i++) {
          if (item.currentState == item.nodes[i].id) {
            item.currentOutput = (item.nodes[i].output == 'true') ? true : false;
          }
        }
      });
    }

    $scope.isActive = false;

    $scope.repeat = false;

    $scope.simulationSequence = [];

    $scope.currentIndex = 0;

    $scope.simulating = false;

    $scope.removeElement = function(index){
      $scope.simulationSequence.splice(index,1);
    }

    $scope.repeat = function() {
      $scope.repeat = true;
      $scope.startSequence();
    }

    $scope.stop = function () {
      $scope.repeat = false;
      $scope.simulationStateText = 'La simulación ha concluido exitosamente!';
      
    }

    $scope.startSequence = function(){
      $scope.simulating = true;
      $scope.resetSimulation();
      $scope.simulationStateText = 'Simulando...';

      if ($scope.repeat) {
        
          $interval($scope.simulateInput, 2000, $scope.simulationSequence.length).then(function(){
            $scope.simulating = false;
            $scope.simulationStateText = 'La simulación ha concluido exitosamente!';
            $scope.currentInput = null;

            if ($scope.repeat) {
              $scope.startSequence();
            }
          });

    
      }

      /* $interval($scope.simulateInput, 2000, $scope.simulationSequence.length).then(function(){
        $scope.simulating = false;
        $scope.simulationStateText = 'La simulación ha concluido exitosamente!';
        $scope.currentInput = null;
      }); */
    }

    $scope.simulateInput = function(){
      var input = $scope.simulationSequence[$scope.currentIndex];
      console.log("Simulacion: " + input.name);
      simulatorSrv.excecuteInput(input).then(function(data){
        console.log("Simulacion realizada con exito!");
        $scope.machines = data.response;
        $scope.verifyOutputs();
      },function(error){
        console.log('error');
      })
      input.simulated = true;
      $scope.currentIndex++;
    }

    $scope.resetSimulation = function(){
      $scope.currentIndex = 0;
      $scope.simulationSequence.forEach(function (item, index) {
        item.simulated = false;
      });
    }

    $scope.resetInputs = function(){
      $scope.simulationSequence = [];
    }

    $scope.simulationStateText = 'La simulación no ha comenzado!';
  } // fin controlador.

})();
