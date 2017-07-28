var mySpreadsheet;
function result_data(exam) {
  mySpreadsheet = exam + '#gid=0';
  }
$(document).ready(function() {

  //'https://docs.google.com/spreadsheets/d/1UuEJr1ITmVAjBrQMtIkUchpl6b-42JfFbJp4QFxCS74/edit?usp=sharing#gid=0';
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
    return alert("done");
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
      console.log(query)
      console.log(mySpreadsheet);
      console.log('https://docs.google.com/spreadsheets/d/1AHgBxDILDpEn79fMWy6e2mRZl8itz2DjGoDA2uZSE6I/edit?usp=sharing');
      return false;
    });


  // University MA/MSc exam results
  $("#graduate-form-one").submit(function() {
    $('#result-data').sheetrock({
      url: mySpreadsheet,
      query: "select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"",
    });
    $('#result-data').empty();
    console.log(query);
    return false;
  });


    // University MA/MSc exam results
    $("#graduate-form-two").submit(function() {
      $('#result-data').sheetrock({
        url: mySpreadsheet,
        query: "select A, C, D, E, F, G, H where A=" + parseInt(roll_number),
      });
      $('#result-data').empty();
      console.log(query);
      return false;
    });


function getResult(query) {

  $('#result-data').sheetrock({
    url: mySpreadsheet,
    query: query,//"select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"",
  });
  $('#result-data').empty();
  console.log(query);
}
    $("#search-name").click(function () {
        student_name = $("input[name='student']").val().toUpperCase();
        father_name = $("input[name='father']").val().toUpperCase();
        query = "select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"";
        getResult(query);
    });

    $("#roll-search").click(function () {
        roll_number =   $("input[name='roll']").val();
        query = "select A, C, D, E, F, G, H where A=" + parseInt(roll_number);
        getResult(query);
        alert("im");

    });

    $("#institute-search").click(function () {
      $("input[name='school']").val();

      $('#result-data').sheetrock({
        url: mySpreadsheet,
        query: "select A, C, D, E, F, G, H where G like '%" + college_name + "%'",
      });
      $('#result-data').empty();
      console.log(query);
    });



});
