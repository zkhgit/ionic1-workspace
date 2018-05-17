/**
*iconClickRoundRipple指令
*实现在头部导航栏或者底部使用icon图标时点击产生一种圆形的涟漪放大效果
*用法：
*<ion-header-bar align-title="center" no-tap-scroll='true' class="bar-positive">
  <div class="buttons">
    <button class="button button-icon icon ion-navicon" icon-click-round-ripple icon-round-ripple-width="20" icon-round-ripple-color="red"></button>
  </div>
  <h1 class="title">Dashboard</h1>
  <div class="buttons">
     <button class="button button-icon icon ion-android-notifications" head-red-point='true' icon-click-round-ripple></button>
  </div>
</ion-header-bar>
设置的指令有
icon-round-ripple-width="20"  涟漪元素的宽度，默认是20，最大是25  
icon-round-ripple-color="red" 涟漪产生的颜色，默认是saddlebrown（#8B4513）;
*注意：该指令只能用于ion-header-bar的元素指令中的button.不能用于ion-nav-buttons,会产生一些样色问题
例如：
<ion-nav-buttons side="right" >
    <button class="button button-icon icon ion-navicon" icon-click-round-ripple ng-click='add()'></button>
</ion-nav-buttons>
*/
angular.module('app')
    .directive('iconClickRoundRipple',['$ionicGesture','$timeout',function($ionicGesture,$timeout) {
        return {
        scope : false,
        restrict: 'A',
        replace: false,
        link : function(scope, element, attrs, controller) {
            $ionicGesture.on("click", function(e) {
                var iconripple = angular.element(element[0].querySelector("span.button-icon-span-ripple"));
                // 判断是否存在<span class='button-icon-span-ripple'></span>
                if(!angular.isDefined(iconripple) || iconripple.length == 0 ) {
                        iconripple = angular.element("<span class='button-icon-span-ripple'></span>");
                        element.append(iconripple);
                }
                // 移除原有的animate类
                iconripple.removeClass("animate");
                
                if(attrs.iconRoundRippleWidth) {
                    if(parseInt(attrs.iconRoundRippleWidth) > 25) {
                    attrs.iconRoundRippleWidth = 25;
                    }else if(parseInt(attrs.iconRoundRippleWidth) < 20) {
                    attrs.iconRoundRippleWidth = 20;
                    }
                // 先设置width和height，不要混合top和left一起设置
                iconripple.css({
                    width: attrs.iconRoundRippleWidth +'px',
                    height: attrs.iconRoundRippleWidth +'px',
                });
                // 获取中心点位置
                var x = element[0].offsetWidth / 2 - attrs.iconRoundRippleWidth / 2;
                var y = element[0].offsetHeight / 2 - attrs.iconRoundRippleWidth / 2;
                }else {
                // 获取中心点位置
                var x = element[0].offsetWidth / 2 - 10;
                var y = element[0].offsetHeight / 2 - 10;
                }

                if(attrs.iconRoundRippleColor) {
                // 设置颜色
                iconripple.css({
                    background: attrs.iconRoundRippleColor
                });
                }
                
                // 设置相对item的绝对位置
                iconripple.css({
                top : y +'px',
                left : x +'px'
                }).addClass('animate');

                // 500秒后移除该类
                $timeout(function() {
                iconripple.removeClass("animate");
                },500)

            }, element);
        }
        };
    }]);