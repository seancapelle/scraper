//Variable to set index number
var num = 0;
//Variable to set total number of articles
var articleTotal = 0;
//Article ID variable
var articleID = 0;


// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
  // for (var i = 0; i< data.length; i++){
  //   // display the apropos information on the page
  //    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ '<a href="' + data[i].link + '" target="_blank">' + data[i].link + '</a></p>');
  // }
  // $('#articles').append('<p data-id="' + data[num]._id + '">'+ data[num].title + '<br />'+ '<a href="' + data[num].link + '" target="_blank">' + data[num].link + '</a></p>');

  articleTotal = data.length;
  $('#articles').append('<p data-id="' + data[num]._id + '">' + '<a href="' + data[num].link + '" target="_blank">' + data[num].title + '</a><br />'+ data[num].blurb + '</p>');
  articleID = data[num]._id;
  console.log(articleID);
});

//Left arrow to cycle through articles
$('.glyphicon-arrow-left').on('click', function(){
    $('#articles').empty();
    //Clear the currently displayed notes
     $('#saved').empty();

    //Down cycle through article index
    num--;

    //Make sure num never goes below index 0
    if (num < 0){
      num = 0;
    }

    $.getJSON('/articles', function(data) {
      $('#articles').append('<p data-id="' + data[num]._id + '">' + '<a href="' + data[num].link + '" target="_blank">' + data[num].title + '</a><br />'+ data[num].blurb + '</p>');
      
      //Set current articleID
       articleID = data[num]._id;
    });
});

//Right arrow to cycle through articles
$('.glyphicon-arrow-right').on('click', function(){
     $('#articles').empty();
     //Clear the currently displayed notes
     $('#saved').empty();
 
    //Up cycle through index 
    num++; 
    
    //Make sure num never exceeds articleTotal
    if(num == articleTotal){
      num--;
    }
    $.getJSON('/articles', function(data) {
      $('#articles').append('<p data-id="' + data[num]._id + '">' + '<a href="' + data[num].link + '" target="_blank">' + data[num].title + '</a><br />'+ data[num].blurb + '</p>');
       
      //Set current articleID
       articleID = data[num]._id;
    });
});

//checknote button clicked
$('#checknote').on('click', function(){

  //Make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + articleID,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      console.log(data);

      // if there's a note in the article
      if(data.note){
        
        //Append the note in #saved
        $('#saved').append('<strong>' + data.note.title + '</strong><br>' + data.note.body + '<br>');
      }
      else{
        //Clear the currently displayed notes
        $('#saved').empty();
      }
    });
});

//savenote button clicked
$(document).on('click', '#savenote', function(){
 
  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + articleID,
    data: {
      title: $('#titleinput').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val("");
  $('#bodyinput').val("");
});

//deletenote button clicked
$('#deletenote').on('click', function(){
 
  //Run a POST to update the note with null
  $.ajax({
    method: "POST",
    url: "/articles/" + articleID,
    data: {
      title: null,
      body: null
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#saved').empty();
    });
});