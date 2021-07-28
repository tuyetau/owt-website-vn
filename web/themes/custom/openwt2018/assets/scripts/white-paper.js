(function ($, window, Drupal, drupalSettings) {

  
    Drupal.behaviors.downloadAfterSubmit = {
      attach: function (context, settings) {
      
        $("#downloadBlock").hide();
        var url = $("#btnDownloadWhitePaper").attr('href');
       
        $('[data-remodal-id="modalDownloadWhitePaper"] .webform-button--submit').once('auto-close-modal').on('click', function() {
          
          setTimeout(function(){
            $('.remodal-close').click();
            downloadFile(url, 'white-paper');
           
          }, 1500);
          $("#downloadBlock").show();
         
        });
      }
    }
    function downloadFile(fileURL, fileName) {
      // for non-IE
      if (!window.ActiveXObject) {
          var save = document.createElement('a');
          save.href = fileURL;
          save.target = '_blank';
          save.download = fileName || 'unknown';
  
          var evt = new MouseEvent('click', {
              'view': window,
              'bubbles': true,
              'cancelable': false
          });
          save.dispatchEvent(evt);
  
          (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
  
      // for IE < 11
      else if ( !! window.ActiveXObject && document.execCommand)     {
          var _window = window.open(fileURL, '_blank');
          _window.document.close();
          _window.document.execCommand('SaveAs', true, fileName || fileURL)
          _window.close();
      }
  }
  })(jQuery, this, Drupal, drupalSettings);
  