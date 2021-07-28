(function ($, window, Drupal, drupalSettings) {
  let initialized;
  const paragraphClass = '.paragraph--type--mission-pictogram-item';
  const toggleClassName = 'opened';
  const $paragraphEl = $(paragraphClass);

  function init() {
    if (!initialized) {
      initialized = true;
      $paragraphEl.first().addClass(toggleClassName);
    }
  }
Drupal.behaviors.expertise = {
  attach: function () {
    init();
    $(document).on('click', paragraphClass, function () {
      if(!$(this).hasClass(toggleClassName)){
        $paragraphEl.removeClass(toggleClassName);
        $(this).addClass(toggleClassName);
      }
    });
  }
}
})(jQuery, this, Drupal, drupalSettings);
