angular
  .module("avaliacao", ['ui.router', 'ui.bootstrap'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routes])
  .run(['$rootScope', '$state', run]);


function routes($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  /*
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
 */
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    });
}

function run($rootScope, $state){
  $rootScope.logout = _logout.bind(this, $rootScope, $state);
}

function _logout($rootScope, $state){
  $rootScope.usuarioLogado = undefined;
  $state.go('home');
}