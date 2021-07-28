(function($, window, Drupal, drupalSettings) {

  var initialized;
  var selectedSkill = '';
  var selectedCity = '';
  var selectedTitle = '';

  function init() {
    if (!initialized) {
      initialized = true;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if(urlParams.has('location')){
        manuallySetFilter('city', urlParams.get('location'));
      }
      if(urlParams.has('domain')){
        manuallySetFilter('skill', urlParams.get('domain'));
      }
      Drupal.openwt2018.selectCallback.push({
        selector: "select-city",
        callback: selectCity,
        scrollTo: false
      });

      Drupal.openwt2018.selectCallback.push({
        selector: "select-skill",
        callback: selectSkill,
        scrollTo: false
      });
    }
  }

  function manuallySetFilter(className, search){
    $("#select-" + className + " li").each(function(index, value) {
      var currentName = $(value).text()

      if( currentName
        .replace(/\s/g, '')//Handling special cases
        .replace(/[àäảâẢÂ]/gi, 'a')
        .replace(/ü/gi, 'u')
        .replace(/[éèë]/gi, 'e')
        .toUpperCase()
        .indexOf(
          search
            .replace(/\s/g, '')
            .replace(/[àäảâẢÂ]/gi, 'a')
            .replace(/ü/gi, 'u')
            .replace(/[éèë]/gi, 'e')
            .toUpperCase()
        ) > -1) {
        $(this).addClass("selected");
        $("#select-" + className + "").parent().find(".select__value").html(currentName);
        className == "city" ? selectCity(currentName) : selectSkill(currentName);
      } else {
        $(this).removeClass("selected");
      }
    });
  }

  function selectCity(value, id) {
    if (value == Drupal.t('Lausanne / EPFL')) {
      value = Drupal.t('Lausanne');
    } else {
      value = value;
    }

    selectedCity = value;
    searchByTitleCitySkill(selectedTitle, selectedCity, selectedSkill);
  };

  function selectSkill(value, id) {
    selectedSkill = value;
    searchByTitleCitySkill(selectedTitle, selectedCity, selectedSkill);
  };

  function searchByTitleCitySkill(titleFilter, cityFilter, skillFilter) {
    var count = 0;
    $('.open-positions').find('.job-offer').each(function (j, w) {
      var city = $(w).attr('city').toLowerCase();
      var skill = $(w).attr('skills').toLowerCase();
      var title = $(w).find('.title').eq(0).text();
      if ((skillFilter.toLowerCase() == 'all domains' ||
          skillFilter.toLowerCase() == 'tous les domaines' ||
          skillFilter.toLowerCase() == 'alle domänen') &&
        (selectedCity == '' || selectedCity.toLowerCase() == 'all locations' ||
          selectedCity.toLowerCase() == 'toutes les localités' ||
          selectedCity.toLowerCase() == 'alle orte') &&
          (title.toLowerCase().indexOf(titleFilter) > -1)) {
        $(w).show();
        count++;
      } else if ((skillFilter.toLowerCase() == 'all domains' ||
          skillFilter.toLowerCase() == 'tous les domaines' ||
          skillFilter.toLowerCase() == 'alle domänen') &&
          (selectedCity != '') &&
          (title.toLowerCase().indexOf(titleFilter) > -1)) {
        if ((city.indexOf(cityFilter.toLowerCase()) >= 0 || city == 'all') &&
        (title.toLowerCase().indexOf(titleFilter) > -1)) {
          $(w).show();
          count++;
        } else {
          $(w).hide();
        }
      } else {
        if ((skill.indexOf(skillFilter.toLowerCase()) >= 0 || skill == 'all') &&
          (city.indexOf(cityFilter.toLowerCase()) >= 0 || city == 'all' ||
            cityFilter.toLowerCase() == 'all locations' ||
            cityFilter.toLowerCase() == 'toutes les localités' ||
            cityFilter.toLowerCase() == 'alle orte') &&
            (title.toLowerCase().indexOf(titleFilter) > -1)) {
          $(w).show();
          count++;
        } else {
          $(w).hide();
        }
      }
    });

    var message = $('.remodal__content').find('.no-offer')[0];

    if (count == 0) {
      $(message).show();
    } else {
      $(message).hide();
    }
  }


  /*
   * Disable AJAX autoscroll
   * Views Ajax Content Load Autoscroll Feature Disabled
   * */
  Drupal.behaviors.viewsScrollOff = {
    attach: function() {
      if (Drupal.hasOwnProperty('AjaxCommands')) {
        Drupal.AjaxCommands.prototype.viewsScrollTop = null;
      }
    }
  };

  Drupal.behaviors.jobs = {
    attach: function() {

      // Initiate lightslider for Career Quotes:
      $("#lightSlider").lightSlider({
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

      $(document).ready(function() {
        $('#searchByTitle').on('keyup', function(e){
          selectedTitle = $("#searchByTitle").val().toLowerCase();
          searchByTitleCitySkill(selectedTitle, selectedCity, selectedSkill);
          if (e.keyCode === 13) {
            e.preventDefault();
            this.blur();
          }
        });
      });
      init();
    }
  }
})(jQuery, this, Drupal, drupalSettings);
