var cheet = require('cheet.js');

module.exports = function() {
  // aula de bits e bytes
  function converteParaBinario(fraseEl) {
    var frase = fraseEl.innerText,
      resultado = '';

    for (var i = 0; i < frase.length; i++) {
      resultado += frase.charCodeAt(i).toString(2) + ' ';
    }

    fraseEl.innerText = resultado;
    fraseEl.classList.remove('texto-normal');
    fraseEl.classList.add('texto-binario');
  }

  function converteParaTexto(fraseEl) {
    var frase = fraseEl.innerText,
      letras = frase.split(' '),
      resultado = '';

    for (var j = 0; j < letras.length; j++) {
      resultado += String.fromCharCode(Number.parseInt(letras[j], 2));
    }

    fraseEl.innerText = resultado;
    fraseEl.classList.remove('texto-binario');
    fraseEl.classList.add('texto-normal');
  }

  cheet('i d d q d', function () {
    // converte de volta para string usando tabela ascii
    var frasesBinariasEl = document.querySelectorAll('.texto-binario'),
      frasesTextoEl = document.querySelectorAll('.texto-normal'),
      i;

    for (i = 0; i < frasesBinariasEl.length; i++) {
      converteParaTexto(frasesBinariasEl[i]);
    }
    for (i = 0; i < frasesTextoEl.length; i++) {
      converteParaBinario(frasesTextoEl[i]);
    }
  });
};
