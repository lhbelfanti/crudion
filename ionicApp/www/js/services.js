angular.module('ionicApp.services', [])

    .factory('DataService',function($http, ApiEndpoint) {
      var _dataLoaded = false;
      $http.defaults.useXDomain = true;
      return {
        getMovies: function() {
          if(!_dataLoaded) {
            _dataLoaded = true;
            $http({
              method: "get",
              url: ApiEndpoint.url + '/getMovies.php',
              headers: {
                'Access-Control-Allow-Origin' : '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).
            success(function(data, status, headers, config) {
              console.log("getMovies() success");

              /*
              var _movies = JSON.parse(JSON.stringify(data));
              for(var i = 0; i < _movies.length; i++) {
                console.log("Objeto " + _movies[i].id);
                console.log("title: " + _movies[i].title);
                console.log("description: " + _movies[i].description);
                console.log("image: " + _movies[i].image);
              }
              */
              return JSON.parse(JSON.stringify(data));
            }).
            error(function(data, status, headers, config) {
              console.log("getMovies() fail");
              return data;
            });
          }
        },
        addMovie: function(movie) {
          //ADD MOVIE TO DB
          //movies.push(movie);
        },
        deleteMovie: function(movie) {
          //DELETE MOVIE FROM DB
          /*
          for (var i = 0; i < movies.length; i++) {
            if(movies[i].id == movie.id) {
              movies.splice(i, 1);
              break;
            }e
          }
          */
        },
        modifyMovie: function(movie) {
          //MODIFY MOVIE ON DB
          /*
          for (var i = 0; i < movies.length; i++) {
            if(movies[i].id == movie.id) {
              movies[i] = movie;
            }
          }
          */
        }
      };
    })

    .factory('MoviesService', function(DataService) {
      var _selectedMovieId = 0;
      var _movieToModifyId = {};
      var _movies = [];
      _movies = DataService.getMovies();

      //Functions start
      return {
        // --- Common code ---
        getMovies: function() {
          return _movies;
        },
        // --- HomeController and MovieDescriptionController ---
        setSelectedMovieId: function(movieId) {
          _selectedMovieId = movieId;
        },
        getSelectedMovie: function() {
          for (var i = 0; i < _movies.length; i++) {
            if(_movies[i].id == _selectedMovieId) {
              return _movies[i];
            }
          }
        },
        // --- AddController ---
        addMovie: function(movie) {
          var lastMovieId = _movies[_movies.length-1].id;
          movie.id = lastMovieId + 1;
          _movies.push(movie);
          DataService.addMovie(movie);
        },
        // --- ModifyController and MovieToModifyController ---
        setMovieToModifyId: function(movieId) {
          _movieToModifyId = movieId;
        },
        getMovieToModify: function() {
          for (var i = 0; i < _movies.length; i++) {
            if(_movies[i].id == _movieToModifyId) {
              return _movies[i];
            }
          }
        },
        modifyMovie: function(movie) {
          for (var i = 0; i < _movies.length; i++) {
            if(_movies[i].id == movie.id) {
              _movies[i] = movie;
              DataService.modifyMovie(movie);
              break;
            }
          }
        },
        // --- DeleteController ---
        deleteMovie: function(movie) {
          for (var i = 0; i < _movies.length; i++) {
            if(_movies[i].id == movie.id) {
              _movies.splice(i, 1);
              DataService.deleteMovie(movie);
              break;
            }
          }
        }
      }
      //Functions end

      return service;
    })

    .factory('CameraService', ['$q', function($q) {
        var _pictureSource;
        var _destinationType;
        var q = $q.defer();

        ionic.Platform.ready(function() {
            if (!navigator.camera) {
                return;
            }
            _destinationType = navigator.camera.DestinationType.DATA_URL;
            _pictureSource = navigator.camera.PictureSourceType.PHOTOLIBRARY;
        });

        return {
          selectPicture: function(){
            var options =   {
              quality: 75,
              destinationType: _destinationType,
              sourceType: _pictureSource,
              encodingType: 0,
              allowEdit: false
            };
            
            if (!navigator.camera) {
              return;
            }
        
            navigator.camera.getPicture(function(result) {
              q.resolve(result);
            }, function(err) {
              q.reject(err);
            }, 
            options);

            return q.promise;
          }
        }
    }])

    .directive('ionSearch', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                getData: '&source',
                model: '=?',
                search: '=?filter'
            },
            link: function(scope, element, attrs) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.search = {value: ''};
                if (attrs.class)
                    element.addClass(attrs.class);

                if (attrs.source) {
                    scope.$watch('search.value', function (newValue, oldValue) {
                        if (newValue.length > attrs.minLength) {
                            scope.getData({str: newValue}).then(function (results) {
                                scope.model = results;
                            });
                        } else {
                            scope.model = [];
                        }
                    });
                }

                scope.clearSearch = function() {
                    scope.search.value = '';
                };
            },
            template: '<div class="item-input-wrapper">' +
                        '<i class="icon ion-android-search"></i>' +
                        '<input type="search" reset-field placeholder="{{placeholder}}" ng-model="search.value">' +
                        '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close custom-icon"></i>' +
                      '</div>'
        };
    });