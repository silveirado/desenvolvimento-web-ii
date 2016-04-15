angular
  .module('todoApp', [])
  .controller('TarefasCtrl', TarefasCtrl);


function TarefasCtrl($scope){
  $scope.nome = "Derotino Silveira";
  $scope.tarefas=[];
  
  $scope.adiciona = function(){
    $scope.tarefas.push(
      {
        descricao: $scope.tarefa,
        feito: false
      }
    );
    $scope.tarefa='';
  }
  
  $scope.limpar = function(){
    var qtd = $scope.tarefas.length;
    for (var i = (qtd - 1 ); i >= 0; i--){
      var tarefa = $scope.tarefas[i];
      if (tarefa.feito){
        $scope.tarefas.splice(i, 1);
      }
    }
  }
}