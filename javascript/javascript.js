

$(document).ready(function () {

    $("select").formSelect();

    $('.parallax').parallax();

//_____________________________________________
//      Add materialize code above this line
//____________________________________________


$(".container").on("click", function (event) {
    

    //search criteria investigation
    console.log(event);
    console.log($("#book-op")[0].checked);
    console.log($(".select-dropdown").val());

    if (event.target.id === "userSearchButton" && $(".select-dropdown").val() === "Keyword") {

        event.preventDefault();
        $("#movieContent").empty();
        $("gameContent").empty();
        $("#bookContent").empty();
        console.log(2);
        
        if ($("#book-op")[0].checked === true) {
            
            console.log(1);
            //__________________________________________________
            //___________Begin Code for Book Api (Googlebooks)_________
            //__________________________________________________
            // intitle: Returns results where the text following this keyword is found in the title.
            // inauthor: Returns results where the text following this keyword is found in the author.
            // inpublisher: Returns results where the text following this keyword is found in the publisher.
            // subject: Returns results where the text following this keyword is listed in the category list of the volume.

            var searchCriteria = "Thor";
            var titleSearch = "intitle";
            var authorSearch = "inauthor";
            var subjectSearch = "subject";
            var printType = "books";
            var googleBooksApiKey = "AIzaSyCV2NuETPfhp3RfGB5gwxvt7qbXW8EMPfQ";

            var queryGoogleBooks = "https://www.googleapis.com/books/v1/volumes?q=" + searchCriteria + "&printType=books&orderBy=relevance&key=" + googleBooksApiKey;

            $.ajax({
                url: queryGoogleBooks,
                method: "GET"
            }).then(function (respGoogleBooks) {
                console.log(respGoogleBooks);

                var countRowDiv1 = 0;
                var rowDiv1 = $("<div>").attr("class", "row");

                $.each(respGoogleBooks.items, function (index) {

                    console.log(respGoogleBooks.items[index].volumeInfo.title);
                    console.log(respGoogleBooks.items[index].volumeInfo.authors);
                    // console.log(respGoogleBooks.items[index].volumeInfo.imageLinks.thumbnail);
                    console.log(respGoogleBooks.items[index].volumeInfo.subtitle);
                    console.log(respGoogleBooks.items[index].volumeInfo.publishedDate);
                    console.log(respGoogleBooks.items[index].volumeInfo.buylink);

                    if (countRowDiv1 < 4) {

                        var colDiv1 = $("<div>").attr("class", "col s3");
                        var authorList = $("<ul>").attr("class", "row");

                        //line of code grabs the gamecontent col div, creates a h1 tag in it, and then adds the title of the game from ajax resp object into it
                        rowDiv1.append(colDiv1.append($("<h5>").attr("class", "flow-text").text("Title: " + respGoogleBooks.items[index].volumeInfo.title)));
                        rowDiv1.append(colDiv1.append($("<h6>").attr("class", "flow-text").text(respGoogleBooks.items[index].volumeInfo.subtitle)));
                        rowDiv1.append(colDiv1.append($("<h6>").attr("class", "flow-text").text("Published Date: " + respGoogleBooks.items[index].volumeInfo.publishedDate)));
                        //line of code that creates creates the img tag, adds the image to it, and places it into the proper div
                        // rowDiv1.append(colDiv1.append($("<img>").attr({ "class": "responsive-img", "src": respGoogleBooks.items[index].volumeInfo.imageLinks.thumbnail, "alt": "Image" })));
                        // genTitleImgFromQuery(rowDiv1, colDiv1, respGoogleBooks.items[index].volumeInfo.title, bookImg);
                        genAuthorList(rowDiv1, colDiv1, authorList, respGoogleBooks.items[index].volumeInfo);

                        countRowDiv1++;

                    } else {

                        $("#bookContent").append(rowDiv1);
                        rowDiv1 = $("<div>").attr("class", "row");
                        countRowDiv1 = 0;
                    }
                })

            });

        }
        
        if ($("#movie-op")[0].checked === true) {
            console.log(3);
            //__________________________________________________
            //___________Begin Code for Movie Api (OMDB)_________
            //__________________________________________________
            var movie = "Titanic";

            var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

            //AJAX call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
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
        }
        
        if ($("#game-op")[0].checked === true) {
            //__________________________________________________
            //___________Begin Code for Game Api (Rawg)_________
            //__________________________________________________
            var searchCriteria = "Thor";
            var queryRawg = "https://api.rawg.io/api/games?search=" + searchCriteria;

            //code for the ajax query call to the Rawg api
            $.ajax({
                url: queryRawg,
                method: "GET"
            }).then(function (respRawg) {
                console.log(respRawg);

                //variable that is created in order to limit the number of columns placed into generated row div as 4
                var countRowDiv2 = 0;
                var rowDiv2 = $("<div>").attr("class", "row");

                //each function that runs for every index of the resp object returned by the ajax call to Rawg api
                $.each(respRawg.results, function (index) {

                    //this if statement declares that the code will only run while count variable is less than 4.  
                    if (countRowDiv2 < 4) {

                        var colDiv2 = $("<div>").attr("class", "col s3");
                        var genreList = $("<ul>").text("genres: ");

                        //this line of code calls function that grabs the name & image from Rawg Api and generates it into div parameters
                        genTitleImgFromQuery(rowDiv2, colDiv2, respRawg.results[index].name, respRawg.results[index].background_image);
                        //this line of code calls function that grabs genre object from Rawg Api and generates them into a list and writes it to div parameters
                        genGenreList(rowDiv2, colDiv2, genreList, respRawg.results[index]);

                        countRowDiv2++;

                    } else {

                        //this code appends the rowDiv1 variable filled with the four cols append in above code to the page into the div with gameContent id 
                        $("#gameContent").append(rowDiv2);
                        //This line of code clears the rowDiv1 variable and sets it to an empty div with class row.
                        rowDiv2 = $("<div>").attr("class", "row");
                        //sets the count variable to 0 so that it we can go back up to the above if statement code and start generating cols in rows again
                        countRowDiv2 = 0;
                    }
                });
            });
        }
    }
})

});






// // click event for the user search button 
// $(".container").on("keyup", function (event) {

//     // $("#userSearch").preventDefault();
//     if (event.key === "enter") {

//         console.log(event);
//         console.log(event.target.value);

//     }

// });
// if event.key === "enter"
// var userSearch = $("#userSearch").val()
// 

// if ( e.keycode === 13) {


// });

// $(".movie-input").on("click", function(event) {

// event.preventDefault();


// })



//                      Functions below this line
//___________________________________________________________________________________

//This function grabs the game name and image from the Rawg Api and appends it into a column div and then appends that column into the mainDiv parameter
function genTitleImgFromQuery(mainDiv, column, name, img) {

    //line of code grabs the gamecontent col div, creates a h1 tag in it, and then adds the title of the game from ajax resp object into it
    mainDiv.append(column.append($("<h5>").attr("class", "flow-text").text("Name: " + name)));
    //line of code that creates creates the img tag, adds the image to it, and places it into the proper div
    mainDiv.append(column.append($("<img>").attr({ "class": "responsive-img", "src": img, "alt": "Image" })));

}

//This function grabs the genre object from the Rawg Api and places the info into a list which is appended into a column.  That column is then appened to the mainDiv parameter
function genGenreList(mainDiv, column, listDiv, respObject) {

    //function that runs for every index of the genre array to grab the name and place it into an li item.
    $.each(respObject.genres, function (index) {

        listDiv.append($("<li>").text(respObject.genres[index].name))
        mainDiv.append(column.append(listDiv));

    });

}

function genAuthorList(mainDiv, column, listDiv, respObject) {
    //function that runs for every index of the genre array to grab the name and place it into an li item.
    $.each(respObject.authors, function (index) {

        listDiv.append($("<li>").text(respObject.authors[index]));
        mainDiv.append(column.append(listDiv));

    });
}





    //old code being saved
    //
    //
    //
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
