angular
    .module('avaliacao')
    .controller('AlunosCtrl', ['$scope', '$uibModal', alunosCtrl]);

function alunosCtrl($scope, $uibModal) {

    $scope.editaAluno = _editaAluno.bind(this, $scope, $uibModal);

}

function _editaAluno($scope, $uibModal, aluno) {
    var modalAluno = $uibModal.open({
        templateUrl: "templates/aluno-form.html",
        controller: ["$scope", "$uibModalInstance", _modalAlunoCtrl],
        controllerAs: "aluno",
        resolve: {
            aluno: aluno
        }
    });

    modalAluno.result.then(function ok(aluno) {
        console.log('Aluno', aluno);
        //TODO: Gravar no banco de dados
    });
}

function _modalAlunoCtrl($scope, $uibModalInstance, aluno) {
    var aluno = this;
    
    $scope.ok = function () {
        var form = $scope.formAluno;

        if (form.$valid) {
            $uibModalInstance.close(aluno);
        } else {
            $scope.tentouGravar=true;
        }

    }
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }

}