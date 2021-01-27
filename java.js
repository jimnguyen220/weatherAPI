var cities = [];
var currentDay = moment().format('dddd, MMMM Do YYYY');
$('#current-time').text(currentDay);

function forecastDate(){
    var dayPlusOne = moment().add(1, 'days').format("MM/DD/YY");
    $('#calendar-plus-one').text(dayPlusOne);
    var dayPlusTwo = moment().add(2, 'days').format("MM/DD/YY");
    $('#calendar-plus-two').text(dayPlusTwo);
    var dayPlusThree = moment().add(3, 'days').format("MM/DD/YY");
    $('#calendar-plus-three').text(dayPlusThree);
    var dayPlusFour = moment().add(4, 'days').format("MM/DD/YY");
    $('#calendar-plus-four').text(dayPlusFour);
    var dayPlusFive = moment().add(5, 'days').format("MM/DD/YY");
    $('#calendar-plus-five').text(dayPlusFive);
}



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
  forecastDisplay(cityValue);
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

    forecastDisplay(cityValue);
};

//code here to display forecast 
function forecastDisplay (cityValue) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityValue +"&cnt=6"+"&appid=87378d54c0188556c3571925d4983352";
    
    $('#calendar-plus-one').empty();
    $('#calendar-plus-two').empty();
    $('#calendar-plus-three').empty();
    $('#calendar-plus-four').empty();
    $('#calendar-plus-five').empty();
    
    forecastDate();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var forecastIconOne = response.list[1].weather[0].icon;
        var newImage = $('<img>')
        var iconURL = "https://openweathermap.org/img/wn/" + forecastIconOne + "@2x.png";
        newImage.attr('src', iconURL);
        $('#calendar-plus-one').append(newImage);
        var tempKOne = response.list[1].main.temp;
        var tempFOne = Math.round((tempKOne - 273.15) * 1.80 + 32);
        $('#one-temp').html(tempFOne + "&deg;F")
        var humidityOne = response.list[1].main.humidity + "%"
        $('#one-humidity').text(humidityOne);

        var forecastIconTwo = response.list[2].weather[0].icon;
        var newImage = $('<img>')
        var iconURL = "https://openweathermap.org/img/wn/" + forecastIconTwo + "@2x.png";
        newImage.attr('src', iconURL);
        $('#calendar-plus-two').append(newImage);
        var tempKTwo = response.list[2].main.temp;
        var tempFTwo = Math.round((tempKTwo - 273.15) * 1.80 + 32);
        $('#two-temp').html(tempFTwo + "&deg;F")
        var humidityTwo = response.list[2].main.humidity + "%"
        $('#two-humidity').text(humidityTwo);

        var forecastIconThree = response.list[3].weather[0].icon;
        var newImage = $('<img>')
        var iconURL = "https://openweathermap.org/img/wn/" + forecastIconThree + "@2x.png";
        newImage.attr('src', iconURL);
        $('#calendar-plus-three').append(newImage);
        var tempKThree = response.list[3].main.temp;
        var tempFThree = Math.round((tempKThree - 273.15) * 1.80 + 32);
        $('#three-temp').html(tempFThree + "&deg;F")
        var humidityThree = response.list[3].main.humidity + "%"
        $('#three-humidity').text(humidityThree);

        var forecastIconFour = response.list[4].weather[0].icon;
        var newImage = $('<img>')
        var iconURL = "https://openweathermap.org/img/wn/" + forecastIconFour + "@2x.png";
        newImage.attr('src', iconURL);
        $('#calendar-plus-four').append(newImage);
        var tempKFour = response.list[4].main.temp;
        var tempFFour = Math.round((tempKFour - 273.15) * 1.80 + 32);
        $('#four-temp').html(tempFFour + "&deg;F")
        var humidityFour = response.list[4].main.humidity + "%"
        $('#four-humidity').text(humidityFour);

        var forecastIconFive = response.list[5].weather[0].icon;
        var newImage = $('<img>')
        var iconURL = "https://openweathermap.org/img/wn/" + forecastIconFive + "@2x.png";
        newImage.attr('src', iconURL);
        $('#calendar-plus-five').append(newImage);
        var tempKFive = response.list[5].main.temp;
        var tempFFive = Math.round((tempKFive - 273.15) * 1.80 + 32);
        $('#five-temp').html(tempFFive + "&deg;F")
        var humidityFive = response.list[5].main.humidity + "%"
        $('#five-humidity').text(humidityFive);

    })
};



// everything down here already works
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