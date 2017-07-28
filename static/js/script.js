var mySpreadsheet;
var student_name, father_name, roll_number, school_name, query;

// receives url from database
function result_data(exam) {
  mySpreadsheet = exam + '#gid=0';
}
$(document).ready(function() {

  // Compile the Handlebars template for HR leaders.
var toppersTemplate = Handlebars.compile($('#toppers-template').html());

// Load top five HR leaders.
$('#hr').sheetrock({
  url: mySpreadsheet,
  query: "select A, C, D, E, F, G, H where E is not null order by E desc",
  fetchSize: 5,
  rowTemplate: toppersTemplate
});

  function getResult(query) {

    $('#result-data').sheetrock({
      url: mySpreadsheet,
      query: query
    });
    $('#result-data').empty();

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
