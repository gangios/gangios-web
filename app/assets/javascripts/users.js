$(document).ready(function() {
  // tabs
  $("ul.tabs li").fadeIn(400);
  $("ul.tabs li:first").addClass("active").fadeIn(400);
  $(".tab_content:first").fadeIn();
  $("ul.tabs li").click(function() {
    if ($(this).is(".active")) return false;
    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");
    var activeTab = $(this).find("a").attr("href");
    $('.tab_content').fadeOut();
    $(activeTab).delay(400).fadeIn();
    ResetForm();
    return false;
  });

  options = {
    "sDom": 'fCl<"clear">rtip',
    "sPaginationType": "full_numbers",
    "aaSorting": [],
    "aoColumns": [{"bSortable": false }, null, null, null, null, {"bSortable": false }],
    "fnDrawCallback": function() {
      $('.ck,.chkbox,.checkAll ,input:radio').customInput();
    }
  };

  $('#data_table1').dataTable(options);

  $.extend(options, {
    "aoColumns": [{"bSortable": false }, null, null, null, {"bSortable": false }],
  })
  $('#data_table2').dataTable(options);

  $(".dataTables_wrapper .dataTables_length select").addClass("small");

  // checkbox All in Table
  $(".checkAll").click(function() {
    var table = $(this).parents('table');
    var checkedStatus = this.checked;
    var id = this.id;
    table.find("tbody tr td:first-child input:checkbox").each(function() {
      this.checked = checkedStatus;
      if (this.checked) {
        $(this).attr('checked', $('.' + id).is(':checked'));
        $('label[for=' + $(this).attr('id') + ']').addClass('checked');
      } else {
        $(this).attr('checked', $('.' + id).is(''));
        $('label[for=' + $(this).attr('id') + ']').removeClass('checked');
      }
    });
  });

  // Confirm Delete.
  $(".Delete").click(function() {
    var name = $(this).attr("name");
    var url = $(this).attr("href");
    var type = 'GROUP';
    if ($('#tab1').is(':visible')) type = 'USER';
    Delete(name, url, type);
    return false;
  });

  $(".DeleteAll").click(function() {
    var name = '';
    var url = [];
    $(".load_page .checker.checked:visible").parents('tr').find("a[title='Delete']").each(function() {
      name += $(this).attr("name") + ' ';
      url.push($(this).attr("href"));
    });
    var type = 'GROUPS';
    if ($('#tab1').is(':visible')) type = 'USERS';
    Delete(name, url, type);
    return false;
  });

  $('select').not("select.chzn-select,select[multiple],select#box1Storage,select#box2Storage").selectmenu({
    style: 'dropdown',
    transferClasses: true,
    width: null
  });

  // Overlay form
  $(".on_load").click(function() {
    if ($('#overlay').is(':visible')) return false;
    $("#load_form").empty().load($(this).attr("href"), function() {
      $("#tab_content").hide();
      $("#show_form").fadeIn(400);
    });
    $('#overlay').css('opacity', 0.5).fadeIn();
    return false;
  });

  $(".on_prev").click(function() {
    GoPrev();
  });

  $('#overlay').click(function() {
    GoPrev();
  });

  $(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
      GoPrev();
    }
  });
});

function ResetForm() {
  $('form').resetForm();
  $('.validation').validationEngine('hideAll');
}

function GoPrev() {
  if ($('#overlay').is(':hidden')) return;
  $("#show_form").fadeOut('fast', function() {
    $("#tab_content").show();
    $('#overlay').fadeOut();
  });
  ResetForm();
}

function Delete(name, url, type) {
  $.confirm({
    'title': 'DELETE DIALOG BOX',
    'message': " <strong>YOU WANT TO DELETE " + type + "</strong><br /><font color=red>' " + name + " '</font> ",
    'buttons': {
      'Yes': {
        'class': 'special',
        'action': function() {
          if (type === "USER" || type === "GROUP") {
            deleteItem(url, function(data, textStatus, xhr) {
              showSuccess("Delete " + type + " " + name);
              GoPrev();
              LoadContent("/users");
            });
          } else {
            var count = 0;
            for (i in url) {
              deleteItem(url[i], null);
            }
            showSuccess("Delete " + type);
            GoPrev();
            LoadContent("/users");
          }
        }
      },
      'No': {
        'class': ''
      }
    }
  });
}

function deleteItem(url, succ) {
  $.ajax({
    url: url,
    type: 'DELETE',
    dataType: 'json',
    success: succ,
    error: function(xhr, textStatus, errorThrown) {
      data = JSON.parse(xhr.responseText);
      errors = data.errors;

      str = '';
      for (error in errors) {
        str += error + ' ' + errors[error] + '<br />';
      }
      showError(str, 5000);
    }
  });
}