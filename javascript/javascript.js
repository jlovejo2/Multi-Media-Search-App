var searchCriteria = "Thor";




//------------------------------------------------
//google API

var queryGoogleBooks = "https://www.googleapis.com/books/v1/volumes?q=" + searchCriteria;

$.ajax({
    url: queryGoogleBooks,
    method: "GET"
}).then(function (respGoogleBooks) {
    console.log(respGoogleBooks);
})
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

    $.each(respRawg.results, function (index) {
        //line of code grabs the gamecontent col div, creates a h1 tag in it, and then adds the title of the game from ajax resp object into it
        // if (respRawg.results[index].name.includes(searchCriteria) === "true") {
            if ( -1 < index <= 4  ) {
            var colDiv = $("<div>").attr("class", "col s3");

            $("#gameContent").append(colDiv.append($("<h3>").attr("class","flow-text").text("Game name:" + respRawg.results[index].name)));
            $("#gameContent").append(colDiv.append($("<img>").attr({"class":"responsive-img", "src": respRawg.results[index].background_image, "alt": "Game Image"})));
            // $("#gameContent").append(colDiv)

        }
        console.log(1);
        if(index === 12) {
            return false;
        }
    });


});

