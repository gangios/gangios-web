$(document).ready(function() {

  $('.validation').validationEngine();

  $('.validation').submit(function() {
    form = $(this);
    if (!form.validationEngine('validate')) return false;

    var options = {
      success: function(data) {
        console.log(data);
        h2 = form.parent().find('h2');
        action = h2.attr('title') + ' ';
        action += eval('data.' + h2.attr('name'));
        showSuccess(action);
        GoPrev();
        LoadContent("users");
      },
      error: function (xhr, ajaxOptions, thrownError) {
        data = JSON.parse(xhr.responseText);
        errors = data.errors;

        str = '';
        for (error in errors) {
          str += error + ' ' + errors[error] + '<br />';
        }
        showError(str);
      },
      // post-submit callback 
      dataType: 'json' // 'xml', 'script', or 'json' (expected server response type) 
    };

    form.ajaxSubmit(options);

    return false;
  });
});