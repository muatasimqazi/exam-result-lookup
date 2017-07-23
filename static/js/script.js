$(document).ready(function() {
  var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1UuEJr1ITmVAjBrQMtIkUchpl6b-42JfFbJp4QFxCS74/edit?usp=sharing#gid=0';
  var student_name = '';
  var father_name = '';
  var roll_number = '';
  var school_name = '';

  $("input:first").keyup(function() {
    student_name = $(this).val().toUpperCase();
  }); // can add .keyup() for live results

  $("input[id][name$='father']").keyup(function() {
    father_name = $(this).val().toUpperCase();
  });

// roll number
$("input[id][name$='number']").keyup(function() {
  roll_number = $(this).val().toUpperCase();
}).keyup();
$("input[id][name$='school']").keyup(function() {
  school_name = $(this).val().toUpperCase();
});

    $("form").submit(function(){
      var query = '';
      if (student_name != '') {
        query = "select A, C, D, E, F, G, H where C="+ "\"" + student_name + "\" and D="+ "\"" + father_name + "\"";
      } else if (roll_number != '') {
        query = "select A, C, D, E, F, G, H where A="+ roll_number;
      } else if(school_name != '') {
        query = "select A, C, D, E, F, G, H where G like '%"+ school_name +"%'";
      }
      $('#result-data').sheetrock({
        url: mySpreadsheet,
        query: query,
      });
      $('#result-data').empty();
      return false;
     });





});
