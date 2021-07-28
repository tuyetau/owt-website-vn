(function ($, window, Drupal, drupalSettings) {

	var url = $(".redirect-button").attr('href');

	setTimeout(
    function() {
    	window.location = url;
    }, 500
	);

})(jQuery, this, Drupal, drupalSettings);