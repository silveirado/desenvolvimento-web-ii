angular
    .module('avaliacao')
    .config(['$stateProvider', turmaRoute])
    .controller('TurmasCtrl', ['$scope', turmasCtrl])
    .controller('TurmaCtrl', ['$scope', '$state', '$stateParams', turmaCtrl]);


//Controller do form
function turmaCtrl($scope, $state, $stateParams) {
    _loadProfessores($scope);
    _loadTurma.apply(this, [$scope, $stateParams]);
    
    $scope.gravar = _gravar.bind(this, $scope, $state);
}

function _loadTurma($scope, $stateParams){
    var vm = this,
        id = $stateParams.id;
    
    if (id && id !== 'new'){
        var turmaRef = firebase.database().ref('/turmas/' + id);
        turmaRef.on('value', function(data){
            var turma = data.val();
            _.extend(vm, turma);
            Util.apply($scope);
        });
        
        turmaRef.on('child_changed', function(data){
            var key = data.key,
                valor = data.val();
            vm[key] = valor;
           Util.apply($scope);
        });
    }
    
}

function _gravar($scope, $state){
    var vm = this;
    if ($scope.formTurma.$valid){
        var turma = {
            nome: vm.nome,
            professor: vm.professor.id
        };
        var novaTurma = firebase.database().ref('/turmas').push(turma);
        $state.go('turma', {id: novaTurma.key});
    }
}

function _loadProfessores($scope) {
    var professoresRef = firebase.database().ref('/professores');
    $scope.professores = [];

    professoresRef.on('child_added', function (data) {
        var id = data.key,
            professor = data.val();
        $scope.professores.push({
            "id": id,
            "nome": professor.nome
        });
        Util.apply($scope);
    });

    professoresRef.on('child_changed', function (data) {
        var id = data.key,
            professor = data.val();
        console.log(id);
        _.each($scope.professores, function (p) {
            if (p.id === id) {
                p.nome = professor.nome;
                Util.apply($scope);
                return;
            }
        })
    });

    professoresRef.on('child_removed', function (data) {
        var id = data.key;
        $scope.professores = _.reject($scope.professores, function (p) {
            return p.id === id;
        });
        Util.apply($scope);
    });
}

//Controller da Listagem
function turmasCtrl($scope) {
    _loadTurmas($scope);

}


function _loadTurmas($scope) {
    $scope.turmas = [{
        nome: 'Hello World'
    }];
}

function turmaRoute($stateProvider) {
    $stateProvider
        .state('turmas', {
            url: '/turmas',
            templateUrl: 'templates/turmas.html',
            controller: 'TurmasCtrl'
        })
        .state('turma', {
            url: '/turma/:id',
            templateUrl: 'templates/turma-form.html',
            controller: 'TurmaCtrl as turma'
        })
}