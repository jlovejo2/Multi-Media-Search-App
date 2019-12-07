var searchCriteria = "Thor";

$(document).ready(function () {

    $("select").formSelect();

});
$(document).ready(function(){
    $('.parallax').parallax();
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
//
var queryRawg = "https://api.rawg.io/api/games?search=" + searchCriteria;

$.ajax({
    url: queryRawg,
    method: "GET"
}).then(function (respRawg) {
    console.log(respRawg);

    var rowDiv1 = $("<div>").attr("class", "row");
    $("#gameContent").append(rowDiv1);

    // if (respRawg.results[index].name.includes(searchCriteria) === "true")
    $.each(respRawg.results, function (index) {
        if (-1 < index <= 3) {
            
            var colDiv1 = $("<div>").attr("class", "col s3");
            var genreList = $("<ul>").text("genres: ");

            
            genTitleImgFromQuery(rowDiv1, colDiv1, respRawg.results[index].name, respRawg.results[index].background_image);
            genGenreList(rowDiv1, colDiv1, genreList, respRawg.results[index]);

            // $("#gameContent").append(colDiv)

        } else if (3 < index <= 7) {

            var colDiv = $("<div>").attr("class", "col s3");
            var genreList = $("<ul>").text("genres: ");

            genTitleImgFromQuery($("#gameContent"), colDiv, respRawg.results[index].name, respRawg.results[index].background_image);
            genGenreList($("#gameContent"), colDiv, genreList, respRawg.results[index]);

            // $("#gameContent").append(colDiv)

        } else if (7 < index <= 11) {

            var colDiv = $("<div>").attr("class", "col s3");
            var genreList = $("<ul>").text("genres: ");

            genTitleImgFromQuery($("#gameContent"), colDiv, respRawg.results[index].name, respRawg.results[index].background_image);
            genGenreList($("#gameContent"), colDiv, genreList, respRawg.results[index]);

            // $("#gameContent").append(colDiv)

        } else {
            return false;
        }

    });

});



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
