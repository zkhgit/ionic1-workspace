/**
*hideTabs指令
*隐藏底部的tabs标签栏，可以实现屏幕更大
*用法：
首先
<ion-tabs class="tabs-icon-top tabs-color-active-positive" ng-class="{'tabs-item-hide': $root.hideTabs}">
在<ion-tabs>中要设置ng-class="{'tabs-item-hide': $root.hideTabs}"
tabs-item-hide这个类是原本存在ionic.app.css文件中的，现在只是控制让这个类是否有效，$root.hideTabs这个值决定

然后再一个需要隐藏tabs标签的目标视图设置hide-tabs="true"即可，这个值将会通过$rootScope.hideTabs传递给$root.hideTabs这个变量。

<ion-view view-title="slidings" hide-tabs="true" hide-nav-bar='true'>
*/
angular.module('app')
    .directive('hideTabs', ['$rootScope',function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                //在进入目标视图前，获取目标视图的hideTabs的值并赋值给$rootScope.hideTabs
                scope.$on('$ionicView.beforeEnter', function() {
                    var watch = scope.$watch(attributes.hideTabs, function(value){
                            $rootScope.hideTabs = value;
                            watch();
                    });

                });

                //目标视图离开是，$rootScope.hideTabs设置为false
                scope.$on('$ionicView.beforeLeave', function() {
                    $rootScope.hideTabs = false;
                });
            }
        };
    }]);