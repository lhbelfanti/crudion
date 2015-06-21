angular.module('ionicApp.controllers', [])

    //Controller to handle ionicSlideMenu
    .controller('SideMenuController', function($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })

    .controller('HomeController', function($rootScope, $stateParams, MoviesService) {
        $rootScope.movies = MoviesService.all();
        $rootScope.selectMovie = function(movie){
            $rootScope.selectedMovieId = movie.id;
        };
    })

    .controller('MovieDescriptionController', function($scope, $stateParams, MoviesService) {
        $scope.selectedMovie = MoviesService.get($scope.selectedMovieId);
    })

    .controller('AddController', function($scope, $state, $ionicPopup, MoviesService, CameraService) {

        $scope.image = document.getElementById('imgPlaceHolder');
        $scope.showForm = true;
        $scope.newMovie = {};
        
        $scope.submit = function() {
            if(!$scope.newMovie.title || !$scope.newMovie.description || /*!$scope.newMovie.image ||*/ !$scope.newMovie) {
                $scope.showAlert();
                return;
            }
            
            MoviesService.addMovie($scope.newMovie);
            $scope.$apply();
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
                    $scope.image.src = '/img/ionic.png';
                } else {
                    $state.go('menu.home');
                }
                confirmPopup.close();
            });
        };

        $scope.selectPicture = function() {
            CameraService.selectPicture().then(function(imageData) {
                console.log(imageData);
                $scope.image.src = 'data:image/jpeg;base64,' + imageData;
                $scope.newMovie.image = 'data:image/jpeg;base64,' + imageData;
                $scope.$apply();
            }, function(err) {
                console.err(err);
            });
        };
    })

    .controller('ModifyController', function($rootScope, MoviesService) {
        $rootScope.movies = MoviesService.all();
        $rootScope.selectMovieToModify = function(movie){
            $rootScope.movieToModifyId = movie.id;
        };
    })

    .controller('MovieToModifyController', function($scope, MoviesService) {
        $scope.showForm = true;
        $scope.movieToModify = MoviesService.get($scope.movieToModifyId);

        $scope.submit = function() {
            if(!$scope.newMovie.title || !$scope.newMovie.description || /*!$scope.newMovie.image ||*/ !$scope.newMovie) {
                $scope.showAlert();
                return;
            }
            
            MoviesService.modiftMovie($scope.movieToModify);
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

    .controller('DeleteController', function($scope, $ionicPopup, MoviesService) {
        $scope.movies = MoviesService.all();

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
                    MoviesService.deleteMovie(movie);
                } else {

                }
                confirmPopup.close();
            });
        };
    });

