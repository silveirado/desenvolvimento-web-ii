
function fClick() {
    var nomeEl = document.getElementById('nome');
    var anoEl = document.getElementById('ano');

    var nome = nomeEl.value;
    var ano = anoEl.value;

    if (confirm('Tem certeza que seu nome é ' + nome + '?')) {
        alert('Olá, ' + nome + '!!!');
    }

    var idade = 2016 - ano;

    alert('Você tem ' + idade + ((idade > 20) ? ' \n Cê tá velho hein :)' : ''));
}