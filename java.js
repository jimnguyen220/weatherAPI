var cities = [];
var currentDay = moment().format('dddd, MMMM Do YYYY');

$('#current-time').text(currentDay);

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

function checkLocalStorage() {
    var existingCities = JSON.parse(localStorage.getItem('cityStorage'));

    if (!existingCities) {
        return;
    } else {   
        console.log(existingCities); 
        cities = cities.concat(existingCities);
    }
    renderButtons();
};

function cityWeather() {
    var cityValue = $("#city-search").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityValue +"&cnt=5"+ "&appid=87378d54c0188556c3571925d4983352";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $('#current-city-weather').text(cityValue);
        console.log(response);

        var forecast = response.list[0].weather[0].description;
        var forecastIcon = response.list[0].weather[0].icon;
        var newImage = $('<img>')
        var iconURL = "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
        
        $('#current-city-condition').html((forecast).toUpperCase());
        newImage.attr('src', iconURL);
        $('#current-city-condition').prepend(newImage);

        var tempK = response.list[0].main.temp;
        var tempF = Math.round((tempK - 273.15) * 1.80 + 32);
        $('#current-city-temp').html(tempF + "&deg;F")

        var humidity = response.list[0].main.humidity + "%"
        $('#current-city-humitidy').text(humidity);

        var wind = response.list[0].wind.speed + " mph";
        $("#current-city-wind").text(wind);

        var lat = response.city.coord.lat;
        var lon = response.city.coord.lon;

        var newURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=87378d54c0188556c3571925d4983352";
        console.log(newURL);
        $.ajax({
            url: newURL,
            method: "GET"
        }).then(function(data){
            var uvIndex = data.value;
            $('#current-city-uv').text(uvIndex);

            uvIndex = parseInt(uvIndex);
            if (uvIndex <= 2.99) {
                $('#current-city-uv').attr('class', 'favorable');
            } else if (uvIndex >= 3 && uvIndex <= 5.99) {
                $('#current-city-uv').attr('class', 'moderate');
            } else if (uvIndex >=6 && uvIndex <= 7.99) {
                $('#current-city-uv').attr('class', 'high');
            } else if (uvIndex >=8 && uvIndex <= 10.99) {
                $('#current-city-uv').attr('class', 'severe');
            } else {
                $('#current-city-uv').attr('class', 'extreme');
            }
        })

    })

  cities.push(cityValue);
  renderButtons();
};


function displayWeather(){

    var cityValue = $(this).attr('data-city')
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityValue +"&cnt=5"+"&appid=87378d54c0188556c3571925d4983352";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        $('#current-city-weather').text(cityValue);
        $('#current-time').text(currentDay);


        var forecast = response.list[0].weather[0].description;
        var forecastIcon = response.list[0].weather[0].icon;
        var newImage = $('<img>')
        var iconURL = "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
        
        $('#current-city-condition').html((forecast).toUpperCase());
        newImage.attr('src', iconURL);
        $('#current-city-condition').prepend(newImage);

        var tempK = response.list[0].main.temp;
        var tempF = Math.round((tempK - 273.15) * 1.80 + 32);
        $('#current-city-temp').html(tempF + "&deg;F")

        var humidity = response.list[0].main.humidity + "%"
        $('#current-city-humitidy').text(humidity);

        var wind = response.list[0].wind.speed + " mph";
        $("#current-city-wind").text(wind);

        var lat = response.city.coord.lat;
        var lon = response.city.coord.lon;

        var newURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=87378d54c0188556c3571925d4983352";

        $.ajax({
            url: newURL,
            method: "GET"
        }).then(function(data){
            var uvIndex = data.value;
            $('#current-city-uv').text(uvIndex);

            uvIndex = parseInt(uvIndex);
            if (uvIndex <= 2.99) {
                $('#current-city-uv').attr('class', 'favorable');
            } else if (uvIndex >= 3 && uvIndex <= 5.99) {
                $('#current-city-uv').attr('class', 'moderate');
            } else if (uvIndex >=6 && uvIndex <= 7.99) {
                $('#current-city-uv').attr('class', 'high');
            } else if (uvIndex >=8 && uvIndex <= 10.99) {
                $('#current-city-uv').attr('class', 'severe');
            } else {
                $('#current-city-uv').attr('class', 'extreme');
            }
        })

    })
};

checkLocalStorage();
renderButtons();
$(document).on('click', ".city-button", displayWeather);
$("#search-button").on('click', function(){
    var citySearch = $("#city-search").val().trim();
    if (citySearch === ""){
        return
    } else {
    cityWeather();
    localStorage.setItem("cityStorage", JSON.stringify(cities));     
    } 
});