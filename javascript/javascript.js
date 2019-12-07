

$(document).ready(function () {

    $("select").formSelect();

    $('.parallax').parallax();
});


//_____________________________________________
//      Add materialize code above this line
//____________________________________________

//------------------------------------------------
//google API

var searchCriteria = "Thor";
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
    var rowDiv2 = $("<div>").attr("class", "row");
    var rowDiv3 = $("<div>").attr("class", "row");

    $("#gameContent").append(rowDiv1);
    $("#gameContent").append(rowDiv2);
    $("#gameContent").append(rowDiv3);

    // if (respRawg.results[index].name.includes(searchCriteria) === "true")
    $.each(respRawg.results, function (index) {
        if ("-1" < index <= "3") {
            
            var colDiv1 = $("<div>").attr("class", "col s3");
            var genreList = $("<ul>").text("genres: ");
    
            genTitleImgFromQuery(rowDiv1, colDiv1, respRawg.results[index].name, respRawg.results[index].background_image);
            genGenreList(rowDiv1, colDiv1, genreList, respRawg.results[index]);

            // $("#gameContent").append(colDiv)


        } else if ("3" < index <= "7") {

            var colDiv2 = $("<div>").attr("class", "col s3");
            var genreList = $("<ul>").text("genres: ");

            genTitleImgFromQuery(rowDiv2, colDiv2, respRawg.results[index].name, respRawg.results[index].background_image);
            genGenreList(rowDiv2, colDiv2, genreList, respRawg.results[index]);

            // $("#gameContent").append(colDiv)

        } else if ("7" < index <= "11") {

            var colDiv3 = $("<div>").attr("class", "col s3");
            var genreList = $("<ul>").text("genres: ");

            genTitleImgFromQuery(rowDiv3, colDiv3, respRawg.results[index].name, respRawg.results[index].background_image);
            genGenreList(rowDiv3, colDiv3, genreList, respRawg.results[index]);

            // $("#gameContent").append(colDiv)

        } else {
            return false;
        }

    });

});


// $(".movie-input").on("click", function(event) {

    // event.preventDefault();


    var movie = "Titanic";

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    
    //AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var movieMain = $("<div>");
        movieMain.addClass("movie");

        //rating
        
        var rating = response.Rated;
        var pRating = $("<p>");
        pRating.text("Rating: " + rating);
        movieMain.append(pRating);

        //release
        var dateRelease = response.Released;
          var pRelease = $("<p>");
          pRelease.text("Released: " + dateRelease);
          movieMain.append(pRelease);

         //plot 
          var plot = response.Plot;
          var pPlot = $("<p>");
          pPlot.text("Plot: " + plot);
          movieMain.append(pPlot);

         //poster 
          
          var imgUrl = response.Poster;
          var image = $("<img>").attr("src", imgUrl);
          movieMain.append(image);
        
          $("#movieContent").append(movieMain);

    });

// })


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
