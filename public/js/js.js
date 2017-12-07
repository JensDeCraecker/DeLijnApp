function succes(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
    console.log(lat, long);
}



function initMap() {
  var uluru = {lat: 51.230016, lng: 4.416220};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

navigator.geolocation.getCurrentPosition(succes);
