(function ($, window, Drupal, drupalSettings) {

  
    Drupal.behaviors.addPeople = {
      attach: function (context, settings) {
        var val = $( 'input[name=number_of_participants]:checked' ).val();
        $('<span id="numbers" class="number-block">'+ val + '</span>').insertAfter(".form-item-number-of-participants:first-child");
        
        $('input[name=number_of_participants]').on("change",function(){
          val = $( 'input[name=number_of_participants]:checked' ).val();
          $('#numbers').text(val);
          $('input[name=participants]').val(val);
        });
        
      }
    }
    
  
  })(jQuery, this, Drupal, drupalSettings);
  