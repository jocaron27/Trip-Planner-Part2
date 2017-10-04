const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1Ijoiam9jYXJvbjI3IiwiYSI6ImNqOGJyZXhvMzAxNzYzM29rdDNzMnRpdncifQ.0UmnxzKrTCV3S1gcS64V0w";

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

// const marker = buildMarker("activities", [-74.009, 40.705]);
// marker.addTo(map);

//Populating the 'selects'
fetch('/api')
.then(allAttractions => allAttractions.json())
.then(allAttractionsJson => {
  var hotels = (allAttractionsJson.hotels).map(function(obj) {
    return obj.name
  })
  var restaurants = (allAttractionsJson.restaurants).map(function(obj){
    return obj.name
  })
  var activities = (allAttractionsJson.activities).map(function(obj) {
    return obj.name
  })
  hotels.forEach(function(hotelName){
    var option = document.createElement("option");  //create an option node
    var text = document.createTextNode(hotelName);  //creating a text label for the option element
    option.appendChild(text);                       //appending the text label to the option element 
    document.getElementById("hotels-choices").appendChild(option);  //appending the entire option to the "hotel-choices" select element
  })
  restaurants.forEach(function(restaurantsName){
    var option = document.createElement("option");  
    var text = document.createTextNode(restaurantsName);  
    option.appendChild(text);                      
    document.getElementById("restaurants-choices").appendChild(option);
  })
  activities.forEach(function(activitiesName){
    var option = document.createElement("option");  
    var text = document.createTextNode(activitiesName);  
    option.appendChild(text);                      
    document.getElementById("activities-choices").appendChild(option);
  })
  
  //Adding to the itinerary
  const hotelButton = document.getElementById('hotels-add');
  hotelButton.addEventListener('click', function(){
    var select = document.getElementById('hotels-choices');
    var selectedHotel = select.value;
    var itineraryItem = document.createElement("li");
    var text = document.createTextNode(selectedHotel);
    itineraryItem.appendChild(text);
    document.getElementById("hotels-list").appendChild(itineraryItem);
    //above adds item to itenerary, below adds marker
    let coordinates;
    allAttractionsJson.hotels.forEach((obj) => {
        if (obj.name == selectedHotel) {
          coordinates = obj.place.location;
        }
    })
    console.log(coordinates);
    const hotelMarker = buildMarker("hotels", coordinates);
    hotelMarker.addTo(map);
    map.flyTo({center: coordinates});
  });

  const restaurantButton = document.getElementById('restaurants-add');
  restaurantButton.addEventListener('click', function(){
    var select = document.getElementById('restaurants-choices');
    var selectedRestaurant = select.value;
    var itineraryItem = document.createElement("li");
    var text = document.createTextNode(selectedRestaurant);
    itineraryItem.appendChild(text);
    document.getElementById("restaurants-list").appendChild(itineraryItem);
    //above adds item to itenerary, below adds marker
    let coordinates;
    allAttractionsJson.restaurants.forEach((obj) => {
        if (obj.name == selectedRestaurant) {
          coordinates = obj.place.location;
        }
    })
    console.log(coordinates);
    const restaurantMarker = buildMarker("restaurants", coordinates);
    restaurantMarker.addTo(map);
    map.flyTo({center: coordinates});
  });

  const activityButton = document.getElementById('activities-add');
  activityButton.addEventListener('click', function(){
    var select = document.getElementById('activities-choices');
    var selectedActivity = select.value;
    var itineraryItem = document.createElement("li");
    var text = document.createTextNode(selectedActivity);
    itineraryItem.appendChild(text);
    document.getElementById("activities-list").appendChild(itineraryItem);
    //above adds item to itenerary, below adds marker
    let coordinates;
    allAttractionsJson.activities.forEach((obj) => {
        if (obj.name == selectedActivity) {
          coordinates = obj.place.location;
        }
    })
    console.log(coordinates);
    const activityMarker = buildMarker("activities", coordinates);
    activityMarker.addTo(map);
    map.flyTo({center: coordinates});
  });
})
.catch(console.error);