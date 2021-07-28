(function ($, window, Drupal, drupalSettings) {

  /*
     * Disable AJAX autoscroll
     * Views Ajax Content Load Autoscroll Feature Disabled
     * */
Drupal.behaviors.viewsScrollOff = {
  attach: function () {
    if (Drupal.hasOwnProperty('AjaxCommands')) {
      Drupal.AjaxCommands.prototype.viewsScrollTop = null;
    }
  }
};

Drupal.behaviors.team = {
  attach: function () {
    var RESPONSIVE_WIDTH = 1199,
      IMAGES_DIFF = 60,	// Title changing time
      _assets = [];

    /* Get elements from DOM */
    function loadAssets() {
      for(var i = 1; i <= 3; i++) {
        _assets['title' + i] = $('#title' + i).prop('outerHTML');
        _assets['descr' + i] = $('#descr' + i).prop('outerHTML');
        _assets['icon' + i] = $('#icon' + i).attr('src');

        for(var j = 1; j <= 3; j++) {
          _assets['image' + i + j] = $('#image' + i + j).attr('src');
        }
      }
    }

    /* Reorder element depending of the screen's size */
    function setLayout() {
      $('.slider').html('');

      if($(document).width() > RESPONSIVE_WIDTH) {
        var build = '<div id="im" class="images-col">';

        for(var i = 1; i <= 3; i++) {
          build += '<div class="images-container">';

          build += '<div class="im-left">';
          build += '<img src="' + _assets['image' + i + '1'] + '" class="first" /><br />';
          build += '<img src="' + _assets['image' + i + '2'] + '" class="second" />';
          build += '</div>';

          build += '<div class="im-right">';
          build += '<img src="' + _assets['icon' + i] + '" class="first" /><br />';
          build += '<img src="' + _assets['image' + i + '3'] + '" class="second" />';
          build += '</div>';

          build += '</div>';
        }

        build += '</div>';
        build += '<div id="cont" class="content">';

        for(var i = 1; i <= 3; i++) {
          build += _assets['title'+i];
        }

        for(var i = 1; i <= 3; i++) {
          build += _assets['descr'+i];
        }

        build += '<div class="red-line"></div>';
        build += '</div>';


        $('.slider').append(build);

        $('#title1').addClass('selected');
        $('.descr').hide();
        $('#descr1').show();

      } else {
        var build = '';

        for(var i = 1; i <= 3; i++) {
          build += _assets['title'+i];
          build += _assets['descr'+i]

          build += '<div class="images-container">';

          build += '<div class="im-left">';
          build += '<img src="' + _assets['image' + i + '1'] + '" class="first" /><br />';
          build += '<img src="' + _assets['image' + i + '2'] + '" class="second" />';
          build += '</div>';

          build += '<div class="im-right">';
          build += '<img src="' + _assets['icon' + i] + '" class="first" /><br />';
          build += '<img src="' + _assets['image' + i + '3'] + '" class="second" />';
          build += '</div>';

          build += '</div>';
        }

        $('.slider').append(build);

        $('.image').addClass('column');
        $('h1').removeClass('selected');
        $('.descr').show();
      }
    }

    /* Activate the "slide" effect on scroll */
    function scrollActions() {
      if($(document).width() >= RESPONSIVE_WIDTH && $('#cont').length) {

        var contentPos = $('#cont').offset().top;
        var currentImage = 0;

        $('.images-container').each(function(i, v) {
          if(contentPos > $(v).offset().top - IMAGES_DIFF) {
            currentImage++;
          }
        });
        currentImage = (currentImage == 0 ? 1 : currentImage);
        $('h1').removeClass('selected');
        $('#title' + currentImage).addClass('selected');

        $('.sld-descr').hide();
        $('#descr' + currentImage).show();
      }
    }

		$(window).once('windowResize').resize(function() {
			setLayout();
			scrollActions();
		});

		$(document).once('doc-slider').on('scroll', function() {
			scrollActions();
		});

		loadAssets();
		setLayout();



    $('#views_slideshow_controls_text_list_of_team_members-block_executives_slider span').click(function () {

        var ctl_slider_first_toggle = $('#widget_pager_top_list_of_team_members-block_executives_slider li:first-of-type').hasClass('active');
        $('#views_slideshow_controls_text_list_of_team_members-block_executives_slider .views_slideshow_controls_text_previous').toggleClass('disable', ctl_slider_first_toggle);
        var ctl_slider_last_toggle = $('#widget_pager_top_list_of_team_members-block_executives_slider li:last-of-type').hasClass('active');
        $('#views_slideshow_controls_text_list_of_team_members-block_executives_slider .views_slideshow_controls_text_next').toggleClass('disable', ctl_slider_last_toggle);
    });

  }
}
})(jQuery, this, Drupal, drupalSettings);
