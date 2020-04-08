(function($){

  'use strict';

  function initContactForm() {

    var requiredInputs = $('#contact-form').find('input[data-required="true"], textarea[data-required="true"]').toArray();

    var isValidForm = function() {
      var toReturn;

      requiredInputs.forEach(function(element, index){
        if (!$(element).val()) {
          toReturn = false;
        } else{
          toReturn = true;
        }
      });

      return toReturn;
    }

    $('#contact-form').on('submit', function(event) {

      event.preventDefault();

      requiredInputs.forEach(function(element, index){
        if (!$(element).val()) {
          $(element).parent('.form-group').addClass('has-error');
        } else{
          $(element).parent('.form-group').removeClass('has-error');
        }
      });

      if (isValidForm()) {
        $.ajax({
          url: $(this).attr('action'),
          type: 'POST',
          data: $(this).serialize(),
          crossDomain: true,
          xhrFields: {
            withCredentials: true
          }
        })
        var message = $('#contact-form').data('success-text') || 'Your message has been sent. We will get back to you shortly!';
        var succesTemplate = '<div role="alert" class="alert alert-success alert-outline">'+ message +'</div>';
        $('#contact-form .alert').fadeOut(300);
        $(succesTemplate).insertBefore($('#contact-form button'));
      }
    });

    $('#contact-form input, #contact-form textarea').on('keyup', function(event) {
      event.preventDefault();
      if ($(this).val()) {
        $(this).parent('.form-group').removeClass('has-error');
      }
    });
  }

  function init () {
    initContactForm();
  }

  init();

})(jQuery)