
var num = 0;
var articleTotal = 0;
// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
  // for (var i = 0; i< data.length; i++){
  //   // display the apropos information on the page
  //    $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ '<a href="' + data[i].link + '" target="_blank">' + data[i].link + '</a></p>');
  // }
  // $('#articles').append('<p data-id="' + data[num]._id + '">'+ data[num].title + '<br />'+ '<a href="' + data[num].link + '" target="_blank">' + data[num].link + '</a></p>');
  console.log(data.length);
  articleTotal = data.length;
  $('#articles').append('<p data-id="' + data[num]._id + '">' + '<a href="' + data[num].link + '" target="_blank">' + data[num].title + '</a><br />'+ data[num].blurb + '</p>');
});

//Left arrow clicked to cycle through articles
$('.glyphicon-arrow-left').on('click', function(){
    $('#articles').empty();
     $('#saved').append("left");
    //Down cycle through article index
    num--;

    //Make sure num never goes below index 0
    if (num < 0){
      num = 0;
    }

    $.getJSON('/articles', function(data) {
    $('#articles').append('<p data-id="' + data[num]._id + '">' + '<a href="' + data[num].link + '" target="_blank">' + data[num].title + '</a><br />'+ data[num].blurb + '</p>');
    });

  //   var thisId = $(this).attr('data-id');

  //     $.ajax({
  //   method: "GET",
  //   url: "/articles/" + thisId,
  // })
  //   // with that done, add the note information to the page
  //   .done(function( data ) {
  //     console.log(data);

  //     // if there's a note in the article
  //     if(data.note){
  //       // place the title of the note in the title input
  //       // $('#titleinput').val(data.note.title);
  //       $('#saved').append(data.note.title + '<br>' + data.note.body + '<br>');
  //       // place the body of the note in the body textarea
  //       // $('#bodyinput').val(data.note.body);
  //        // $('#saved-body').append(data.note.body);
  //     }
  //     else{
  //       //Clear the currently displayed notes
  //       $('#saved').empty();
  //     }
  //   });
});
//Right arrow clicked to cycle through articles
$('.glyphicon-arrow-right').on('click', function(){
     $('#articles').empty();
 $('#saved').append("right");
    //Up cycle through index 
    num++; 
    
    //Make sure num never exceeds articleTotal
    if(num == articleTotal){
      num--;
    }
    $.getJSON('/articles', function(data) {
    $('#articles').append('<p data-id="' + data[num]._id + '">' + '<a href="' + data[num].link + '" target="_blank">' + data[num].title + '</a><br />'+ data[num].blurb + '</p>');
    });

  //   var thisId = $(this).attr('data-id');

  // $.ajax({
  //   method: "GET",
  //   url: "/articles/" + thisId,
  // })
  //   // with that done, add the note information to the page
  //   .done(function( data ) {
  //     console.log(data);

  //     // if there's a note in the article
  //     if(data.note){
  //       // place the title of the note in the title input
  //       // $('#titleinput').val(data.note.title);
  //       $('#saved').append(data.note.title + '<br>' + data.note.body + '<br>');
  //       // place the body of the note in the body textarea
  //       // $('#bodyinput').val(data.note.body);
  //        // $('#saved-body').append(data.note.body);
  //     }
  //     else{
  //       //Clear the currently displayed notes
  //       $('#saved').empty();
  //     }
  //   });

});

// whenever someone clicks a p tag
$(document).on('click', 'p', function(){
  // empty the notes from the note section
  // $('#notes').empty();
  // save the id from the p tag
  var thisId = $(this).attr('data-id');

  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      console.log(data);
      // the title of the article
      // $('#notes').append('<h2>' + data.title + '</h2>'); 
//       // an input to enter a new title
//       $('#notes').append('<input id="titleinput" name="title" >'); 
//       // a textarea to add a new note body
//       $('#notes').append('<textarea id="bodyinput" name="body"></textarea>'); 
//       // a button to submit a new note, with the id of the article saved to it
//       $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      // if there's a note in the article
      if(data.note){
//         // place the title of the note in the title input
//         // $('#titleinput').val(data.note.title);
        $('#saved').append(data.note.title + '<br>' + data.note.body + '<br>');
//         // place the body of the note in the body textarea
//         // $('#bodyinput').val(data.note.body);
//          // $('#saved-body').append(data.note.body);
      }
      else{
        //Clear the currently displayed notes
        $('#saved').empty();
      }
    });
});

// when you click the savenote button
$(document).on('click', '#savenote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
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
