(function ($, window, Drupal, drupalSettings) {
  
    Drupal.behaviors.addPeople = {
      attach: function (context, settings) {
        $('.btn-submit-apply').once('btnApplyClick').click(function () {
          fbq('trackCustom', 'SubmitApplication', { job_id: $("#job-id").text() });
        });
      }
    }
  
})(jQuery, this, Drupal, drupalSettings);
  