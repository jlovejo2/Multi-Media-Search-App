var bookTitle = "Ender's game";


//------------------------------------------------
//google API

var queryGoogleBooks = "https://www.googleapis.com/books/v1/volumes?q=" + bookTitle;

$.ajax({
    url: queryGoogleBooks,
    method: "GET"
}).then(function (respGoogleBooks) {
    console.log(respGoogleBooks);
})

//-----------------------------------
//The Movie DB

var movieDBKey = "a5b6a31636acf8a8c3c75e4575e245dd";
var queryMovieDB = "https://api.themoviedb.org/3/search/movie?api_key=" + movieDBKey + "&query=" + bookTitle;

$.ajax({
    url: queryMovieDB,
    method: "GET"
}).then(function (respMovieDB) {
    console.log(respMovieDB);
})

//-------------------------------------
//
var queryRawg = "https://api.rawg.io/api/games?search=Thor";

$.ajax({
    url: queryRawg,
    method: "GET"
}).then(function (respRawg) {
    console.log(respRawg);
})

