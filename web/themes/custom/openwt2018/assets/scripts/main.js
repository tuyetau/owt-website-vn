(function ($, window, Drupal, drupalSettings) {

  /**
   * Utilities
   */
  Drupal.openwt2018 = {};

  Drupal.openwt2018.typeIt = function ($typer, words, index, ch) {
    if (index >= words.length) {
      setTimeout(function () {
        Drupal.openwt2018.typeIt($typer, words, 0, 0)
      }, 1000);
      return;
    }
    value = words[index];
    if (ch > value.length) {
      index = index + 1
      setTimeout(function () {
        Drupal.openwt2018.typeIt($typer, words, index, 0)
      }, 1000);
      return;
    }
    ;
    $typer.text(value.substring(0, ch++));
    setTimeout(function () {
      Drupal.openwt2018.typeIt($typer, words, index, ch)
    }, ~~(Math.random() * (150 - 30 + 1) + 30));
  };

  Drupal.openwt2018.showFullText = function (element, maxHeight) {
    $(element).once(element).on('click', function () {
      $(this).toggleClass('opened');
      if ($(this).hasClass('opened')) {
        $(this).parent().siblings('.gradient').hide();
        $(this).parent().siblings('.under').animate({
          maxHeight: '100%',
          zIndex: '20'
        }, {duration: 300, queue: false});
      }
      else {
        $(this).parent().siblings('.gradient').show();
        $(this).parent().siblings('.under').animate({
          maxHeight: maxHeight + 'px',
          zIndex: ''
        }, {duration: 300, queue: false});
      }
    });
  };

  Drupal.openwt2018.showActivityText = function (element) {
    $(element).once(element).on('click', function () {
      $(this).toggleClass('opened');
      if ($(this).hasClass('opened')) {
        var description = $(this).closest(".methodology-steps")[0];
        var text = description.getElementsByTagName("p")[0];
        text.style.display = "block";
      }
      else {
        var description = $(this).closest(".methodology-steps")[0];
        var text = description.getElementsByTagName("p")[0];
        text.style.display = "none";
      }
    });
  };

  Drupal.openwt2018.selectCallback = [];


  /**
   * OpenWT2018 theme behaviors (on all pages)
   *
   */
  Drupal.behaviors.openwt2018 = {
    attach: function (context, settings) {

      //Menu behavior when scrolling
      var stillScrolling = 0,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = $(".nav").outerHeight();

      function hasScrolled(e) {
        if (e === stillScrolling) {
          var st = $(this).scrollTop();
          if (Math.abs(lastScrollTop - st) <= delta) {
            return;
          }
          lastScrollTop = st;
        }
      }

      function isHomepage() {
        var homepage;
        homepage = document.getElementsByClassName('page-homepage');
        return (homepage.length > 0);
      }

      if(isHomepage()){document.getElementsByClassName('nav__logo')[0].classList.add("rw");}

      function setHomepageLogoRW(rw) {
        if(isHomepage()){
          if(rw){
            document.getElementsByClassName('nav__logo')[0].classList.remove("rw");
          }else{
            document.getElementsByClassName('nav__logo')[0].classList.add("rw");
          }
        }
      }

      document.addEventListener('scroll', function (event) {
        stillScrolling += 1;
        this.static = stillScrolling;
        var y = $(this).scrollTop();
        if (y > 99) {
          document.getElementsByClassName('nav')[0].classList.add("small_nav");
          setHomepageLogoRW(true);
        }else{
          document.getElementsByClassName('nav')[0].classList.remove("small_nav");
          setHomepageLogoRW(false);
        }
        setTimeout(hasScrolled.bind(null, this.static), 250);
      }, true);

      //Hamburger menu
      $(document).once('hamburger').on('click', '.nav__hamburger', function (e) {
        $(this).toggleClass("active");
        $(".nav__menu").toggleClass("active");
        $("body").toggleClass("no-scroll");
      });

      $('#cks-accept').once('cookies-banner').on('click', function () {
        document.cookie = 'cks-accepted=true';
        $('#cookies-banner').fadeOut();
      });

      // Hide banner if already accepted
      if (document.cookie.indexOf('cks-accepted=true') < 0) {
        $('#cookies-banner').show();
      }

      //Selects
      $(document).once('customSelect').on('click', '.select', function (e) {
        e.preventDefault();
        var ul = $(this).find("ul"),
          page = $("html, body");

        //prevent animation to block scrolling
        page.on("scroll.select mousedown.select wheel.select DOMMouseScroll.select mousewheel.select keyup.select touchmove.select", function () {
          page.stop();
        });

        if ($(this).hasClass("active")) {
          if (ul.find("li").is(e.target)) {
            var target = $(e.target);
            target.addClass("selected").siblings().removeClass("selected");
            var value = target.html();
            var id = target.val();
            $(this).find(".select__input").val(value);
            $(this).find(".select__value").html(value);

            var parentId = target.parent().attr("id");

            if (parentId !== undefined) {
              for (var i = 0; i < Drupal.openwt2018.selectCallback.length; i++) {
                var selector = Drupal.openwt2018.selectCallback[i].selector,
                  callback = Drupal.openwt2018.selectCallback[i].callback,
                  scrollTo = Drupal.openwt2018.selectCallback[i].scrollTo;
                if (parentId.indexOf(selector) >= 0) {
                  callback(value, id);
                  if (typeof scrollTo === 'number') {
                    page.animate({
                      scrollTop: scrollTo
                    }, 200, 'swing', function () {
                      page.off("scroll.select mousedown.select wheel.select DOMMouseScroll.select mousewheel.select keyup.select touchmove.select");
                    });
                  } else {
                    page.off("scroll.select mousedown.select wheel.select DOMMouseScroll.select mousewheel.select keyup.select touchmove.select");
                  }
                }
              }
            }
          }
          ul.hide();
          $(this).removeClass("active");
        }
        else {
          $('.select').not(this).each(function () {
            $(this).removeClass("active").find("ul").hide();
          });
          ul.slideDown(300);
          $(this).addClass("active");
        }
      });


      $(document).once('closesSeclects').on('click', function (e) {
        var target = $(e.target).closest(".select");
        if (!target.length) {
          $(".select").removeClass("active").find("ul").hide();
        }
      });
    }
  };

})(jQuery, this, Drupal, drupalSettings);
