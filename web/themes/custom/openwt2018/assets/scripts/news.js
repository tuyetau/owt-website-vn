(function ($, window, Drupal, drupalSettings) {

    var initialized;

    function init() {
        if (!initialized) {
            initialized = true;

            //$('.paragraph--type--client-cases-page-footer').hide();
            //Selects
            var selectCallbacks = [
                {

                    selector: "edit-field-news-tag-target-id",
                    callback: function (value, id) {
                        $("select[id*=edit-field-news-tag-target-id] option:selected").removeAttr("selected");
                        $("select[id*=edit-field-news-tag-target-id] option[value=" + id + "]").attr("selected", "selected");
                        $("input[id*=edit-submit-news-feeds]").click();

                    },
                }
            ];

            Drupal.openwt2018.selectCallback = Drupal.openwt2018.selectCallback.concat(selectCallbacks);
        }
    }


  //change default ajax throbber
  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
    this.progress.element = $(
    '<div class="news-wrapper col-12 col-md-6 col-lg-4">' +
      '<article class="news grid-item loading">' +
        '<figure class="news__illustration loading"></figure>' +
        '<a class="case-link" href="#">' +
          '<h4 class="case__title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>' +
        '</a>' +
        '<div class="ajax-progress ajax-progress-throbber">&nbsp;</div>' +
        '<div class="case__shares loading">' +
          Drupal.t('Loading more news...') +
          '<img src="/themes/custom/openwt2018/dist/images/svg/rocket.svg" alt="shares">' +
        '</div>' +
      '</article>' +
    '</div>');
    $('.views-infinite-scroll-content-wrapper').append(this.progress.element);
  };

  Drupal.behaviors.newsPage = {
    attach: function (context, settings) {

        $(document).once('news-end-of-ajax').ajaxComplete(function (event, xhr, settings) {
            var industry_selected     = $("select[id*=edit-field-news-tag-target-id] option:selected")[0].index;
        });

        init();

    }
  }
})(jQuery, this, Drupal, drupalSettings);
