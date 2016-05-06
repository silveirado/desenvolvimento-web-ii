angular
  .module('avaliacao')
  .controller('LoginCtrl', ['$rootScope', '$scope', loginCtrl]);

function loginCtrl($rootScope, $scope){
  
  $scope.alerts = ["Mensagem 1", "Mensagem 2"];
  
  $scope.closeAlert = _closeAlert.bind(this, $scope);
    
}

function _closeAlert($scope, index){
  $scope.alerts.splice(index, 1);
}