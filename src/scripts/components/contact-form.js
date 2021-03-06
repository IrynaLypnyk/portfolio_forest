module.exports = function (){
  function submitForm(ev) {

    ev.preventDefault();
    //console.log(ev);

    var form = $(ev.target);


    var ajaxForm = function (form) {

      var url = form.attr('action'),
        data = form.serialize();

      return $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'JSON',
      });

    };
    var request = ajaxForm(form);


    request.done(function (msg) {
      var mes = msg.mes,
        status = msg.status;

      if (status === 'OK') {
        alert('<p class="form-success">' + mes + '</p>');

      } else {
        alert('<p class="form-error">' + mes + '</p>');

      }


    });

    request.fail(function (jqXHR, textStatus) {
      alert('Request failed: ' + textStatus);
    });

  }
  return $('#contact-form').on('submit', submitForm);
};