(function ($, window, Drupal, drupalSettings) {

  Drupal.behaviors.jobs = {
    attach: function () {
      $('.btn-apply-job').once('btnApplyClick').click(function () {
        fbq('trackCustom', 'ClickApply', { job_id: $("#job-id").text() });
      });
    }
  }
})(jQuery, this, Drupal, drupalSettings);
