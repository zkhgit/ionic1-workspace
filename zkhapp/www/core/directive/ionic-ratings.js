/**
*ionicRatings指令
*实现评论、评分的功能
*主要配置：
*$scope.ratingsObject = {
          iconOn: 'ion-ios-star',//活动图标，默认"ion-ios-star"
          iconOff: 'ion-ios-star-outline',//非活动(非选中)图标,默认"ion-ios-star-outline"
          iconOnColor: 'rgb(200, 200, 100)',//活动图标颜色,默认值
          iconOffColor:  'rgb(200, 100, 100)',//非活动图标颜色,默认值
          rating: 2,// 默认显示的打分值
          minRating: 0,//最小显示打分值
          iconSize: '25px',//icon图标大小,默认为"none"
          iconMargin: //图标之间距离,默认"3px"
          readOnly: false, //禁止点击，只能读，默认false
          callback: function(rating) { //点击之后的回调函数
            $scope.ratingsCallback(rating);
          }
        };

  $scope.ratingsCallback = function(rating) {
    console.log('Selected rating is : ', rating);
  };
*用法：
*在html中添加：
*<ionic-ratings ratingsobj='ratingsObject' index='0'></ionic-ratings>
*在一个具体的控制器中，利用上面的$scope.ratingsObject = {
  //自定义配置
}
*
*/
angular.module('app')
    .directive('ionicRatings', [function() {
        return {
        restrict: 'AE',
        replace: true,
        template: '<div class="text-center ionic_ratings">' +
        '<span class="icon {{::iconOff}} ionic_rating_icon_off" ng-style="::iconOffColor" ng-click="ratingsClicked(1)" ng-show="rating < 1"></span>' +
        '<span class="icon {{::iconOn}} ionic_rating_icon_on" ng-style="::iconOnColor" ng-click="ratingsUnClicked(1)" ng-show="rating > 0"></span>' +
        '<span class="icon {{::iconOff}} ionic_rating_icon_off" ng-style="::iconOffColor" ng-click="ratingsClicked(2)" ng-show="rating < 2"></span>' +
        '<span class="icon {{::iconOn}} ionic_rating_icon_on" ng-style="::iconOnColor" ng-click="ratingsUnClicked(2)" ng-show="rating > 1"></span>' +
        '<span class="icon {{::iconOff}} ionic_rating_icon_off" ng-style="::iconOffColor" ng-click="ratingsClicked(3)" ng-show="rating < 3"></span>' +
        '<span class="icon {{::iconOn}} ionic_rating_icon_on" ng-style="::iconOnColor" ng-click="ratingsUnClicked(3)" ng-show="rating > 2"></span>' +
        '<span class="icon {{::iconOff}} ionic_rating_icon_off" ng-style="::iconOffColor" ng-click="ratingsClicked(4)" ng-show="rating < 4"></span>' +
        '<span class="icon {{::iconOn}} ionic_rating_icon_on" ng-style="::iconOnColor" ng-click="ratingsUnClicked(4)" ng-show="rating > 3"></span>' +
        '<span class="icon {{::iconOff}} ionic_rating_icon_off" ng-style="::iconOffColor" ng-click="ratingsClicked(5)" ng-show="rating < 5"></span>' +
        '<span class="icon {{::iconOn}} ionic_rating_icon_on" ng-style="::iconOnColor" ng-click="ratingsUnClicked(5)" ng-show="rating > 4"></span></div>',
        scope: {
            // 绑定ionicRatings指令的属性ratingsobj
            ratingsObj: '=ratingsobj'
        },
        link: function(scope, element, attrs) {

            //初始化默认值
            scope.iconOn = scope.ratingsObj.iconOn || 'ion-ios-star';
            scope.iconOff = scope.ratingsObj.iconOff || 'ion-ios-star-outline';
            scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(200, 200, 100)';
            scope.iconOffColor =  scope.ratingsObj.iconOffColor || 'rgb(200, 100, 100)';
            scope.iconSize = scope.ratingsObj.iconSize || 'none';
            scope.iconMargin = scope.ratingsObj.iconMargin || '3px';
            scope.rating =  scope.ratingsObj.rating || 1;
            scope.minRating = scope.ratingsObj.minRating || 0;
            
            if(!scope.ratingsObj.readOnly) {
            scope.readOnly = false;
            }else {
            scope.readOnly = scope.ratingsObj.readOnly;
            }
            

            //设置活动图标颜色
            scope.iconOnColor = {
            color: scope.iconOnColor,
            fontSize: scope.iconSize,
            marginLeft: scope.iconMargin
            };

            //设置非活动图标颜色
            scope.iconOffColor = {
            color: scope.iconOffColor,
            fontSize: scope.iconSize,
            marginLeft: scope.iconMargin
            };

            //设置显示评论值
            scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

            //设置中间变量保存已设置的值
            scope.prevRating = 0;

            // 禁止点击，只能读
            if(scope.readOnly) {
            var icons = element[0].querySelectorAll('.icon');
            icons.forEach(function(ele) {
                ele.style.pointerEvents = 'none'
            });

            }
            //调用点击函数
            scope.ratingsClicked = function(val) {
            if(scope.minRating !== 0 && val < scope.minRating) {
                scope.rating = scope.minRating;
            }else {
                scope.rating = val;
            }

            scope.prevRating = val;

            scope.ratingsObj.callback(scope.rating);
            };

            //调用取消的点击函数
            scope.ratingsUnClicked = function(val) {
            if(scope.minRating !== 0 && val < scope.minRating) {
                scope.rating = scope.minRating;
            } else {
                scope.rating = val;
            }
            if (scope.prevRating == val) {
                if (scope.minRating !== 0) {
                scope.rating = scope.minRating;
                } else {
                scope.rating = 0;
                }
            }
            scope.prevRating = val;

            scope.ratingsObj.callback(scope.rating);
            };
        }
        }
    }]);