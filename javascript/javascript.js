//var bookTitle = "Ender's game";


//------------------------------------------------
//google API

//var queryGoogleBooks = "https://www.googleapis.com/books/v1/volumes?q=" + bookTitle;

//$.ajax({
    //url: queryGoogleBooks,
   // method: "GET"
//}).then(function (respGoogleBooks) {
    //console.log(respGoogleBooks);
//})

//-----------------------------------
//The Movie DB

//var movieDBKey = "a5b6a31636acf8a8c3c75e4575e245dd";
//var queryMovieDB = "https://api.themoviedb.org/3/search/movie?api_key=" + movieDBKey + "&query=" + bookTitle;

//$.ajax({
   // url: queryMovieDB,
    //method: "GET"
//}).then(function (respMovieDB) {
    //console.log(respMovieDB);
//})

//-------------------------------------
//



//function displayGameInfo() {

//var queryRawg = "https://api.rawg.io/api/games?search=Thor";

//$.ajax({
    //url: queryRawg,
    //method: "GET"
//}).then(function (respRawg) {
    
    //var gameMain = $("<div>");
    //$(gameMain).addClass("game");
//})

//}



    var movie = "Titanic";

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    
    //AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var movieMain = $("<div>");
        $(movieMain).addClass("movie");
        
        var rating = response.Rated;
        var pRating = $("<p>");
        $(pRating).text("Rating: " + rating);
        $(movieMain).append(pRating);

        var dateRelease = response.Released;
          var pRelease = $("<p>");
          $(pRelease).text("Released: " + dateRelease);
          $(movieMain).append(pRelease);

          
          var plot = response.Plot;
          var pPlot = $("<p>");
          $(pPlot).text("Plot: " + plot);
          $(movieMain).append(pPlot);
          
          var imgUrl = response.Poster;
          var image = $("<img>").attr("src", imgUrl);
          $(movieMain).append(image);
          $("#movies-view").prepend(movieMain);

          console.log(response);


})
