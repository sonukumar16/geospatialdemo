'use strict';
    app.controller('searchDoctorCtrl',  function($scope,mainService,$state) {       
        var checkMap = 0 ;
        $scope.master = { location: '' };
        $scope.initFun = () => {           
            checkMap = 0;
            let inputFrom = document.getElementById('area_name');           
           let options = {                
                componentRestrictions: { country: "in" } 
            };
            let autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
            google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
                $scope.place = autocompleteFrom.getPlace();                
                initialize();
            });
        };
        function initialize() {
            if(checkMap==0)
            {                
               let latlng;
                if($scope.place)
                    latlng = new google.maps.LatLng($scope.place.geometry.location.lat(), $scope.place.geometry.location.lng());
                else
                    latlng = new google.maps.LatLng(28.535516, 77.391026); // to show market initial position
                let map = new google.maps.Map(document.getElementById('map'), {
                    center: latlng,
                    zoom: 13
                });
                let marker = new google.maps.Marker({
                    map: map,
                    position: latlng,
                    draggable: false,
                    anchorPoint: new google.maps.Point(0, -29)
                });
                let infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', function() {
                    let iwContent = '<div id="iw_container">' +
                        '<div class="iw_title"><b>Location</b> : Noida</div></div>';
                    infowindow.setContent(iwContent);
                    infowindow.open(map, marker);
                });
            }
            else
            {
                let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 10,
                    center: new google.maps.LatLng(28.644800,  77.216721),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                let infowindow = new google.maps.InfoWindow();

                let marker, i;

                for (i = 0; i < $scope.showLocation.length; i++) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng($scope.showLocation[i].location.coordinates[1], $scope.showLocation[i].location.coordinates[0]),
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            let iwContent = '<div id="iw_container">' +
                                '<div class="iw_title"><b>Doctor</b> : '+$scope.showLocation[i].name+'</div><div class="iw_title"><b>Address</b> : '+
                                    $scope.showLocation[i].address+'</div></div>';
                            infowindow.setContent(iwContent);
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        $scope.fetchDoctors = () =>{
            checkMap = 1;
            let obj = {
                lon_lat : [$scope.place.geometry.location.lng(),$scope.place.geometry.location.lat()]
            };
            mainService.fetchDoctors(obj).then((success)=>{
                if(success.data.response_code==200){
                    
                    $scope.showLocation = success.data.result; 
                    initialize();
                }
                else{
                    alert(success.data.response_message);
                } 
            },(err)=>{
                alert("Something went wrong.");
            })
        }
        $scope.goToDoctor = () => {
            $state.go('add_doctor');
        }

    });