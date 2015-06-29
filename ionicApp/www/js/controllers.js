angular.module('ionicApp.controllers', [])

    //Controller to handle ionicSlideMenu
    .controller('SideMenuController', function($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })

    .controller('HomeController', function($scope, MoviesService) {
        $scope.movies = MoviesService.getMovies();
        $scope.selectMovie = function(movie){
            MoviesService.setSelectedMovieId(movie.id);
        };
    })

    .controller('MovieDescriptionController', function($scope, MoviesService) {
        $scope.selectedMovie = MoviesService.getSelectedMovie();
    })

    .controller('AddController', function($scope, $state, $ionicPopup, MoviesService, CameraService) {
        $scope.newMovie = {};
        $scope.image = document.getElementById('imgPlaceHolder');
        
        $scope.submit = function() {
            if(!$scope.newMovie || !$scope.newMovie.title || !$scope.newMovie.description /*|| !$scope.newMovie.image*/) {
                $scope.showAlert();
                return;
            }
            
            MoviesService.addMovie($scope.newMovie);
            //$scope.$apply();
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
                    $scope.clearForm();
                } else {
                    $scope.clearForm();
                    $state.go('menu.home');
                }
                confirmPopup.close();
            });
        };

        $scope.clearForm = function() {
            $scope.newMovie = {};
            $scope.image.src = '/img/ionic.png';
        }

        $scope.selectPicture = function() {
            CameraService.selectPicture().then(function(imageData) {
                console.log(imageData);
                $scope.image.src = 'data:image/jpeg;base64,' + imageData;
                $scope.newMovie.image = 'data:image/jpeg;base64,' + imageData;
                //$scope.$apply();
            }, function(err) {
                console.err(err);
            });
        };
    })

    .controller('ModifyController', function($scope, MoviesService) {
        $scope.movies = MoviesService.getMovies();
        $scope.selectMovieToModify = function(movie){
            MoviesService.setMovieToModifyId(movie.id);
        };
    })

    .controller('MovieToModifyController', function($scope, $ionicPopup, MoviesService, CameraService) {
        $scope.movieToModify = MoviesService.getMovieToModify();

        $scope.submit = function() {
            if(!$scope.movieToModify || !$scope.movieToModify.title || !$scope.movieToModify.description || !$scope.movieToModify.image) {
                $scope.showAlert();
                return;
            }
            
            MoviesService.modifyMovie($scope.movieToModify);
            //$scope.$apply();
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

        $scope.modifyPicture = function() {
            CameraService.selectPicture().then(function(imageData) {
                $scope.movieToModify.image = 'data:image/jpeg;base64,' + imageData;
                //$scope.$apply();
            }, function(err) {
                console.err(err);
            });
        }
    })

    .controller('DeleteController', function($scope, $ionicPopup, MoviesService) {
        $scope.movies = MoviesService.getMovies();

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
                    //$scope.$apply();
                } else {
                    //Do nothing   
                }
                confirmPopup.close();
            });
        };
    });

