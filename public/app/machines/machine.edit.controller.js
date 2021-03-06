(function () {
    'use strict';

    var controllerName = 'machineEditCtrl';

    angular.module('app').controller(controllerName, ['$scope', 'machinesSrv', 'simulatorSrv', '$routeParams', 'toastr', '$location', 'utils', 'dialogs', machineEditCtrl]);


    function machineEditCtrl($scope, machineSrv, simulatorSrv, $routeParams, logger, $location, utils, dialogs) {

        // Busca un automata por su ID y lo renderiza en la pantalla.
        function findById(id) {
            machineSrv.findById(id).then(function (result) {
                if (result.error) {
                    logger.error('No existe el automata con el id recibido', 'ID no encontrado');
                    return $location.path('machines');
                }

                $scope.machine = result.response;
                $scope.networkData.nodes.add($scope.machine.nodes);
                $scope.networkData.edges.add($scope.machine.edges);
            });
        }

        function findDraft() {
            machineSrv.getJson().then(function (result) {
                $scope.machine = result.response;
                $scope.networkData.nodes.add($scope.machine.nodes);
                $scope.networkData.edges.add($scope.machine.edges);
            });
        }

        // bandera que indica si el automata es nuevo.
        $scope.machine = { _id: false, name: "", nodes: [], edges: [], description: "", currentState: "" };

        if ($routeParams.id != "new") {
            findById($routeParams.id);
        }

        logger.success('Editor Activado');

        // Persiste el automata creado/editado.
        $scope.save = function () {
            if ($scope.name == "")
                return logger.error('Ingrese un nombre para el automata', 'Error');

            if ($scope.machine._id) update(); else save();
        };

        // envia a persistir un nuevo automata.
        function save() {
            if ($scope.machine.name == "") {
                return logger.error('Ingrese un nombre para el automata');
            }

            var nodes = utils.objectToArray($scope.networkData.nodes._data);
            var edges = utils.objectToArray($scope.networkData.edges._data);
            var machine = { name: $scope.machine.name, description: $scope.machine.description, nodes: nodes, edges: edges };

            machineSrv.save($scope.machine).then(function (result) {
                if (result.error)
                    return logger.error('No se pudo persistir el automata', 'Error');

                logger.success('Automata guardado');
            });
        }

        // envia a actualizar un nuevo automata.
        function update() {

            if ($scope.machine.name == "") {
                return logger.error('Ingrese un nombre para el automata');
            }

            var nodes = utils.objectToArray($scope.networkData.nodes._data);
            var edges = utils.objectToArray($scope.networkData.edges._data);
            var machine = { name: $scope.machine.name, description: $scope.machine.description, nodes: nodes, edges: edges };

            machineSrv.update($scope.machine._id, machine).then(function (result) {
                if (result.error)
                    return logger.error('No se pudo actualizar el automata', 'Error');

                //findById(result.response._id);
                logger.success('Automata actualizado');
            });
        }

        /*
        * Datos a mostrar del grafo.
        * @type {Object}
        */
        $scope.networkData = {
            nodes: new vis.DataSet(),
            edges: new vis.DataSet()
        };

        /**
         * Eventos declarados en vis js.
         * @type {Object}
         */
        $scope.networkEvents = {
            click: function (properties) {
                if (properties.nodes.length > 0) {
                    var node = $scope.networkData.nodes._data[properties.nodes[0]];
                    console.log('node: ', JSON.stringify(node));
                    logger.info('¿Salida? ' + node.output , 'Nodo ' + node.id);
                }
                else if (properties.edges.length > 0) {
                    var edge = $scope.networkData.edges._data[properties.edges[0]];
                    console.log('edge: ', JSON.stringify(edge));
                    logger.info('Minimo: ' + edge.min + ' Maximo: ' + edge.max, 'Arco ');
                }
            }
        };

        $scope.networkOptions = {
            edges: {
                arrows: {
                    to: true
                }
            },
            interaction: {
                navigationButtons: true,
                hoverConnectedEdges: false
            },
            locale: 'es',
            manipulation: {
                addNode: function (node, callback) {
                    node.label = "";
                    showNodeModal(node, callback);
                },
                editNode: function (node, callback) {
                    showNodeModal(node, callback);
                },
                addEdge: function (edge, callback) {
                    showEdgeModal(edge, callback);
                },
                editEdge: {
                    editWithoutDrag: function (edge, callback) {
                       edge = $scope.networkData.edges._data[edge.id];
                       showEdgeModal(edge, callback);
                    }
                },
                deleteNode: function (node, callback) {
                    var dlg = dialogs.confirm('¿Está seguro de que desea eliminar el nodo?', 'Eliminara ademas las relaciones entrantes y salientes', { size: 'md' });

                    dlg.result.then(function () {
                        logger.success('Nodo eliminado');
                        callback(node);
                    }, function () {
                        callback(null);
                    });
                },
                deleteEdge: function (edge, callback) {
                    var dlg = dialogs.confirm('¿Está seguro de que desea eliminar la relación?', 'Confirmación requerida', { size: 'md' });

                    dlg.result.then(function () {
                        logger.success('Relación eliminada');
                        callback(edge);
                    }, function () {
                        callback(null);
                    }); 
                }
            }
        };

        /**
         * Muestra el modal de edicion de nodo.
         * @param {Object} node nodo a editar
         * @param {Function} callback
         */
        function showNodeModal(node, callback) {
            var dlg = dialogs.create('/app/dialogs/nodeDlg.html', 'nodeDlgCtrl', node, { size: 'md' });

            dlg.result.then(
                function (newNode) {
                    delete newNode.x;
                    delete newNode.y;
                    logger.success('Guardado');
                    callback(newNode);
                }, function () {
                    callback(null);
                }
            );
        }

        /**
         * Muestra el modal de edicion de relacion.
         * @param {Object} edge
         * @param {Function} callback
         */
        function showEdgeModal(edge, callback) {
            var inputs = $scope.inputs;
            var data = { edge: edge, inputs: inputs };

            var dlg = dialogs.create('/app/dialogs/edgeDlg.html', 'edgeDlgCtrl', data, { size: 'md' });

            dlg.result.then(
                function (newEdge) {
                    newEdge.from = newEdge.from.id || newEdge.from;
                    newEdge.to = newEdge.to.id || newEdge.to;
                    logger.success('Guardado');
                    $scope.networkData.edges.update(newEdge);
                    callback(newEdge);
                }, function () {
                    callback(null);
                }
            );
        }

        // Obtiene todas las entradas disponibles.
        $scope.findAllInputs = function(){
          simulatorSrv.findAllInputs().then(function(data){
            $scope.inputs = data.response;
          });
        }

        $scope.inputs = [];

        $scope.findAllInputs();

    }

})();
