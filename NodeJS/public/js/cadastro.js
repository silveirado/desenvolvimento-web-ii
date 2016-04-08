$(function(){
  $('#horas').click(function(){
    $.get('/horas', function(data){
      alert('Servidor respondeu: ' + data);
    });
  });
});