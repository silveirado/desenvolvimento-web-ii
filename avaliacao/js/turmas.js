angular
    .module('avaliacao')
    .config(['$stateProvider', turmaRoute])
    .controller('TurmasCtrl', ['$scope', turmasCtrl])
    .controller('TurmaCtrl', ['$scope', '$state', '$stateParams', turmaCtrl]);


//Controller do form
function turmaCtrl($scope, $state, $stateParams) {

    $scope.gravar = _gravar.bind(this, $scope, $state);
    $scope.adicionarAluno = _adicionarAluno.bind(this, $scope);
    $scope.filtrarAlunos =  _filtrarAlunos.bind(this, $scope);
    $scope.loadAlunosTurma = _loadAlunosTurma.bind(this, $scope);
    $scope.removerAluno = _removerAluno.bind(this, $scope);
    
    _loadProfessores($scope);
    _loadAlunos($scope);
    _loadTurma.apply(this, [$scope, $stateParams]);
    

}

//Controller da Listagem
function turmasCtrl($scope) {
    _loadTurmas($scope);

}

function _loadAlunosTurma($scope){
    var vm = this;
    $scope.alunosTurma = [];
    _.each(vm.alunos, function(alunoId){
        var alunoRef = firebase.database().ref('/alunos/' + alunoId);
        alunoRef.on('value', function(data){
           var key = data.key,
            aluno = data.val();
            $scope.alunosTurma.push({
                id: key,
                nome: aluno.nome,
                matricula: aluno.matricula,
                email: aluno.email
            });
            Util.apply($scope);
        });
    });
    
}

function _loadTurma($scope, $stateParams) {
    var vm = this,
        id = $stateParams.id;

    if (id && id !== 'new') {
        var turmaRef = firebase.database().ref('/turmas/' + id);
        turmaRef.on('value', function (data) {
            var turma = data.val();
            _.extend(vm, turma);
            vm.id = data.key;

            firebase
                .database()
                .ref('professores/' + turma.professor)
                .once('value')
                .then(function (data) {
                    vm.professor = {
                        id: data.key,
                        nome: data.val().nome
                    }
                    Util.apply($scope);
                });
            $scope.filtrarAlunos();
            $scope.loadAlunosTurma();
            Util.apply($scope);
        });

        turmaRef.on('child_changed', function (data) {
            var key = data.key,
                valor = data.val();
            if (key === 'professor') {
                firebase
                    .database()
                    .ref('professores/' + turma.professor)
                    .once('value')
                    .then(function (data) {
                        vm.professor = {
                            id: data.key,
                            nome: data.val().nome
                        }
                        Util.apply($scope);
                    });

            } else {
                vm[key] = valor;
                $scope.loadAlunosTurma();
                Util.apply($scope);
            }
        });
    }

}

function _gravar($scope, $state) {
    var vm = this;
    if ($scope.formTurma.$valid) {
        var turma = {
            nome: vm.nome,
            professor: vm.professor.id
        };
        var novaTurma = firebase.database().ref('/turmas').push(turma);
        $state.go('turmas');
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

function _loadTurmas($scope) {
    $scope.turmas = {};
    var turmasRef = firebase.database().ref('/turmas/');

    turmasRef.on('child_added', _carregarTurma.bind(this, $scope));

    turmasRef.on('child_changed', _carregarTurma.bind(this, $scope));

    turmasRef.on('child_removed', function (data) {
        delete $scope.turmas[data.key];
        Util.apply($scope);
    });

}

function _carregarTurma($scope, data) {
    var id = data.key,
        turma = data.val();
    $scope.turmas[id] = turma;
    firebase
        .database()
        .ref('professores/' + turma.professor)
        .once('value')
        .then(function (data) {
            $scope.turmas[id].professorNome = data.val().nome;
            Util.apply($scope);
        });

    Util.apply($scope);
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

function _filtrarAlunos($scope){
    var vm = this;
    if ($scope.alunosBanco && vm.alunos){
        $scope.alunos = _.reject($scope.alunosBanco, function(aluno){
           return _.some(vm.alunos, function(a){
              return a === aluno.id; 
           });
        });
        Util.apply($scope);
    }
}

function _loadAlunos($scope){
    var alunosRef = firebase.database().ref('/alunos');
    $scope.alunosBanco = [];

    alunosRef.on('child_added', function (data) {
        var id = data.key,
            aluno = data.val();
        $scope.alunosBanco.push({
            "id": id,
            "nome": aluno.nome
        });
        $scope.filtrarAlunos();
    });

    alunosRef.on('child_changed', function (data) {
        var id = data.key,
            aluno = data.val();
        _.each($scope.alunosBanco, function (p) {
            if (p.id === id) {
                p.nome = aluno.nome;
                return;
            }
        });
        $scope.filtrarAlunos();
    });

    alunosRef.on('child_removed', function (data) {
        var id = data.key;
        $scope.alunosBanco = _.reject($scope.alunosBanco, function (p) {
            return p.id === id;
        });
        $scope.filtrarAlunos();
    });
}

function _adicionarAluno($scope, aluno){
    var vm = this;
    vm.alunos = vm.alunos || [];
    vm.alunos.push(aluno.id);
    firebase
        .database()
        .ref('/turmas/' + vm.id)
        .update({
            alunos: vm.alunos
        })
        .then(function (){
            $scope.filtrarAlunos();
        });
}

function _removerAluno($scope, alunoId){
    var vm = this;
    vm.alunos = _.reject(vm.alunos, function(a){
        return a === alunoId;
    });
    
    firebase
        .database()
        .ref('/turmas/' + vm.id)
        .update({
            alunos: vm.alunos
        })
        .then(function (){
            $scope.filtrarAlunos();
        });
}