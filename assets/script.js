//Variable to store the searched city
var city="";
// Variables from html
var searchCity = document.querySelector("#search-city");
var searchButton = document.querySelector("#search-button");
var currentCity = document.querySelector(".location-name");
var currentTemperature = document.querySelector(".currentTemp");
var currentHumidty= document.querySelector(".currentHum");
var currentWSpeed=document.querySelector(".currentWind");
var currentUvindex= document.querySelector(".currentUv");
var sCity=[];
// searches the city to see if it exists in local storage
function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}
//Set up the API key
var APIKey="9a97c948e91ed5f542254f1f3b0f91b6";
// Displays the current weather and future weather after grabbing the city from the search bar.
searchButton.addEventListener("click", function(event){
    event.preventDefault();
    if(searchCity.value.trim()!==""){
        city=searchCity.value.trim();
        currentWeather(city);
    }
});
// Fetching the API data
function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", queryURL);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            // parse the response to display the current weather 
            console.log(response);
            //Data object from server side Api for icon.
            var weathericon= response.weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
            // Date format method
            var date=new Date(response.dt*1000).toLocaleDateString();
            //parse the response for name of city and concan the date and icon.
            currentCity.innerHTML=response.name +"("+date+")" + "<img src="+iconurl+">";
            // parse the response to display the current temperature and convert the temperature to fahrenheit

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            currentTemperature.innerHTML((tempF).toFixed(2)+"&#8457")
