(function ($, window, Drupal, drupalSettings) {


  //change default ajax throbber
  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
     this.progress.element = $(
     '<div class="news-wrapper col-12 col-md-6 col-lg-4 col-sm-12">' +
     '<article class="news grid-item loading" style="height: 400px">' +
     '<figure class="news__illustration loading"></figure>' +
     '<div class="ajax-progress ajax-progress-throbber">&nbsp;</div>' +
     '<div class="case__shares loading" style="text-align: center">' +
       Drupal.t('Loading more...') +
       '<img src="/themes/custom/openwt2018/dist/images/svg/rocket.svg" alt="shares" style="width: 30px; margin: 15px 0 0 10px">' +
     '</div>' +
   '</article>' +
     '</div>');
     $('.views-infinite-scroll-content-wrapper').append(this.progress.element);
  };

  

})(jQuery, this, Drupal, drupalSettings);
