(function ($, window, Drupal, drupalSettings) {

  Drupal.behaviors.health = {

    attach: function () {

      var el = $('#pieObject .path');
      el.hover(function() {
        var id =  $(this).data('show');
        $("#"+id).toggleClass("display");
      });

      var button = $('#toogleLabel');
      var list = $('.graph-object__list');
      button.on("click", function(){
        $(this).toggleClass("opened");
        list.toggleClass("opened");
      });
      var elSlider = $('.opportunity-sliders .views_slideshow_cycle_main');
      var elSliderInner = $('.opportunity-sliders .views_slideshow_cycle_teaser_section');
      var elSlide = $('.opportunity-sliders .views_slideshow_slide');

      var rate = 0.892857143;
      $(window).once('windowResize').resize(function() {
        var screenWidth = $(window).width();
         var mobileMaxWidth = '768';

         if(screenWidth < mobileMaxWidth){
            var slideWidth = elSlider.width();
            var slideInnerWidth = elSliderInner.width();
            var elSlideWidth = elSlide.width();
            elSlider.height((slideWidth + 30)/ rate );
            elSliderInner.height(slideInnerWidth / rate);
            elSlide.height(elSlideWidth / rate);
         }
      });

      // Initiate lightslider for opportunities:
      $("#opportunitySlider").lightSlider({
        item: 1,
          autoWidth: false,
          slideMove: 1, // slidemove will be 1 if loop is true
          slideMargin: 10,

          speed: 400, //ms'
          auto: false,
          loop: false,
          slideEndAnimation: true,
          pause: 2000,

          keyPress: false,
          controls: false,
          prevHtml: '',
          nextHtml: '',

          rtl: false,
          adaptiveHeight: false,

          vertical: false,
          verticalHeight: 500,
          vThumbWidth: 100,

          thumbItem: 10,
          pager: true,
          gallery: false,
          galleryMargin: 5,
          thumbMargin: 5,
          currentPagerPosition: 'middle',

          enableTouch: true,
          enableDrag: true,
          freeMove: true,
          swipeThreshold: 40,

          responsive: [],
      });
    }
  }
})(jQuery, this, Drupal, drupalSettings);
