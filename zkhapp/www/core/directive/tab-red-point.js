/**
*tabRedPoint指令
*应用于tabs图标的红点信息提醒
*
需要在css文件中设置
.tabs-red-point {
  position: absolute;
  top: 4%;
  right: calc(50% - 16px);
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background-color: red
}
用法：
（1）在tab的标签中使用
<ion-tab class="tab-red-point-account" title="Chats" icon-off="ion-ios-chatboxes-outline" icon-on="ion-ios-chatboxes" ui-sref="tab.chats" tab-red-point='isShowRedPoint'>
说明：设置class="tab-red-point-account"是一个唯一的类，使用时设置成不同于其他tab的类
tab-red-point='isShowRedPoint'中isShowRedPoint是一个变量（可以自己定义，在控制器中对应赋值即可），由控制器的$scope.isShowRedPoint = true,或者false赋值决定是否显示红点
*/
angular.module('app')
    .directive('tabRedPoint', ['$compile','$timeout',function($compile, $timeout){
        // Runs during compile
        return {
        restrict: 'A', 
        replace: false,
        link: function(scope, element, attrs, controller) {
            var isActive = attrs.tabRedPoint || false;
            var template ="<span ng-class={true:'tabs-red-point',false:''}["+isActive+"]></span>";
            var $class = 'a.'+attrs.class;
            var html = $compile(template)(scope);
            $timeout(function() {
                    //tab标签使用时需要设置css
                    angular.element(document.querySelector($class)).css({
                        "position":'relative',
                    }).append(html);
            
            },100);
                        
            }
        };
    }])
    /**
    *headRedPoint指令
    *在顶部导航栏的按钮图标中使用
    *用法：
    （1）在顶部导航栏按钮图标
    <button class="button button-icon" ng-click="popovershow()" head-red-point='isShowRedPoint' ><i class="icon ion-android-notifications"></i></button>
    说明：tab-red-point='isShowRedPoint'中isShowRedPoint是一个变量(可以自己定义，在控制器中对应赋值即可)，由控制器的$scope.isShowRedPoint = true,或者false赋值决定是否显示红点
    */
    .directive('headRedPoint',['$compile','$timeout',function($compile, $timeout){
        // Runs during compile
        return {
        restrict: 'A', 
        replace: false,
        link: function(scope, element, attrs, controller) {
            var isActive = attrs.headRedPoint || false;
            var template ="<span ng-class={true:'tabs-red-point',false:''}["+isActive+"]></span>";
            var html = $compile(template)(scope);
            
            $timeout(function() {
                var test = angular.element(element).parent().append(html)
            },100)
                        
            }
        };
    }])