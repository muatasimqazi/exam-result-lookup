var mySpreadsheet;

function result_data(exam) {
  mySpreadsheet = exam + '#gid=0';
}
$(document).ready(function() {

  //'https://docs.google.com/spreadsheets/d/1UuEJr1ITmVAjBrQMtIkUchpl6b-42JfFbJp4QFxCS74/edit?usp=sharing#gid=0';
  var student_name, father_name, roll_number, school_name, query;

  function getResult(query) {

    $('#result-data').sheetrock({
      url: mySpreadsheet,
      query: query, //"select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"",
    });
    $('#result-data').empty();
    console.log(query);
  }
  $("#search-name").click(function() {
    student_name = $("input[name='student']").val().toUpperCase();
    father_name = $("input[name='father']").val().toUpperCase();
    query = "select A, C, D, E, F, G, H where C=" + "\"" + student_name + "\" and D=" + "\"" + father_name + "\"";
    getResult(query);
  });

  $("#roll-search").click(function() {
    roll_number = $("input[name='roll']").val();
    query = "select A, C, D, E, F, G, H where A=" + parseInt(roll_number);
    getResult(query);
  });

  $("#institute-search").click(function() {
    school_name = $("input[name='school']").val().toUpperCase();
    query = "select A, C, D, E, F, G, H where G like '%" + school_name + "%'";
    getResult(query);
  });

});
