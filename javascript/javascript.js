var userSearchObject = [];

$(document).ready(function () {
  //This is the initialization of page function.  It has some jquery essential for materialize CSS in it.
  //Also contains code for rendering search buttons from localStorage object
  init();

  //______________________________________________________
  //_______Add Materialize Code above this lie____________
  //______(Materialize Code added to init function)________

  //this code below keeps more than one collapsible div open at a time
  var elem = document.querySelector(".collapsible.expandable");
  var instance = M.Collapsible.init(elem, {
    accordion: false,
  });

  var googleBooksApiKey = "AIzaSyCV2NuETPfhp3RfGB5gwxvt7qbXW8EMPfQ";
  var OMDBApiKey = "trilogy";
  var fullContainer = $("#fullPageContainer");
  var mainModalDiv = $("<div>").attr({ id: "mainModalDiv", class: "row" });

  fullContainer.append(mainModalDiv);

  //click event on the entire container of the page
  fullContainer.on("click", function (event) {
    //These are variables that exist within the click event and are used in API search function which is a series of if statements checking for the search criteria of the user.
    //Then based on criteria it runs the proper function to perform the proper search in the right API.
    var dropDownValue = $(".select-dropdown").val();
    var userSearchValue = $("#userSearch").val();
    var bookCheckedBool = $("#book-op")[0].checked;
    var movieCheckedBool = $("#movie-op")[0].checked;
    var gameCheckedBool = $("#game-op")[0].checked;

    //the below if statement is looking for a click on the submit buttom and if the dropdown menu option "Keyword is selected"
    if (event.target.id === "userSearchButton") {
      // event.preventDefault();

      //This function checks the users designated search criteria
      userAPISearch(
        userSearchValue,
        dropDownValue,
        bookCheckedBool,
        movieCheckedBool,
        gameCheckedBool
      );
      saveUserInput(
        userSearchValue,
        dropDownValue,
        bookCheckedBool,
        movieCheckedBool,
        gameCheckedBool
      );
    }

    //the below if statement is looking for a click on the class userSearchListButton.  Essentially looking for the buttons user search list
    if (event.target.className.includes("userSearchListButton") === true) {
      //This variable grabs the userSearch button text and splits its contents into an array of three elements
      var keynameValue = event.target.innerHTML.split(":", 3);

      //this code runs a function for each index of userSearch Object.  It is looking for the searchText key value that matches the keynameValue variable.
      //When it finds that key: value pair it uses the content in the object to run a user API search
      $.each(userSearchObject, function (index) {
        //if statement checking for userSearchObjects key:value pairs that match the keynameValue variables based on the keyname variable array elements.  If it mat
        if (
          userSearchObject[index].searchText == keynameValue[0] &&
          userSearchObject[index].DropDownChoice == keynameValue[1].trim() &&
          keynameValue[2].includes("book") === userSearchObject[index].books &&
          keynameValue[2].includes("movie") ===
            userSearchObject[index].movies &&
          keynameValue[2].includes("game") === userSearchObject[index].games
        ) {
          //calls the userAPI search function
          userAPISearch(
            userSearchObject[index].searchText,
            userSearchObject[index].DropDownChoice,
            userSearchObject[index].books,
            userSearchObject[index].movies,
            userSearchObject[index].games
          );
        }
      });
    }
    //this if statment checks the click event for the close "X" button
    if (event.target.textContent === "X") {
      var keynameSearchListButton = event.target.parentElement.children[0].innerHTML.split(
        ":",
        1
      );

      //This code runs a function for each index of userSearchObject.  It is looking for the searchText key value that matches the keynameSearchListButton variable.
      $.each(userSearchObject, function (index) {
        if (userSearchObject[index].searchText == keynameSearchListButton) {
          //removes the element associated with searchTExt that matches the keynameSearchListButton variable
          userSearchObject.splice(index, 1);
          //Removes the li div that is associated with the "X" button from the search button list
          event.toElement.closest("li").remove();
          //takes the searchedCityNames that has had the city removed from it and sets it to local storage
          localStorage.setItem(
            "userSearchObject",
            JSON.stringify(userSearchObject)
          );
        }
      });
    }
  });

  //___________________________________________________________________________________
  //                      Functions below this line
  //___________________________________________________________________________________

  //This function pulls the information from localStorage searchedCityNames array and generates the buttons for them.
  function init() {
    //This line grabs the data from localStorage, parses it, and sets it as variable storedCities
    var storedUserSearchData = JSON.parse(
      localStorage.getItem("userSearchObject")
    );

    //______Jquery for Materialize__________
    $("select").formSelect();

    $(".parallax").parallax();

    $(".collapsible").collapsible();
    //_____________________________________

    // If events weren't retrieved from localStorage, set the storedUserSearchData equal to userSearchObject.
    if (storedUserSearchData !== null) {
      userSearchObject = storedUserSearchData;
      //run a function for each index of userSearchObject that calls the renderSearchButtons function and makes a button based on search criteria.
      $.each(userSearchObject, function (index) {
        renderSearchButtons(
          userSearchObject[index].searchText,
          userSearchObject[index].DropDownChoice,
          userSearchObject[index].books,
          userSearchObject[index].movies,
          userSearchObject[index].games
        );
      });
    }
  }

  //This function is a generalized function that performs all the API searchs based on the given user search critieria.  This function is called in multiple click events
  function userAPISearch(
    userSearchValue,
    dropDownValue,
    bookCheckedBool,
    movieCheckedBool,
    gameCheckedBool
  ) {
    //This line of code is necessary because if a user triggers both modals then a hidden style is automatically added to it and it will conflict with function of the site
    $("body").removeAttr("style");

    //These lines of code clear the page of previously rendered content when search button is clicked.
    $("#mainModalDiv").empty();
    $("#movieContent").empty();
    $("#movieContent").removeAttr("style");
    $("#gameContent").empty();
    $("#gameContent").removeAttr("style");
    $("#bookContent").empty();
    $("#bookContent").removeAttr("style");

    //this if statement runs the code within when keyword is selected in the dropdown
    if (
      gameCheckedBool === false &&
      bookCheckedBool === false &&
      movieCheckedBool === false
    ) {
      var modalDiv = $("<div>").attr({ class: "modal", id: "checkboxModal" });
      var modalContentDiv = $("<div>").attr("class", "modal-content");
      var modalFooter = $("<div>").attr("class", "modal-footer");

      modalContentDiv.append($("<h4>").text("Notification: Please read "));
      modalContentDiv.append(
        $("<p>").text("Checkbox not clicked.  Please check at least one.")
      );

      modalFooter.append(
        $("<a>")
          .attr({
            href: "#!",
            class: "modal-close waves-effect waves-green btn-flat",
          })
          .text("Close")
      );

      modalDiv.append(modalContentDiv);
      modalDiv.append(modalFooter);

      $("#mainModalDiv").append(modalDiv);

      //this line of code is important to initialize the modal before triggering it in the code to open
      $(".modal").modal();

      //this line of code grabs the modal div and opens it
      $("#checkboxModal").modal("open");
    }
    if (dropDownValue === "Keyword") {
      //this if statement is looking for the book checkbox to be checked
      if (bookCheckedBool === true) {
        googleBooksKeywordQuery(userSearchValue, googleBooksApiKey);
      }
      //this if statement is looking for the movie checkbox to be checked
      if (movieCheckedBool === true) {
        OMDBKeywordQuery(userSearchValue, OMDBApiKey);
      }
      //this if statement is looking for the game checkbox to be checked
      if (gameCheckedBool === true) {
        rawgKeywordQuery(userSearchValue);
      }
      // saveUserInput(userSearchValue, dropDownValue, bookCheckedBool, movieCheckedBool, gameCheckedBool);

      //this if statement runs the code within if Title is selected in the dropdown menu
    } else if (dropDownValue === "Title") {
      if (movieCheckedBool === true) {
        OMDBTitleQuery(userSearchValue, OMDBApiKey);
      }

      if (bookCheckedBool === true) {
        googleBooksTitleQuery(userSearchValue, googleBooksApiKey);
      }

      if (gameCheckedBool === true) {
        rawgTitleQuery(userSearchValue);
      }

      // saveUserInput(userSearchValue, dropDownValue, bookCheckedBool, movieCheckedBool, gameCheckedBool);
    } else {
      var modalDiv = $("<div>").attr({ class: "modal", id: "dropdownModal" });
      var modalContentDiv = $("<div>").attr("class", "modal-content");
      var modalFooter = $("<div>").attr("class", "modal-footer");

      modalContentDiv.append($("<h4>").text("Notification: Please read "));
      modalContentDiv.append(
        $("<p>").text("Must choose a search criteria option in pulldown menu.")
      );

      modalFooter.append(
        $("<a>")
          .attr({
            href: "#!",
            class: "modal-close waves-effect waves-green btn-flat",
          })
          .text("Close")
      );
      modalDiv.append(modalContentDiv);
      modalDiv.append(modalFooter);

      $("#mainModalDiv").append(modalDiv);

      //this line of code is important to initialize the modal before triggering it in the code to open
      $(".modal").modal();
      //this line of code grabs the modal div and opens it
      $("#dropdownModal").modal("open");
    }
  }

  //This function saves the user search data criteria to userSearchObject which is then saved to localStorage.
  function saveUserInput(
    userSearchValue,
    dropDownOption,
    bookCheck,
    movieCheck,
    gameCheck
  ) {
    //Grab the current userSearchObject array and push the new user input into it
    userSearchObject.push({
      searchText: userSearchValue,
      DropDownChoice: dropDownOption,
      books: bookCheck,
      movies: movieCheck,
      games: gameCheck,
    });
    //Save the userSearchObject array with new search criteria in it to localStorage
    localStorage.setItem("userSearchObject", JSON.stringify(userSearchObject));
    //call the renderSearchButtons function and create a button for the search
    renderSearchButtons(
      userSearchValue,
      dropDownOption,
      bookCheck,
      movieCheck,
      gameCheck
    );
  }

  //Function that renders the search buttons and close button list under the search bar
  function renderSearchButtons(
    userSearchValue,
    dropDownOption,
    bookCheck,
    movieCheck,
    gameCheck
  ) {
    var userSearch = $("<button>").addClass("userSearchListButton btn");
    var closeButton = $("<button>").addClass("btn-small waves-effect");
    var userSearchList = $("<ul>").addClass("searchList");
    var bookText = "";
    var movieText = "";
    var gameText = "";

    //Below if statements are used to control what is entered in text in the button
    if (bookCheck === true) {
      bookText = "book";
    }
    if (movieCheck === true) {
      movieText = "movie";
    }
    if (gameCheck === true) {
      gameText = "game";
    }

    closeButton.text("X");
    userSearch.text(
      userSearchValue +
        ": " +
        dropDownOption +
        ": " +
        bookText +
        " " +
        movieText +
        " " +
        gameText
    );
    userSearchList.append($("<li>").append(userSearch, closeButton));
    $("#searchDiv").append(userSearchList);
  }
});
