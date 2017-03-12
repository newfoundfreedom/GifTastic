// GLOBAL VARIABLES
let shows = ['Super Friends', 'GI Joe', 'Thundercats','He Man', 'Transformers',
    'Inspector Gadget', 'Bugs Bunny', 'Tom and Jerry', 'DuckTales',
    'The Flintstones', 'She Ra', 'Care Bears', 'Strawberry Shortcake'];    // Initialize array of tv-show names


// DISPLAY GIFS FUNCTION
function displayGifs() {                                                   // Function to display gifs from giphy.com based on user input

    let userSearch = $(this).data('name') + ' cartoon',                    // extract string value from button + word 'cartoon' and assign that to the userSearch variable
        resultqty = 10,                                                    // define the quantity of results desired
        apikey = '&api_key=dc6zaTOxFJmzC';                                 // assign the giphy api key

    let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + userSearch + '&limit=' + resultqty + apikey;  // build the AJAX url string utilizing the userSearch, result quantity, & api keys

    $.ajax({                                                  // AJAX call
        url: queryURL,                                        // AJAX call URL definition
        method: "GET"                                         // AJAX method
    }).done(function (response) {                             // when JSON object response received from giphy.com - do the following:
        $('#gifs-view').empty();                              //   clear the 'gifs-view' div in the DOM
        $.each(response.data, function (index) {              //   for each item in the response object's data child
            let item = response.data[index],                  //     capture item
                still = item.images.fixed_height_still.url,   //     capture the still gif url
                animated = item.images.fixed_height.url,      //     capture the animated gif url
                rating = item.rating;                         //     capture the gif rating

            $('<figure>')                                     //   create a figure element
                .attr('id', 'fig')                            //     assign the id 'fig' to the figure element
                .append('<figcaption>Rated: ' + rating + '</figcaption>')  //     place the gif rating into the figcaption element and add to the figure
                .prependTo('#gifs-view');                     //     add figure to the 'gifs-view' div

            $('<img>')                                        //   create an image element
                .attr('src', still)                           //     initialize the image source with the still gif
                .addClass('gif-img')
                .data("type", {                               //     in the data attribute
                    still: still,                             //       set still gif url to data-type-still
                    anim: animated                            //       set animated gif url to data-type-anim
                })                                            //
                .prependTo('#fig');                           //     add image to precede the figcaption within the figure element
        });

        $('img').on('click', function () {                    //   CLICK EVENT listener:  when a gif image is clicked - do the following:
            let currentImg = $(this).attr('src'),             //      capture the displayed gif url
                stillImg = $(this).data('type').still,        //      capture the url for the still gif (held in data-type-still attribute)
                animImg = $(this).data('type').anim;          //      capture the url for the animated gif (held in the data-typ-anim attribute)

            if (currentImg == stillImg) {                     //   compare current image url to the still image url
                $(this).attr('src', animImg);                 //      if they are the same - set the animated gif url as the displayed image source
            }
            else {                                            //      if the current image url is not equal to the still image url - then it must be the animated url
                $(this).attr('src', stillImg);                //        set they still image url as the displayed image source
            }
        })
    })
}

// RENDER BUTTONS FUNCTION
function renderButtons() {                       // function to display list of shows as buttons
    $('#buttons-view').empty();                  // clear the 'buttons-view' div

    for (let i = 0; i < shows.length; i++) {     // for each show listed listed in the shows array - do the following:
        $("<button>")                            //   create a button element
            .addClass('show')                    //   add 'show' class to the button
            .data('name', shows[i])              //   add show name in the data-name attribute
            .text(shows[i])                      //   display the show name as the button text
            .appendTo('#buttons-view');          //   add button to the 'buttons-view' div
    }
}

// NEW SHOW CLICK EVENT LISTENER
$("#add-show").on("click", function (event) {    // CLICK EVENT listener:  when the 'add-gif' button is clicked - do the following
    event.preventDefault();                      //   stop the default action for the submit button
    let input = $('#show-input');                //   capture the input field and set to 'input' variable
    let newshow = input.val().trim();            //   capture and clean the text entered into input field by user
    shows.push(newshow);                         //   add text captured to the array of shows
    $(input).val('');                            //   reset the input field
    renderButtons();                             //   call the renderButtons function to display shows (included one just added) as buttons
});

// DISPLAY GIFS CLICK EVEN LISTENER
$(document).on("click", ".show", displayGifs);    // Add click listener to all buttons with the 'show' class - which will run the displayGifs function

// PAGE LOAD EVENT
renderButtons();  // initial call to the renderButtons function on page load