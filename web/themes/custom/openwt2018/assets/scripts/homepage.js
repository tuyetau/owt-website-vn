(function ($, window, Drupal, drupalSettings) {
  let initialized;
  let slider;
  let isDown = false;
  let startX;
  let scrollLeft;
  let x;
  let walk;
  const mobileWidth = 576;
  const desktopWidth = 767;

  function init() {
    if (!initialized) {
      initialized = true;

      //Reveal elements at scroll
      window.sr = window.ScrollReveal({
        origin: 'bottom',
        distance: '100px',
        duration: 1500,
        scale: 1,
        viewFactor: 0.2,
        mobile: false
      });
      sr.reveal('.case--highlighted');
      sr.reveal('.grid-item', 50);
      sr.reveal('.contact', {scale: 0.9, distance: '0px'});
      sr.reveal('.cases__more', {viewOffset: {bottom: 100}});
      sr.reveal('.meet .title--huge', {viewOffset: {bottom: 50}});
      sr.reveal('.meet .col-md-6', {viewOffset: {bottom: 50}}, 200);
      sr.reveal('.numbers__wrapper', {origin: 'right'});
      sr.reveal('.numbers__wrapper li', {origin: 'right'});
      sr.reveal('.footer__title', {
        scale: 0.8,
        distance: '0px',
        delay: 150
      });

    }
  }

  function initSlider() {
    slider = document.querySelector('.slider-container.items');
    isDown = false;
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      x = e.pageX - slider.offsetLeft;
      walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }

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
  Drupal.behaviors.homepage = {
    attach: function () {
      // Case slider
      if ($(window).width() > mobileWidth) {
        initSlider();
      } else{
        $(".slider-container.items").off();
      }

      // Header background video
      if ($('.mobile-video')) { // check if there is a background video for mobile
        if ($(window).width() > desktopWidth) { // Only preload the video for the specific device
          $('.mobile-video video').attr("preload", "none");
        } else {
          $('.desktop-video video').attr("preload", "none");
        }
      }

      $(window).once("windowResized").resize(function () {
        if ($(window).width() > mobileWidth) {
          initSlider();
        } else{
          $(".slider-container.items").off();
        }
    });

    // Header animation
    $(".header__content .highlight").once('headerAnim').attr("data-typer", function (i) {
      var $typer = $(this),
        words = $typer.attr("data-typer").split(",");
      Drupal.openwt2018.typeIt($typer, words, 0, 0)
    });

		$('.paragraph.missions .paragraph.mission:first-child').addClass('opened_mission');

		$(document).on('click', '.paragraph.mission', function () {
		  if(!$(this).hasClass('opened_mission')){
        $('.paragraph.mission').removeClass('opened_mission');
        $(this).addClass('opened_mission');
      }
    });

    //Cases img link
    $('.case-wrapper').once('clientCasesLink').each(function () {
      var target = $(this).find('a').attr('href');
      $(this).on('click', '.case__illustration', function () {
        window.location.href = target;
      });
    });

    //Video
    $('.remodal-video').once('remodalVideo').on({
      'opened': function () {
        $("#intro-video").get(0).play();
      },
      'closed': function () {
        $("#intro-video").get(0).pause();
        $("#intro-video").get(0).currentTime = 0;
      }
    });

    init();
  }
}
})(jQuery, this, Drupal, drupalSettings);
