angular
    .module("avaliacao", ['ui.router', 'ui.bootstrap'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routes])
    .run(['$rootScope', '$state', run])
    //.constant('URL_API', 'https://project-2989461822637054304.firebaseio.com/');
    .constant('URL_API', 'https://project-6331782263588372855.firebaseio.com/');


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
        })
        .state('alunos', {
            url: '/alunos',
            templateUrl: 'templates/alunos.html',
            controller: 'AlunosCtrl'
        })
        .state('professores', {
            url: '/professores',
            templateUrl: 'templates/professores.html',
            controller: 'ProfessoresCtrl'
        });

}

function run($rootScope, $state) {
    $rootScope.logout = _logout.bind(this, $rootScope, $state);
}

function _logout($rootScope, $state) {
    $rootScope.usuarioLogado = undefined;
    $state.go('home');
}