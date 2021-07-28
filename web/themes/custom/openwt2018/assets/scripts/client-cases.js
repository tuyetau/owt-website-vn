(function ($, window, Drupal, drupalSettings) {

  var initialized;

  function init() {
    if (!initialized) {
      initialized = true;

      $('.paragraph--type--client-cases-page-footer').hide();
      //Selects
      var selectCallbacks = [
        {
          selector: "edit-industry",
          callback: function (value, id) {
            $("select[id*=edit-industry] option:selected").removeAttr("selected");
            $("select[id*=edit-industry] option[value=" + id + "]").attr("selected", "selected");
            $("input[id*=edit-submit-client-cases]").click();
          },
        },
        {
          selector: "edit-business-solutions",
          callback: function (value, id) {
            $("select[id*=edit-business-solutions] option:selected").removeAttr("selected");
            $("select[id*=edit-business-solutions] option[value=" + id + "]").attr("selected", "selected");
            $("input[id*=edit-submit-client-cases]").click();
          },
        },
        {
          selector: "edit-project-type",
          callback: function (value, id) {
            $("select[id*=edit-project-type] option:selected").removeAttr("selected");
            $("select[id*=edit-project-type] option[value=" + id + "]").attr("selected", "selected");
            $("input[id*=edit-submit-client-cases]").click();
          },
        }
      ];

      var solution_selected_id    = $("select[id*=edit-business-solutions] option:selected").attr('value');
      loadWhitePaperBanner(solution_selected_id);

      Drupal.openwt2018.selectCallback = Drupal.openwt2018.selectCallback.concat(selectCallbacks);
    }
  }

  function loadWhitePaperBanner(solution_selected_id) {

    $('.whitepaper-banner-wrapper').css("display", "none");
    $('.client_case_' + solution_selected_id).css("display", "flex");
    if ($('.client_case_' + solution_selected_id).css("display") == 'flex') {
      $('.form--inline').css("padding-top", "30px");
    }
    else {
      $('.form--inline').css("padding-top", "0");
    }
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

  //change default ajax throbber
  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
     this.progress.element = $(
     '<div class="news-wrapper col-12 col-md-6 col-lg-4 col-sm-12">' +
     '<article class="news grid-item loading" style="height: 400px">' +
     '<figure class="news__illustration loading"></figure>' +
     '<div class="ajax-progress ajax-progress-throbber">&nbsp;</div>' +
     '<div class="case__shares loading" style="text-align: center">' +
       Drupal.t('Loading more cases...') +
       '<img src="/themes/custom/openwt2018/dist/images/svg/rocket.svg" alt="shares" style="width: 30px; margin: 15px 0 0 10px">' +
     '</div>' +
   '</article>' +
     '</div>');
     $('.views-infinite-scroll-content-wrapper').append(this.progress.element);
  };

  Drupal.behaviors.clientCases = {
    attach: function (context, settings) {

      function positionContactUs(event) {
        if ($(this).scrollTop() > 100) {
          $('.paragraph--type--client-cases-page-footer').fadeIn();
        }

        var $footer = $('.footer'),
          $contactUs = $('.paragraph--type--client-cases-page-footer');
        if ((window.innerHeight + window.pageYOffset >= $footer.offset().top + 20)) {
          var h = (window.innerHeight + window.pageYOffset) - ($footer.offset().top);
          $contactUs.css("bottom", h);
        }
        else {
          $contactUs.css("bottom", "0");
        }
      }

      //Position the contact us banner
      //when scrolling
      $(context).find('.paragraph--type--client-cases-page-footer').once('cases-when-scrolling').each(function () {
        $(window).on('scroll', function () {
          positionContactUs('srolling');
        });
      });

      //when ajax is complete
      $(document).once('cases-end-of-ajax').ajaxComplete(function (event, xhr, settings) {
        var industry_selected     = $("select[id*=edit-industry] option:selected")[0].index;
        var solution_selected     = $("select[id*=edit-business-solutions] option:selected")[0].index;
        var solution_selected_id    = $("select[id*=edit-business-solutions] option:selected").attr('value');
        var project_type_selected = $("select[id*=edit-project-type] option:selected")[0].index;

        positionContactUs('ajaceComplete');
        if(industry_selected || solution_selected || project_type_selected ) {
            hideOnGoingProjectsOnMobile(true);
        }else{
            hideOnGoingProjectsOnMobile(false);
        }

        loadWhitePaperBanner(solution_selected_id);
      });

      //Cases img link
      $('.case-wrapper').once('clientCasesLink').each(function () {
        var target = $(this).find('a').attr('href');
        $(this).on('click', '.case__illustration', function (e) {
          if(e.ctrlKey){
            window.open(target, '_blank');
          } else {
            window.location.href = target;
          }
        });
      });

      init();
    }
  }

  function hideOnGoingProjectsOnMobile(hide){
      if(isMobileDevice()){
          if(hide){
              $('.stay-up-to-date').hide();
          }else{
              $('.stay-up-to-date').show();
          }
      }
  }

  function isMobileDevice (){
      return  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

})(jQuery, this, Drupal, drupalSettings);
