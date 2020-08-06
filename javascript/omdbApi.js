//This function essentially changes the url for the generic OMDB ajax query to one that searches specifically for the title of the movie
function OMDBTitleQuery(movie, apiKey) {
  var titleURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=" + apiKey;

  //AJAX call
  $.ajax({
    url: titleURL,
    method: "GET",
  }).then(function (response) {
    //this opens the collapsible div when the results are rendered
    instance.open(0);

    if (response.Error === "Movie not found!") {
      noResultsFound($("#movieContent"));
    } else {
      var movieMain = $("<div>");
      movieMain.addClass("movie");

      //poster
      var imgUrl = response.Poster;
      var image = $("<img>").attr("src", imgUrl);
      movieMain.append(image);

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

      $("#movieContent").append(movieMain);

      //badge count
      $("#MovieCount").text(1);
    }
  });
}

//This function changes the url for OMDB ajax query to one that searches for for movies based on a keyword
function OMDBKeywordQuery(keyword, apiKey) {
  var keywordURL =
    "https://www.omdbapi.com/?s=" + keyword + "&apikey=" + apiKey;

  //This code performs the ajax query call based on the URL and returns response object respKeywordMovie
  $.ajax({
    url: keywordURL,
    method: "GET",
  }).then(function (respKeywordMovie) {
    var countRowDiv3 = 0;
    var rowDiv3 = $("<div>").attr("class", "row");

    //if the object returns an error call noResultsFound function
    if (respKeywordMovie.Error === "Movie not found!") {
      noResultsFound($("#movieContent"));
    }

    //this opens the collapsible div when the results are rendered
    instance.open(0);

    //badge count
    $("#MovieCount").text(respKeywordMovie.Search.length);

    //execite a function for each index of respKeywordMovie.Search object
    $.each(respKeywordMovie.Search, function (index) {
      //The below if statement, else statement and code within's purpose is to render only four objects with col classes into a div with class row.  Once four have been rendered a new row div is created.
      //this if statement runs the code within for the first four indexes (indexes: 0,1,2,3) of the response object.
      if (countRowDiv3 < 3) {
        var colDiv3 = $("<div>").attr("class", "col s12 m6 l4");

        rowDiv3.append(
          colDiv3.append(
            $("<p>").text("Title: " + respKeywordMovie.Search[index].Title)
          )
        );
        rowDiv3.append(
          colDiv3.append(
            $("<p>").text("Type: " + respKeywordMovie.Search[index].Type)
          )
        );
        rowDiv3.append(
          colDiv3.append(
            $("<p>").text(
              "Release year: " + respKeywordMovie.Search[index].Year
            )
          )
        );
        rowDiv3.append(
          colDiv3.append(
            $("<img>").attr({
              src: respKeywordMovie.Search[index].Poster,
              alt: "Movie Poster",
            })
          )
        );

        countRowDiv3++;
        //This else runs once the countRowDiv variable hits four.
      } else {
        $("#movieContent").append(rowDiv3);
        rowDiv3 = $("<div>").attr("class", "row");
        countRowDiv3 = 0;
      }
      //This line of code exists here because if the response object returns a number of results that is not divisible by 4 a row is never completely filled and doesn't get appended to bookcontent div by else statment.
      $("#movieContent").append(rowDiv3);
    });
  });
}
