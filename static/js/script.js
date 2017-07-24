$(document).ready(function() {
  var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1UuEJr1ITmVAjBrQMtIkUchpl6b-42JfFbJp4QFxCS74/edit?usp=sharing#gid=0';
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
      url: mySpreadsheet,
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
      url: mySpreadsheet,
      query: query,
    });
    $('#result-data').empty();
    return false;
  });

  // University BA/BSc exam results
  $(".university-form").submit(function() {
    if (student_name != '' && father_name != '') {
      query = "select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"";
    } else if (roll_number != '') {
      query = "select A, C, D, E, F, G, H where A=" + parseInt(roll_number);
    } else {
      query = '';
    }
    $('#result-data').sheetrock({
      url: mySpreadsheet,
      query: query,
    });
    $('#result-data').empty();
    return false;
  });


});
