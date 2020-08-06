//This function sets the query url for searching by title and then calls the googelbooksQuery function
function googleBooksTitleQuery(searchCriteria, apiKey) {
  var titleURL =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    searchCriteria +
    "intitle:" +
    searchCriteria +
    "&printType=books&orderBy=relevance&key=" +
    apiKey;

  googleBooksQuery(titleURL);
}

//This function sets the query url for searching by keyword and then calls the googelbooksQuery function
function googleBooksKeywordQuery(searchCriteria, apiKey) {
  var keywordURL =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    searchCriteria +
    "&printType=books&orderBy=relevance&key=" +
    apiKey;

  googleBooksQuery(keywordURL);
}

//this function is set to run an ajax query to googlebooks api.  The parameter delivered for the function is the query url.
function googleBooksQuery(googleBooksURL) {
  //__________________________________________________
  //___________Begin Code for Book Api (Googlebooks)_________
  //__________________________________________________
  // intitle: Returns results where the text following this keyword is found in the title.
  // inauthor: Returns results where the text following this keyword is found in the author.
  // inpublisher: Returns results where the text following this keyword is found in the publisher.
  // subject: Returns results where the text following this keyword is listed in the category list of the volume.
  // var titleSearch = "intitle";
  // var authorSearch = "inauthor";
  // var subjectSearch = "subject";
  // var printType = "books";

  //this code performs a get ajax query to the google books api with the url for the api call as the parameter
  $.ajax({
    url: googleBooksURL,
    method: "GET",
  }).then(function (respGoogleBooks) {
    var countRowDiv1 = 0;
    var rowDiv1 = $("<div>").attr("class", "row");

    //this opens the collapsible div when the results are rendered
    instance.open(1);

    //badge count
    $("#BookCount").text(respGoogleBooks.items.length);

    //this if statement runs the code when there are no items delivered by the api
    if (respGoogleBooks.totalItems === 0) {
      //this code calls the noResultsFound function.  The parameter needed is the div that the function will render the content into
      noResultsFound($("#bookContent"));
    }
    //This line is starting and a function that will run for each element of the googlebooks response object delivered by api
    $.each(respGoogleBooks.items, function (index) {
      //The below if statement, else statement and code within's purpose is to render only four objects with col classes into a div with class row.  Once four have been rendered a new row div is created.
      //this if statement runs the code within for the first four indexes (indexes: 0,1,2,3) of the response object.
      if (countRowDiv1 < 4) {
        var colDiv1 = $("<div>").attr("class", "col s3");
        var authorList = $("<ul>").attr("class", "row");

        //line of code grabs the col div, creates a h6 tag in it, and then adds the title of the book from ajax resp object into it
        rowDiv1.append(
          colDiv1.append(
            $("<h6>")
              .attr("class", "flow-text")
              .text("Title: " + respGoogleBooks.items[index].volumeInfo.title)
          )
        );
        //line of code grabs the col div, creates a p tag, adds the designated classes, and then adds the subtitle for book from response objet in it
        rowDiv1.append(
          colDiv1.append(
            $("<p>")
              .attr("class", "flow-text")
              .text(respGoogleBooks.items[index].volumeInfo.subtitle)
          )
        );
        //line of code creates a p tag, adds designated classes, and adds the published date of book into it
        rowDiv1.append(
          colDiv1.append(
            $("<p>")
              .attr("class", "flow-text")
              .text(
                "Published Date: " +
                  respGoogleBooks.items[index].volumeInfo.publishedDate
              )
          )
        );
        if (respGoogleBooks.items[index].volumeInfo.imageLinks) {
          //line of code that creates creates the img tag, adds the image to it, and places it into the proper div
          rowDiv1.append(
            colDiv1.append(
              $("<img>").attr({
                class: "responsive-img",
                src:
                  respGoogleBooks.items[index].volumeInfo.imageLinks.thumbnail,
                alt: "Image",
              })
            )
          );
        }
        // genTitleImgFromQuery(rowDiv1, colDiv1, respGoogleBooks.items[index].volumeInfo.title, bookImg);
        genAuthorList(
          rowDiv1,
          colDiv1,
          authorList,
          respGoogleBooks.items[index].volumeInfo
        );

        countRowDiv1++;
        //This else runs once the countRowDiv variable hits four.
      } else {
        //line of code takes the rowDiv1 variable full of the rendered content from the first four indexes and appends it to the bookcontent div.
        $("#bookContent").append(rowDiv1);
        //this line of code essentially empties the rowdiv1 variable (since the content has already been appended) and resets it back to an empty div with class row.
        rowDiv1 = $("<div>").attr("class", "row");
        //this line of resets the countRowDiv1 variable back to 0;
        countRowDiv1 = 0;
      }
      //This line of code exists here because if the response object returns a number of results that is not divisible by 4 a row is never completely filled and doesn't get appended to bookcontent div by else statment.
      $("#bookContent").append(rowDiv1);
    });
  });
}
