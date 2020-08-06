//This function performs the AJAX query to the Rawg (video Game) API based on the results including the user search value in the title
function rawgKeywordQuery(searchCriteria) {
  //__________________________________________________
  //___________Begin Code for Game Api (Rawg)_________
  //__________________________________________________
  var queryRawg =
    "https://api.rawg.io/api/games?page_size=40&search=" + searchCriteria;

  //code for the ajax query call to the Rawg api
  $.ajax({
    url: queryRawg,
    method: "GET",
  }).then(function (respRawg) {
    console.log(respRawg);

    //variable that is created in order to limit the number of columns placed into generated row div as 4
    var countRowDiv2 = 0;
    var rowDiv2 = $("<div>").attr("class", "row");
    var divDontWant = $("<div>");

    //This if statement calls the noREsultsFound function if the Api brings back no results
    if (respRawg.count === 0) {
      noResultsFound($("#gameContent"));
    }

    //badge on game div
    $("#GameCount").text(respRawg.count);

    instance.open(2);

    //each function that runs for every index of the resp object returned by the ajax call to Rawg api
    $.each(respRawg.results, function (index) {
      //this if statement declares that the code will only run while count variable is less than 4. And it takes the response object and capitalizes the first letter of each word
      //and sees if the user search criteria value is included in the name of that index of the response object.  This was created because the Rawg Api pulls back games that even have
      //parts of the searched value.  Example: "titanic" would bring backs games with the word "titan" in them
      console.log(CapitalizeWords(searchCriteria));
      console.log(
        respRawg.results[index].name.includes(CapitalizeWords(searchCriteria))
      );
      console.log(respRawg.results[index].name.includes(searchCriteria));
      if (
        countRowDiv2 < 4 &&
        respRawg.results[index].name.includes(
          CapitalizeWords(searchCriteria)
        ) === true
      ) {
        var colDiv2 = $("<div>").attr("class", "col s3");
        var genreList = $("<ul>").text("genres: ");

        //this line of code calls function that grabs the name & image from Rawg Api and generates it into div parameters
        genTitleImgFromQuery(
          rowDiv2,
          colDiv2,
          respRawg.results[index].name,
          respRawg.results[index].background_image
        );
        //this line of code calls function that grabs genre object from Rawg Api and generates them into a list and writes it to div parameters
        genGenreList(rowDiv2, colDiv2, genreList, respRawg.results[index]);

        countRowDiv2++;
      } else if (
        respRawg.results[index].name.includes(
          CapitalizeWords(searchCriteria)
        ) === false
      ) {
        //this line of code calls function that grabs the name & image from Rawg Api and generates it into div parameters
        genTitleImgFromQuery(
          divDontWant,
          divDontWant,
          respRawg.results[index].name,
          respRawg.results[index].background_image
        );
      } else {
        //this code appends the rowDiv1 variable filled with the four cols append in above code to the page into the div with gameContent id
        $("#gameContent").append(rowDiv2);
        //This line of code clears the rowDiv1 variable and sets it to an empty div with class row.
        rowDiv2 = $("<div>").attr("class", "row");
        //sets the count variable to 0 so that it we can go back up to the above if statement code and start generating cols in rows again
        countRowDiv2 = 0;
      }

      $("#gameContent").append(rowDiv2);
      divDontWant.empty();
    });
  });
}

//This function performs the AJAX query to the Rawg API with the title matching the user search value
function rawgTitleQuery(searchCriteria) {
  //__________________________________________________
  //___________Begin Code for Game Api (Rawg)_________
  //__________________________________________________
  var queryRawg = "https://api.rawg.io/api/games?search=" + searchCriteria;

  //code for the ajax query call to the Rawg api
  $.ajax({
    url: queryRawg,
    method: "GET",
  }).then(function (respRawg) {
    console.log(respRawg);

    //variable that is created in order to limit the number of columns placed into generated row div as 4
    var countRowDiv2 = 0;
    var rowDiv2 = $("<div>").attr("class", "row");
    var divDontWant = $("<div>");

    //This if statement calls the noREsultsFound function if the Api brings back no results
    if (respRawg.count === 0) {
      noResultsFound($("#gameContent"));
    }

    //each function that runs for every index of the resp object returned by the ajax call to Rawg api
    $.each(respRawg.results, function (index) {
      //this if statement declares that the code will only run while count variable is less than 4. And it takes the response object and capitalizes the first letter of each word
      //and sees if the user search criteria value is included in the name of that index of the response object.  This was created because the Rawg Api pulls back games that even have
      //parts of the searched value.  Example: "titanic" would bring backs games with the word "titan" in them
      if (
        countRowDiv2 < 4 &&
        respRawg.results[index].name === CapitalizeWords(searchCriteria)
      ) {
        var colDiv2 = $("<div>").attr("class", "col s3");
        var genreList = $("<ul>").text("genres: ");

        //this line of code calls function that grabs the name & image from Rawg Api and generates it into div parameters
        genTitleImgFromQuery(
          rowDiv2,
          colDiv2,
          respRawg.results[index].name,
          respRawg.results[index].background_image
        );
        //this line of code calls function that grabs genre object from Rawg Api and generates them into a list and writes it to div parameters
        genGenreList(rowDiv2, colDiv2, genreList, respRawg.results[index]);

        countRowDiv2++;
      } else if (
        respRawg.results[index].name === CapitalizeWords(searchCriteria)
      ) {
        //this line of code calls function that grabs the name & image from Rawg Api and generates it into div parameters
        genTitleImgFromQuery(
          divDontWant,
          divDontWant,
          respRawg.results[index].name,
          respRawg.results[index].background_image
        );
      } else {
        //this code appends the rowDiv1 variable filled with the four cols append in above code to the page into the div with gameContent id
        $("#gameContent").append(rowDiv2);
        //This line of code clears the rowDiv1 variable and sets it to an empty div with class row.
        rowDiv2 = $("<div>").attr("class", "row");
        //sets the count variable to 0 so that it we can go back up to the above if statement code and start generating cols in rows again
        countRowDiv2 = 0;
      }

      $("#gameContent").append(rowDiv2);
      divDontWant.empty();
    });
  });
}
