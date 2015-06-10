angular.module('ionicApp.controllers', [])

    //Controller to handle ionicSlideMenu
    .controller('SideMenuController', function($scope, $ionicSideMenuDelegate) {
        $scope.attendees = [
            {firstname: 'Nicolas', lastname: 'Cage'},
            {firstname: 'Jean-Claude', lastname: 'Van Damme'},
            {firstname: 'Keanu', lastname: 'Reeves'},
            {firstname: 'Steven', lastname: 'Seagal'}
        ];
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })

    .controller('HomeController', function($rootScope, $stateParams, moviesService) {
        $rootScope.movies = moviesService.all();
        $rootScope.selectMovie = function(movie){
            $rootScope.selectedMovieId = movie.id;
        };
    })

    .controller('MovieDescriptionController', function($scope, $stateParams, moviesService) {
        $scope.selectedMovie = moviesService.get($scope.selectedMovieId);
    })

    .controller('AddController', function($scope) {

        $scope.showForm = true;

        $scope.shirtSizes = [
            { text: 'Large', value: 'L' },
            { text: 'Medium', value: 'M' },
            { text: 'Small', value: 'S' }
        ];

        $scope.attendee = {};
        $scope.submit = function() {
            if(!$scope.attendee.firstname) {
                alert('Info required');
                return;
            }
            $scope.showForm = false;
            $scope.attendees.push($scope.attendee);
        };
    })

    .controller('ModifyController', function($scope) {

        $scope.activity = [];
        $scope.arrivedChange = function(attendee) {
            var msg = attendee.firstname + ' ' + attendee.lastname;
            msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
            msg += new Date().getMilliseconds();
            $scope.activity.push(msg);
            if($scope.activity.length > 3) {
                $scope.activity.splice(0, 1);
            }
        };

    })

    .controller('DeleteController', function($scope) {

        $scope.activity = [];
        $scope.arrivedChange = function(attendee) {
            var msg = attendee.firstname + ' ' + attendee.lastname;
            msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
            msg += new Date().getMilliseconds();
            $scope.activity.push(msg);
            if($scope.activity.length > 3) {
                $scope.activity.splice(0, 1);
            }
        };

    });

