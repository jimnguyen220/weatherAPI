
var cities = [];
var currentDay = moment().format('dddd, MMMM Do YYYY');

function renderButtons() {
    $("#cities-list").empty();

    for (var i=0; i < cities.length; i++) {
        var newButton = $("<button>");
        newButton.addClass('city-button');
        newButton.attr("data-city", cities[i]);
        newButton.text(cities[i]);
        $("#cities-list").append(newButton);
    }
}



function cityWeather() {
    var cityValue = $("#city-search").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?"+"q="+ cityValue +"&cnt=5"+ "&appid=87378d54c0188556c3571925d4983352";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response +" cityWeather function");
    })

  cities.push(cityValue);
  renderButtons();
    $('#current-city-weather').text(cityValue+" on "+ currentDay);
};

function displayWeather(){

    var cityValue = $(this).attr('data-city')
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+ cityValue +"&cnt=5"+"&appid=87378d54c0188556c3571925d4983352";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(queryURL + " displayWeather");
    })
};

$(document).on('click', ".city-button", displayWeather);
$("#search-button").on('click', cityWeather);