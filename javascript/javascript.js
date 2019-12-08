var searchCriteria = "Thor";

$(document).ready(function () {

    $("select").formSelect();

});


//_____________________________________________
//      Add materialize code above this line
//____________________________________________

//------------------------------------------------
//google API

var queryGoogleBooks = "https://www.googleapis.com/books/v1/volumes?q=" + searchCriteria;

$.ajax({
    url: queryGoogleBooks,
    method: "GET"
}).then(function (respGoogleBooks) {
    console.log(respGoogleBooks);


});

// paul was here as well
//-----------------------------------
//The Movie DB

// var movieDBKey = "a5b6a31636acf8a8c3c75e4575e245dd";
// var queryMovieDB = "https://api.themoviedb.org/3/search/movie?api_key=" + movieDBKey + "&query=" + booktitle;

// $.ajax({
//     url: queryMovieDB,
//     method: "GET"
// }).then(function (respMovieDB) {
//     console.log(respMovieDB);



// })

//-------------------------------------

// click event for the user search button 
// $(".container").on("keyup", function (event) {
//     event.preventDefault();
//     console.log(event);
    // if event.key === "enter"
    // var userSearch = $("#userSearch").val()
    // 

// if ( e.keycode === 13) {



var queryRawg = "https://api.rawg.io/api/games?search=" + searchCriteria;

//code for the ajax query call to the Rawg api
$.ajax({
    url: queryRawg,
    method: "GET"
}).then(function (respRawg) {
    console.log(respRawg);

    //variable that is created in order to limit the number of columns placed into generated row div as 4
    var countRowDiv = 0;
    var rowDiv1 = $("<div>").attr("class", "row");

    //each function that runs for every index of the resp object returned by the ajax call to Rawg api
    $.each(respRawg.results, function (index) {

        //this if statement declares that the code will only run while count variable is less than 4.  
        if (countRowDiv < 4) {
           
            var colDiv1 = $("<div>").attr("class", "col s3");
            var genreList = $("<ul>").text("genres: ");
    
            genTitleImgFromQuery(rowDiv1, colDiv1, respRawg.results[index].name, respRawg.results[index].background_image);
            genGenreList(rowDiv1, colDiv1, genreList, respRawg.results[index]);

            countRowDiv++;
          
        } else {
            console.log(rowDiv1);
            $("#gameContent").append(rowDiv1);
            rowDiv1 = $("<div>").attr("class", "row");
            countRowDiv = 0;
        }

    });

});


// });


    //                      Functions below this line
    //___________________________________________________________________________________


    function genTitleImgFromQuery(mainDiv, column, name, img) {

        //line of code grabs the gamecontent col div, creates a h1 tag in it, and then adds the title of the game from ajax resp object into it
        mainDiv.append(column.append($("<h3>").attr("class", "flow-text").text("Name:" + name)));
        //line of code that creates creates the img tag, adds the image to it, and places it into the proper div
        mainDiv.append(column.append($("<img>").attr({ "class": "responsive-img", "src": img, "alt": "Game Image" })));

    }

    function genGenreList(mainDiv, column, genreList, respObject) {

        //function that runs for every index of the genre array to grab the name and place it into an li item.
        $.each(respObject.genres, function (index) {

            genreList.append($("<li>").text(respObject.genres[index].name))
            mainDiv.append(column.append(genreList));

        });

    }
