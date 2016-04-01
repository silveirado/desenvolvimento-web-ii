$(function () {
  
  $("#mensagens").hide();
  
  $("#enviar").click(function (e) {
    e.preventDefault();
    var erros = [];
    $("#mensagens").hide();
    $("#mensagens").empty();
    
    $('.form-group.required').each(function(){
      var div = $(this);
      var input = $('input', div);
      var value = $(input).val();

      if (value){
        div.removeClass('has-error');
      }else {
        erros.push(input.attr('placeholder'));
        div.addClass('has-error');
      }

    });
    
    if(erros.length > 0){
      for(var i = 0; i < erros.length; i++){
        var msg = $('<div class="alert alert-danger" role="alert"></div>').text(erros[i]);
        $("#mensagens").append(msg);
      }
      $("#mensagens").show();
    }
  });
  
});