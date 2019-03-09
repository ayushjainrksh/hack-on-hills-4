var map, infoWindow;
var service;
// var setZoom = 4.77;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 23.1339722, lng: 77.7507368},
        zoom: 4.77
    });

    // Geolocation
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        
        // Mark my location
        var locMarker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Im here'
          });
          locMarker.addListener('click', function() {
              infoWindow.setContent(place.name);
              infowindow.open(map, locMarker);
          });
  
        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        // infoWindow.open(map);
        map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    // Marker
    var request = [
        {
        query: 'G.S.S.S., AMROH',
        fields: ['name', 'geometry'],
        },{
        query: 'G.P.S. DARBELI',
        fields: ['name', 'geometry']
        }
    ];



    // var features = [
    //     {
    //       position: new google.maps.LatLng(-33.91721, 151.22630),
    //       type: 'info'
    //     }, {
    //       position: new google.maps.LatLng(-33.91539, 151.22820),
    //       type: 'info'
    //     }


    service = new google.maps.places.PlacesService(map);
    request.forEach(function(requestPlace){
        service.findPlaceFromQuery(requestPlace, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
    
            map.setCenter(results[0].geometry.location);
            }
        });
    });
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}
