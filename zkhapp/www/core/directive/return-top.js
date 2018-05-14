/**
 * 返回顶部
 */
angular.module('app')
    .directive("returnTop",function(){
        return{
            restrict: 'E',
            replace: true,
            template: '<i id="scrollTop" ng-click="scrollTop()" class="icon ion-arrow-up-a blue-tom" style="position: absolute; bottom: 10px;right: 10px;font-size: 30px;"></i>',
            controller: function($scope, $ionicScrollDelegate){
                $scope.scrollTop = function() {
                    $ionicScrollDelegate.scrollTop(true);
                };
            }
        };
    })