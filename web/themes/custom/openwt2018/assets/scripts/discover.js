(function ($, window, Drupal, drupalSettings) {

  var initialized;
  var yearHighlightedIndex;

  function init() {
    if (!initialized) {
      initialized = true;
      yearHighlightedIndex = 0;
      document.getElementsByClassName('paragraph--type--discover-history-item')[0].classList.add('highlighted');
    }
  }

  function toggleYear(obj) {
    document.getElementsByClassName('paragraph--type--discover-history-item')[yearHighlightedIndex].classList.remove('highlighted');
    $('.paragraph--type--discover-history-item').each(function (index, listItem) {
      if (listItem === obj) {
        yearHighlightedIndex = index;
        document.getElementsByClassName('paragraph--type--discover-history-item')[index].classList.add('highlighted');
      }
    });
  }

  Drupal.behaviors.discoverPage = {
    attach: function (context, settings) {

      Drupal.openwt2018.showFullText('.discover__history .circle-plus', 100);
      Drupal.openwt2018.showActivityText('.methodology-steps .circle-plus');

          $('.discover__history__content__item').once('hideTooHigh').each(function () {
            var height = $(this).find('.under').height();
            var line_height = $(this).find('.under').css('line-height');
            line_height = parseFloat(line_height);
            var rows = height / line_height;
            if (Math.round(rows) <= 3) {
              $(this).find('.gradient, .link').hide();
              $(this).find('.under').css('max-height', '100%');
            } else {
              $(this).find('.under').css('max-height', '100px');
            }
          });
          $('.paragraph--type--discover-history-item').once('addSelectHandler').click(function () {
            toggleYear(this);
          });
          init();
        }
      }
})(jQuery, this, Drupal, drupalSettings);
