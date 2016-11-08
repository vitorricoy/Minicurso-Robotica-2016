module.exports = function() {
  var gifs = document.querySelectorAll('.stoppable-gif'),
      i;
  for (i = 0; i < gifs.length; i++) {
    gifs[i].addEventListener('click', function(e) {
      var img = e.currentTarget,
          src = img.getAttribute('src');
      if (src.indexOf('.gif') > -1) {
        src = src.replace('.gif', '.png');
      } else {
        src = src.replace('.png', '.gif');
      }
      e.currentTarget.setAttribute('src', src);
    });
  }
};