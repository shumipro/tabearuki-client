(function(){
  'use strict';
  var module = angular.module('app', ['onsen', 'ngResource']);

  //-------------------------------------------------------------------------------------------
  // controller

  module.controller('AppController', function($scope, Restaurant) {
      $scope.doSomething = function() {
          setTimeout(function() {
              alert('tapped');
          }, 100);
      };
  });

  module.controller('DetailController', function($scope, Restaurant) {
      $scope.item = Restaurant.getSelectedItem();
  });

  module.controller('MasterController', function($scope, Restaurant) {
      Restaurant.getData().then(function(data){
          $scope.items = data.restaurants;
      });

      $scope.showDetail = function(index) {
          var selectedItem = $scope.items[index];
          Restaurant.setSelectedItem(selectedItem);
          $scope.navi.pushPage('detail.html', {title : selectedItem.title});
      };
  });

  //-------------------------------------------------------------------------------------------
  // api

  module.factory('Restaurant', function($q, $timeout, $resource) {
      var selectedItem = {};
      return {
          getData: function() {
              var deferred = $q.defer();
              $resource("https://tabearuki.herokuapp.com/restaurants.json").get(
                  function(res){
                    deferred.resolve(res);
                  }
              );
              return deferred.promise;
          },
          setSelectedItem: function(arg) {
              selectedItem = arg;
          },
          getSelectedItem: function() {
              return selectedItem;
          }
      };
  });
})();
