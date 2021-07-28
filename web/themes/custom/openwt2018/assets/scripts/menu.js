(function ($, window, Drupal, drupalSettings) {

  function initMenu() {
      $(".nav__menu_has_child span").addClass("menu-item-collapsible");
      var coll = document.getElementsByClassName("menu-item-collapsible");
      for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("sub-menu-opened");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none"
          } else {
            content.style.display = "block"
          }
        }
      );
    }
  }

  Drupal.behaviors.menu = {

    attach: function () {
      var screenWidth = $(window).width();
      var mobileMaxWidth = 768;

      if (mobileMaxWidth > screenWidth) {
        initMenu();
      } else {
        $(".nav__menu_has_child span").removeClass("menu-item-collapsible");
        $(".nav__menu_has_child span").removeClass("sub-menu-opened");
      }

      $(window).once('windowResize').resize(function() {
        if(mobileMaxWidth < screenWidth) {  
          initMenu()
        } else {
          $(".nav__menu_has_child span").removeClass("menu-item-collapsible");
          $(".nav__menu_has_child span").removeClass("sub-menu-opened");
        }  
      }
    )
  }
}
})(jQuery, this, Drupal, drupalSettings);
