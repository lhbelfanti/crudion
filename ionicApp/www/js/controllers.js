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

    .controller('AddController', function($scope, $state, $ionicPopup, moviesService) {

        $scope.image = document.getElementById('imgPlaceHolder');
        $scope.showForm = true;
        $scope.newMovie = {};
        
        $scope.submit = function() {
            if(!$scope.newMovie.title || !$scope.newMovie.description || /*!$scope.newMovie.image ||*/ !$scope.newMovie) {
                $scope.showAlert();
                return;
            }
            
            moviesService.addMovie($scope.newMovie);
            $scope.showConfirm();
        };

        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Datos faltantes',
                template: 'Falta ingresar datos'
            });
        };

        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Película agregada con éxito',
                template: '¿Desea agregar otra película?',
                cancelText: 'No',
                cancelType: 'button-assertive',
                okText: 'Si',
                okType: 'button-balanced'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $scope.newMovie = {};
                } else {
                    $state.go('menu.home');
                }
                confirmPopup.close();
            });
        };

        //Camera functions
        var pictureSource;
        var destinationType;
        ionic.Platform.ready(function() {
            if (!navigator.camera) {
                return;
            }
            pictureSource = navigator.camera.PictureSourceType.PHOTOLIBRARY;
            destinationType = navigator.camera.DestinationType.FILE_URI;
        });

        $scope.selectPicture = function() {
            var options =   {
                quality: 50,
                destinationType: destinationType,
                sourceType: pictureSource,
                encodingType: 0
            };
            
            if (!navigator.camera) {
                return;
            }
        
            navigator.camera.getPicture(
                function (imageURI) {
                    console.log("got camera success ", imageURI);
                    $scope.image.src = imageURI;
                    $scope.newMovie = imageURI;
                    $scope.$apply();
                },
                function (err) {
                    console.log("got camera error ", err);
                },
                options
            );
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

