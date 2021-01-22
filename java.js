
var cities = ["Minneapolis", "Seattle"];
var cityValue = $("#city-search").val().trim();

function renderButtons() {
    $("#cities-list").empty();

    for (var i=0; i < cities.length; i++) {
        var newButton = $("<button>");
        newButton.attr("data-city", cities[i]);
        newButton.text(cities[i]);
        $("#cities-list").append(newButton);
    }
}

renderButtons();

function cityWeather() {
    var cityValue = $("#city-search").val().trim();
    var APIKey = "87378d54c0188556c3571925d4983352"
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?"+"q="+ cityValue + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })

  
};


$("#search-button").on('click', cityWeather);