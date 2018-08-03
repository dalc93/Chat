'use strict';

var app = angular.module('miChat', ['ngMaterial', 'ui.router']);

app.controller('mainController', function($scope, $state){
	//$stateParams.numero = 1;
	//$state.go('prueba', {numero:1});
});

/*JS button*/
app.controller('usuarioController', ['$scope', '$http', 'serviceUsuario', function($scope, $http, serviceUsuario) {

  $scope.usuarioRta = {};

	$scope.iniciarSesion = function(usuario){  	
  		var nombre = usuario.nombre;
  		var email = usuario.email;		
  		$scope.ocultarinicio = true;    
    		  		
  		serviceUsuario.buscarUsuario(usuario).then(function(response){
  			console.log('asdasdasd');
  			console.log(response.data.length);
  			$scope.usuarioRta = response.data[0];
  			console.log("inicio sesion: " + $scope.usuarioRta.nombre);        
  		});
  	}

}]);

app.service('serviceUsuario', function($http, $q){
	return{		
		buscarUsuario: function(usuario)
		{
			var defer = $q.defer();
			var nombre = usuario.nombre;
			var email = usuario.email;
			console.log("nombre:: " + nombre + " email:: " + email);
			$http.get('/usuario/findUsuario', {
				params: {
					nombre:nombre, 
					email:email
				}
			}).then(function(resp){
				console.log("rta:::: " + resp.nombre);
				defer.resolve(resp);				
	      	});
			return defer.promise;
		},
    listarAmigos: function(usuario){
      var defer = $q.defer();
      var nombre = usuario.nombre;
      var email = usuario.email;
      console.log("nombre:: " + nombre + " email:: " + email);
      $http.get('/usuario/listarAmigos', {
        params: {
          nombre:nombre, 
          email:email
        }
      }).then(function(resp){
        console.log("rta:::: " + resp.nombre);
        defer.resolve(resp);        
          });
      return defer.promise;
    }
	};	
});

/*Controller amigos*/
app.controller('amigosController', ['$scope', '$http', 'serviceUsuario', function($scope, $http, serviceUsuario) {

  $scope.amigos = [];

  //$scope.listarAmigos = function(usuario){
      var usuario = {};
      usuario.nombre = 'nuevo';
      usuario.email = 'nuevo@gmail.com';    
      $scope.ocultarinicio = true;    
              
      serviceUsuario.buscarUsuario(usuario).then(function(response){
        console.log(response.data.length);
        $scope.usuarioRta = response.data[0];
        var u = {};
        u.nombre = $scope.usuarioRta.amigos;
        console.log("amigos: " + $scope.usuarioRta.amigos);
        $scope.amigos.push(u);
      });
    //}

}]);

app.controller('chatController',['$http','$scope',function($http,$scope){
    $scope.chatList = []; 
    var emisor = 'nuevo';
    var receptor = 'pepe';
    $scope.getAllchat = function() {
        io.socket.get('/chat/addconv');
        $http
            .get('/chat')
            .then(function(success_data) {
                $scope.chatList = success_data;
            });
    };
    $scope.getAllchat(); 
    io.socket.on('chat', function(obj) {
        if (obj.verb === 'created') { 
            //$log.info(obj)  $scope.chatList.push(obj.data); 
            $scope.$digest(); 
        }
    });
    $scope.sendMsg = function() { 
        $log.info($scope.chatMessage); 
        io.socket.post('/chat/addconv/', { 
          emisor: emisor,
          mensaje: $scope.chatMessage,
          receptor: receptor
        }); 
        $scope.chatMessage = ''; 
    };
}]);

/*Configurar rutas*/
app.config(function($stateProvider, $urlRouterProvider){
	//$urlRouterProvider.otherwise('/index');
	$stateProvider
	.state('amigos',{
		url: '/amigos',
		templateUrl: '/templates/amigos.html',
	})
	.state('index', {
		url: '/index',
		templateUrl: 'index.html'
	})
  .state('chat',{
    url: '/chat',
    templateUrl: '/templates/chat.html'
  });
});

/*Controladores de vista*/
app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  });
app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };    

  });
app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });