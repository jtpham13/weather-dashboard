var apiKey = "99fcae79a660090753275cc4d1ba232c";
var formID = document.querySelector("#form-container");
var currentTemp = document.querySelector("#currentTemp");
var currentWind = document.querySelector("#currentWind");
var currentHumd = document.querySelector("#currentHumd");

formID.addEventListener("submit", (event) => {
  event.preventDefault();
  var searchCity = document.querySelector("#search-bar").value;
  getCurrentWeather(searchCity);
  getWeatherForecast(searchCity);
});

function getCurrentWeather(cityName) {
  let fetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      // var cityNameEl = document.createElement("h3")
      // cityNameEl.textContent = data.name
      // document.querySelector("#cityNameContainer").appendChild(cityNameEl)
      document.querySelector("#cityNameContainer").innerHTML = data.name;
      currentTemp.textContent = data.main.temp + "°F";
      currentWind.textContent = data.wind.speed + " mph";
      currentHumd.textContent = data.main.humidity+ "%" ;
    });
}

function getWeatherForecast(cityName) {
  let fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
  fetch(fetchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var list = data.list;
       console.log(list) 
      $("#forecastData").html("");
      for (var i = 39; i >= 0; i = i - 8) {
        var temp = list[i].main.temp
        var iconId = list[i].weather[0].icon;
        var humidity = list[i].main.humidity;
        var date = new Date(list[i].dt_txt);

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        var formatedDate = `${month + 1}/${day}/${year}`;
        // Creating and storing a div tag
        var col = $("<div>");
        col.addClass("col");
        var mycard = $("<div>");
        mycard.addClass("card");
        col.append(mycard);

        // Creating a paragraph tag with the response item
        var p = $("<p>").text(formatedDate);
        // Creating and storing an image tag

        var iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";

        var weatherImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        weatherImage.attr("src", iconUrl);

        var p1 = $("<p>").text("Temp: " + temp + "°F");
        var p2 = $("<p>").text("Humidity: " + humidity + "%");

        // Appending the paragraph and image tag to mycard
        mycard.append(p);
        mycard.append(weatherImage);
        mycard.append(p1);
        mycard.append(p2);

        // Prependng the col to the HTML page in the "#forecast" div

        $("#forecastData").prepend(col);
      }
    });
}
