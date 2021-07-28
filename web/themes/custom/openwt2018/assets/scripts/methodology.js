(function ($, window, Drupal, drupalSettings) {
  Drupal.behaviors.methodology = {
    attach: function () {
      var article = $('article'),
        header = $('.methodology-header'),
        menu = drupalSettings.menu,
        navHeader = $('<nav/>', {
          'class': 'nav-methodo__wrapper nav-methodo-header container-fluid'
        }),
        navFooter = $('<nav/>', {
          'class': 'nav-methodo__wrapper nav-methodo-footer'
        }),
        hasPassed = true,
        nextSet = false;

      for (var i = 0; i < menu.length; i++) {
        var title = menu[i].title,
          url = menu[i].url,
          isActive = menu[i].is_active;
        hasPassed = hasPassed ? !isActive : hasPassed;
        if (hasPassed) {
          navHeader.once('headerLink_' + i)
            .append($('<a/>', {
                href: url,
                'class': 'no-link'
              })
                .append($('<span/>', {
                    'class': 'index'
                  })
                    .text(i + 1)
                )
            );
        }
        else if (isActive) {
          navHeader.once('headerLink_' + i)
            .append($('<a/>', {
                href: url,
                'class': 'active no-link'
              })
                .append($('<span/>', {
                    'class': 'index'
                  })
                    .text(i + 1)
                )
                .append($('<span/>', {
                    'class': 'txt'
                  })
                    .text(title)
                )
            );
        }
        else {
          navHeader.once('headerLink_' + i)
            .append($('<a/>', {
                href: url,
                'class': 'no-link'
              })
                .append($('<span/>', {
                    'class': 'index'
                  })
                    .text(i + 1)
                )
                .append($('<span/>', {
                    'class': 'txt'
                  })
                    .text(title)
                )
            );
          navFooter.once('footerLink_' + i)
            .append($('<a/>', {
                href: url,
                'class': nextSet ? 'no-link' : 'next no-link'
              })
                .append($('<span/>', {
                    'class': 'index'
                  })
                    .text(i + 1)
                )
                .append($('<span/>', {
                    'class': 'txt'
                  })
                    .text(title)
                )
            );
          nextSet = true;
        }
      }

      article.once('methodoNavFooter').append(navFooter);
      header.once('methodoNavHeader').prepend(navHeader);

    }
  }
})(jQuery, this, Drupal, drupalSettings);
