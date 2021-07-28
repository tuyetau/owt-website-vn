(function ($, window, Drupal, drupalSettings) {

	$('.tab-title').once('newclientcase_tabselect').click(function() {
		var tab = $(this).attr('for');
		
		$('.tab-title').removeClass('selected');
		$(this).addClass('selected');
		
		$('.tab').hide();
		$('#' + tab).fadeIn();
	});

	//Cases img link
	$('.case-wrapper').once('clientCasesLink').each(function () {
		var target = $(this).find('a').attr('href');
		$(this).on('click', '.case__illustration', function () {
			window.location.href = target;
		});
	});
	
})(jQuery, this, Drupal, drupalSettings);
