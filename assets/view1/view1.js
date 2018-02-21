'use strict';

angular.module('myApp.view1', ['ngRoute'])

    // .config(['$routeProvider', function($routeProvider) {
    //     $routeProvider.when('/view1', {
    //         templateUrl: 'view1/view1.html',
    //         controller: 'View1Ctrl'
    //     });
    // }])

    .controller('View1Ctrl', ['$scope', function($scope) {

        $scope.master = { location: '' };
        $scope.initFun = () => {
            console.log("Function called");
            var inputFrom = document.getElementById('area_name');
            var options = {
                // types: ['(hospitals)'],
                componentRestrictions: { country: "in" }
            };
            var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);


            google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
                $scope.place = autocompleteFrom.getPlace();

                $scope.$apply();
                console.log("Fill add is=>" + JSON.stringify($scope.place));
                initialize();
                //mapShow($scope.place.formatted_address)
                // $scope.myForm.lattitude = place.geometry.location.lat();
                // $scope.myForm.longitude = place.geometry.location.lng();
                // $scope.myForm.address = place.formatted_address;

            });
        }
        //   function mapShow(add) {
        //      console.log("Map show called")
        //   var address = add;
        //     //alert(myService1.add);
        //     var geocoder=new google.maps.Geocoder();
        //     geocoder.geocode({
        //     'address': address
        //     },
        //             function(results,status){
        //            if(status==google.maps.GeocoderStatus.OK)
        //                {
        //                    var Lat=results[0].geometry.location.lat();
        //                    var Lng=results[0].geometry.location.lng();
        //                    var myOptions={
        //                        zoom:11,
        //                        center:new google.maps.LatLng(Lat, Lng),
        //                        title: 'hello'
        //                    };
        //                    console.log("if called")
        //                      var map=new google.maps.Map(document.getElementById('map'),myOptions);
        //                        var marker=new google.maps.Marker({position:myOptions.center});
        //                        marker.setMap(map);

        //                }
        //             else
        //                      {
        //                         alert('something got wrong'+ status);
        //                      }
        //     })
        // };

        function initialize() {
            // console.log("initialize called")
            // var latlng;
            // if($scope.place)
            //     latlng = new google.maps.LatLng($scope.place.geometry.location.lat(), $scope.place.geometry.location.lng());
            // else
            //     latlng = new google.maps.LatLng(28.535516, 77.391026);
            // var map = new google.maps.Map(document.getElementById('map'), {
            //     center: latlng,
            //     zoom: 13
            // });
            // var marker = new google.maps.Marker({
            //     map: map,
            //     position: latlng,
            //     draggable: false,
            //     anchorPoint: new google.maps.Point(0, -29)
            // });
            // var infowindow = new google.maps.InfoWindow();
            // google.maps.event.addListener(marker, 'click', function() {
            //     var iwContent = '<div id="iw_container">' +
            //         '<div class="iw_title"><b>Location</b> : Noida</div></div>';
            //     // including content to the infowindow
            //     infowindow.setContent(iwContent);
            //     // opening the infowindow in the current map and at the current marker location
            //     infowindow.open(map, marker);
            // });
            var locations = [
                ['Bondi Beach', -33.890542, 151.274856, 4],
                ['Coogee Beach', -33.923036, 151.259052, 5],
                ['Cronulla Beach', -34.028249, 151.157507, 3],
                ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
                ['Maroubra Beach', -33.950198, 151.259302, 1]
            ];

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: new google.maps.LatLng(-33.92, 151.25),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        //mapShow('Okhla PH 2 C LAL Chowk Kalkaji, A-16, Okhla Industrial Area, Delhi ');

    }]);