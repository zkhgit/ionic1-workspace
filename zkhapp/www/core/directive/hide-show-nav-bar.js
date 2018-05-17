/**
 * 头部的导航条，当向上滑动屏幕时隐藏，向下滑动屏幕时显示
 * 
*hideShowNavBar指令
*可以用于头部的导航条，当向上滑动屏幕时，头部导航条将会隐藏，向下滑动屏幕时，头部导航条将会显示
*用法：
（1）在ion-view中使用，继承原来的父级头部导航条
<ion-view title="User" hide-back-button="false" hide-nav-bar='false' hide-show-nav-bar>
hide-nav-bar这个指令设置值为false,表示不隐藏父级导航条，直接使用。
然后直接写hide-show-nav-bar指令即可。

（2）隐藏父级原来的导航条，重新定义<ion-head-bar>
<ion-view title="User" hide-back-button="false" hide-nav-bar='true' hide-show-nav-bar>
		<ion-header-bar align-title="center" no-tap-scroll='true' class="bar-positive">
		  	<div class="buttons">
		    	<button class="button button-icon icon ion-android-arrow-back"></button>
		    </div>
		  	<h1 class="title">Title</h1>
		  	<div class="buttons">
		    	<button class="button button-icon icon ion-navicon"></button>
		  	</div>
		</ion-header-bar>
	........
*hide-nav-bar='true'设置为true，在<ion-view>下面重新定义<ion-header-bar>标签内容即可
*
*/
angular.module('app')
    .directive('hideShowNavBar', ['$compile','$timeout','$ionicGesture',function($compile, $timeout,$ionicGesture){
    // Runs during compile
    return {
        restrict: 'A', 
        replace: false,
        link: function(scope, element, attrs, controller) {
            // 隐藏原来的导航条，重新定义
            var isHide = attrs.hideNavBar;
            var ionContent = angular.element(angular.element(element).find('ion-content')[0]);
            if(isHide === 'true') {
                var headNavBar = angular.element(angular.element(element).find('ion-header-bar')[0]);
            }else {
                var headNavBar = angular.element(document.querySelectorAll("div.nav-bar-block ion-header-bar"));
                var headItem = angular.element(document.querySelectorAll('ion-header-bar')).find('div');
            }

            var cssUpStyle = {
                '-webkit-transform': "translateY(-100%)",   
                'transform': "translateY(-100%)",
                '-webkit-transition':"500ms all ease",
                'transition':"500ms all ease",
            };

            var cssDownStyle = {
                '-webkit-transform': "translateY(0%)",   
                'transform': "translateY(0%)",
                '-webkit-transition':"500ms all ease",
                'transition':"500ms all ease",
            };

            var css = {
                '-webkit-transform': "",   
                'transform': "",
                '-webkit-transition':"",
                'transition':"",
            };

            $ionicGesture.on('dragup',function(event) {
                if(isHide === 'false') {
                headItem.css(cssUpStyle);
                }
                
                headNavBar.css(cssUpStyle);
                ionContent.css({
                'top':0
                });
            },ionContent);

            $ionicGesture.on('dragdown',function(event) {
                headNavBar.css(cssDownStyle);
                if(isHide === 'false') {
                headItem.css(cssDownStyle);
                }
                ionContent.css({
                'top':'44px'
                });     
            },ionContent);

            scope.$on('$ionicView.beforeLeave', function() {
                headNavBar.css(css);
                if(isHide === 'false') {
                headItem.css(css);
                }
                ionContent.css({
                'top':'44px'
                });
            }); 
                        
        }
    };
    }]);