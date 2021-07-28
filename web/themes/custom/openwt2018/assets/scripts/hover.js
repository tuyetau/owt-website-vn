(function ($, window, Drupal, drupalSettings) {

  Drupal.behaviors.hover = {
    attach: function () {

      $('.illustration').hover(
        function() {
          $(this).find('.border-image').addClass( "hover-img" );
        }, function() {
          $(this).find('.border-image').removeClass( "hover-img" );
        }
      )
    }
  }

})(jQuery, this, Drupal, drupalSettings);

