var map, infoWindow;
var service;
var savepos = {};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 23.1339722, lng: 77.7507368},
        zoom: 4.77
    });

    // Geolocation
    var pos = {}
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        
        savepos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        // Mark my location
        console.log(pos);
        var locMarker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Im here'
          });
          locMarker.addListener('click', function() {
              infoWindow.setContent(place.name);
              infowindow.open(map, locMarker);
          });

            var ran = [
            {
                lat: savepos.lat + 0.004, lng: savepos.lng + 0.004
            },
            {
                lat: savepos.lat + 0.009, lng: savepos.lng + 0.004
            },
            {
                lat: savepos.lat + 0.0034, lng: savepos.lng + 0.003
            },
            {
                lat: savepos.lat - 0.0034, lng: savepos.lng + 0.009
            },
            {
                lat: savepos.lat - 0.0034, lng: savepos.lng - 0.009
            },
            {
                lat: savepos.lat - 0.005, lng: savepos.lng - 0.008
            }
        ];
        ran.forEach(function(mark){
            console.log(mark);
            var marker = new google.maps.Marker({
                position: mark,
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('1,Virender Kashyap,385973,52.3%,Bharatiya Janta Party <br>' +
                '2,Mohan Lal Brakta,301786,40.9%,Indian National Congress<br>'+
                '3,Subhash Chander,14233,1.9%,Aam Aadmi Party'+
                '4,Jagat Ram,11434,1.5%,Communist Party Of India (MARXIST)'+
                '5,Virender Kumar Kashyap,6173,0.8%,Independent'+
                '6,Gurnam Singh Koli,5985,0.8%,Bahujan Samaj Party'+
                '7,Shurveer Singh,4385,0.6%,Samajwadi Party');
                infowindow.open(map, this);
            });
  
        })

          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: pos,
            radius: 2000
    
            // radius: Math.sqrt(citymap[city].population) * 100
          });  
        
        //   MyMap.map.setCenter(new google.maps.LatLng( 31.1042384, 77.1655002 ) );
        map.setZoom(14);
        
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
    var data = document.getElementById("data");
    arr = data.innerHTML.split("\n")
    var request = []

    arr.forEach(function(loc){
        request.push({
            query: loc,
            fields: ['name', 'geometry']
        })
    })

    

    
    // var ran = [
    //     {
    //       lat: 31.1013929, lng: 77.1554104
    //     },
    //     {
    //       lat: 31.1101066, lng: 77.1604326
    //     },
    //     {
    //         lat: 31.105235, lng: 77.1705786
    //     },
    //     {
    //         lat: 31.101983, lng: 77.1658365
    //     }
    // ]

    // var ran = [
    //     {
    //         lat: pos.lat + 0.0004, lng: 77.1554104
    //     },
    //     {
    //         lat: 31.1013929, lng: 77.1554104
    //     },
    //     {
    //         lat: 31.1013929, lng: 77.1554104
    //     }
    // ]
    // ran.forEach(function(mark){
    //     console.log(mark);
    //     var marker = new google.maps.Marker({
    //         position: mark,
    //         map: map,
    //         title: 'Hello World!'
    //       });
    // })

    
    // console.log(request)
    // var request = [
    //     {
    //     query: 'G.S.S.S., AMROH',
    //     fields: ['name', 'geometry'],
    //     },{
    //     query: 'G.P.S. DARBELI',
    //     fields: ['name', 'geometry']
    //     }
    // ];

    //     request.forEach(function(re){
    //     console.log(re)
    // })

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
