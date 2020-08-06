//This function grabs the game name and image from the Rawg Api and appends it into a column div and then appends that column into the mainDiv parameter
function genTitleImgFromQuery(mainDiv, column, name, img) {
  //line of code grabs the gamecontent col div, creates a h1 tag in it, and then adds the title of the game from ajax resp object into it
  mainDiv.append(
    column.append(
      $("<h5>")
        .attr("class", "flow-text")
        .text("Name: " + name)
    )
  );
  //line of code that creates creates the img tag, adds the image to it, and places it into the proper div
  mainDiv.append(
    column.append(
      $("<img>").attr({ class: "responsive-img", src: img, alt: "Image" })
    )
  );
}

//This function grabs the genre object from the Rawg Api and places the info into a list which is appended into a column.  That column is then appened to the mainDiv parameter
function genGenreList(mainDiv, column, listDiv, respObject) {
  //function that runs for every index of the genre array to grab the name and place it into an li item.
  $.each(respObject.genres, function (index) {
    listDiv.append($("<li>").text(respObject.genres[index].name));
    mainDiv.append(column.append(listDiv));
  });
}

//This function grabs an array appends each element to a list item.  Appends that to a list. Puts the list in a column.  And then the column in a  specified div.
function genAuthorList(mainDiv, column, listDiv, respObject) {
  //function that runs for every index of the genre array to grab the name and place it into an li item.
  $.each(respObject.authors, function (index) {
    listDiv.append($("<li>").text(respObject.authors[index]));
    mainDiv.append(column.append(listDiv));
  });
}

//This function generates a row div with text "No results found" into the div specified as the parameter.
function noResultsFound(mainDiv) {
  var rowDiv = $("<div>").attr("class", "row flow-text");

  mainDiv.append(rowDiv.append($("<h1>").text("No Results Found")));
}

//This function is used because Rawg api capitalizes the first letters of all its game titles.  So the user search value is run through this function in the rawg query functions above
//to see if it is included in the title
function CapitalizeWords(string) {
  var wordsArray = string.split(" ");

  var capitalizedString = "";

  wordsArray.forEach(function (index) {
    var length = index.length;
    var firstLetter = index.charAt(0);
    var restOfWord = index.slice(1, length);

    var capitalized = firstLetter.toUpperCase();
    var capitalizedWord = capitalized + restOfWord;

    capitalizedString = capitalizedString + " " + capitalizedWord;
  });

  word1 = capitalizedString.trim();
  return word1;
}
