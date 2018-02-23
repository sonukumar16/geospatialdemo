app.controller('addDoctorCtrl', function($scope, mainService, $state) {
    $scope.doctorData = {};
    $scope.initFun = () => {

        let inputFrom = document.getElementById('InputAddress');
        let options = {
            componentRestrictions: {
                country: "in"
            } // only for india.
        };
        let autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
        google.maps.event.addListener(autocompleteFrom, 'place_changed', () => {
            $scope.place = autocompleteFrom.getPlace();

        });
    }

    $scope.addDoctor = () => {
        let obj = {
            address: $scope.place.formatted_address,
            name: $scope.doctorData.name,
            email: $scope.doctorData.email,
            description: $scope.doctorData.description,
            "location": {
                coordinates: [$scope.place.geometry.location.lng(), $scope.place.geometry.location.lat()]
            }
        };
        mainService.add_doctor(obj).then((success) => {
            if (success.data.response_code == 200) {
                $scope.doctorData = {};
                $state.go('search_doctor');
            } else {
                alert(success.data.response_message);
            }
        }, (err) => {
            alert(success.data.response_message);
        });
    };
});