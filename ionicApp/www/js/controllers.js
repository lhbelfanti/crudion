angular.module('ionicApp.controllers', [])

    //Controller to handle ionicSlideMenu
    .controller('SideMenuController', function($scope, $ionicSideMenuDelegate) {
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
                    console.log("ERROR CAMARA ", err);
                },
                options
            );
        };
    })

    .controller('ModifyController', function($rootScope, moviesService) {
        $rootScope.movies = moviesService.all();
        $rootScope.selectMovieToModify = function(movie){
            $rootScope.movieToModifyId = movie.id;
        };
    })

    .controller('MovieToModifyController', function($scope, moviesService) {
        $scope.showForm = true;
        $scope.movieToModify = moviesService.get($scope.movieToModifyId);

        $scope.submit = function() {
            if(!$scope.newMovie.title || !$scope.newMovie.description || /*!$scope.newMovie.image ||*/ !$scope.newMovie) {
                $scope.showAlert();
                return;
            }
            
            moviesService.modiftMovie($scope.movieToModify);
            $scope.showConfirm();
        };

        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Datos faltantes',
                template: 'Falta ingresar datos'
            });
        };

        $scope.showConfirm = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Película modificada',
                template: 'La película fue modificada con éxito'
            });
        };
    })

    .controller('DeleteController', function($scope, $ionicPopup, moviesService) {
        $scope.movies = moviesService.all();
        $scope.deleteMovie = function (movie) {
            $scope.showConfirm(movie);
            
        };

        $scope.showConfirm = function(movie) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Borrar película',
                template: '¿Desea borrar la película?',
                cancelText: 'No',
                cancelType: 'button-assertive',
                okText: 'Si',
                okType: 'button-balanced'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    moviesService.deleteMovie(movie);
                } else {

                }
                confirmPopup.close();
            });
        };
    });

