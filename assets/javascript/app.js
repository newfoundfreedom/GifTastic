// Initial array of gifs
let gifs = ["Star Wars", "Han Solo", "Chewbacca", "Boba Fett"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    let userSearch = $(this).attr("data-name");
    let queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + userSearch + '&limit=10&api_key=dc6zaTOxFJmzC';

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        $.each(response.data, function (index) {
            let item = response.data[index],
                still = item.images.fixed_height_still.url,
                animated = item.images.fixed_height.url,
                rating = item.rating;

            $('<div>')
                .attr('id', 'gif-card')
                .attr('display', 'inline-block')
                .addClass('left')
                .prependTo('#gifs-view');

            $('<figure>')
                .attr('id', 'fig')
                .append('<figcaption>Rated: ' + rating + '</figcaption>')  // Creates an element to have the rating displayed
                .appendTo('#gif-card');

            $('<img>')
                .attr('src', animated)
                .data("type", {
                    still: still,
                    anim: animated
                })
                .prependTo('#fig');
        });


        $('img').on('click', function(){

            let currentImg = $(this).attr('src'),
                stillImg = $(this).data('type').still,
                animImg = $(this).data('type').anim;

            if (currentImg == stillImg) {
                $(this).attr('src', animImg);
            }

            else {
                $(this).attr('src',stillImg);
            }
        })
    })
};


// Function for displaying gif data
function renderButtons() {

    // Deletes the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of gif to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", gifs[i]);
        // Provided the initial button text
        a.text(gifs[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The gif from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();