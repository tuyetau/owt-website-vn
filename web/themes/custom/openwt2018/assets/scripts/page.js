(function ($, window, Drupal, drupalSettings) {

  Drupal.behaviors.page = {

    attach: function () {
      if($('div').hasClass('video__inner')) {
        $('#page').addClass('home_page_admin');
      } else {
        $('#page').removeClass('home_page_admin');
      }
    } 
  }
})(jQuery, this, Drupal, drupalSettings);
