
function result_data(exam) {
  var mySpreadsheet = '';//exam.ninth + '#gid=0';           // The function returns the product of p1 and p2
  console.log(exam.ninth);

$(document).ready(function() {
  // var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1UuEJr1ITmVAjBrQMtIkUchpl6b-42JfFbJp4QFxCS74/edit?usp=sharing#gid=0';
  var student_name = '';
  var father_name = '';
  var roll_number = '';
  var school_name = '';
  var query = '';

  $("input[name='student']").keyup(function() {
    student_name = $(this).val().toUpperCase();
  }); // can add .keyup() for live results

  $("input[name='father']").keyup(function() {
    father_name = $(this).val().toUpperCase();
  });

  // roll number
  $("input[name='roll']").keyup(function() {
    roll_number = $(this).val();
  });
  $("input[name='school']").keyup(function() {
    school_name = $(this).val().toUpperCase();
  });

  // High School matric exam results
  $(".matric-form").submit(function() {
    if (student_name != '' && father_name != '') {
      query = "select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"";
    } else if (roll_number != '') {
      query = "select A, C, D, E, F, G, H where A=" + parseInt(roll_number);
    } else if (school_name != '') {
      query = "select A, C, D, E, F, G, H where G like '%" + school_name + "%'";
    } else {
      query = '';
    }
    $('#result-data').sheetrock({
      url: exam.ninth,
      query: query,
    });
    $('#result-data').empty();
    return false;
  });

  // College FA/FSc exam results
  $(".college-form").submit(function() {
    if (student_name != '' && father_name != '') {
      query = "select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"";
    } else if (roll_number != '') {
      query = "select A, C, D, E, F, G, H where A=" + parseInt(roll_number);
    } else if (college_name != '') {
      query = "select A, C, D, E, F, G, H where G like '%" + college_name + "%'";
    } else {
      query = '';
    }
    $('#result-data').sheetrock({
      url: exam.fa_fsc,
      query: query,
    });
    $('#result-data').empty();
    return false;
  });

  // University BA/BSc exam results
  $(".ungraduate-form").submit(function() {
    if (student_name != '' && father_name != '') {
      query = "select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"";
    } else if (roll_number != '') {
      query = "select A, C, D, E, F, G, H where A=" + parseInt(roll_number);
    } else {
      query = '';
    }
    $('#result-data').sheetrock({
      url: exam.ba_bsc,
      query: query,
    });
    $('#result-data').empty();
    return false;
  });

  // University MA/MSc exam results
  $(".graduate-form").submit(function() {
    if (student_name != '' && father_name != '') {
      query = "select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"";
    } else if (roll_number != '') {
      query = "select A, C, D, E, F, G, H where A=" + parseInt(roll_number);
    } else {
      query = '';
    }
    $('#result-data').sheetrock({
      url: exam.ma_msc,
      query: query,
    });
    $('#result-data').empty();
    return false;
  });

// var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1qT1LyvoAcb0HTsi2rHBltBVpUBumAUzT__rhMvrz5Rk/edit#gid=0';
  // Compile the Handlebars template for HR leaders.
  var HRTemplate = Handlebars.compile($('#hr-template').html());

  // Load top five HR leaders.
  $('#hr').sheetrock({
    url: mySpreadsheet,
    query: "select A, C, D, E, F, G, H where E is not null order by E desc",
    fetchSize: 5,
    rowTemplate: HRTemplate
  });

  // admin
  $("#mytable #checkall").click(function () {
        if ($("#mytable #checkall").is(':checked')) {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });

    $("[data-toggle=tooltip]").tooltip();
});
}
