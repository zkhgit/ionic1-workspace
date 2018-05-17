/**
*tabCenterIcon指令
*实现可以自定义tabs中心tab标签的icon，并且可以设置大小和颜色
*用法：
<ion-tab class="tab-center" tab-center-icon tab-center-icon-on="ion-android-add-circle" tab-center-icon-off="ion-android-cancel" tab-center-icon-size="48" tab-center-icon-color="#f7d15d" ui-sref="tab.chats">
      <!--主页面-->
  <ion-nav-view name="tab-chats"></ion-nav-view>
</ion-tab>
1)首先必须要设置一个类，与其他的tab标签类不能相同。
2）可以自定义设置
tab-center-icon-on: 没选中时默认的icon,默认"ion-android-add-circle"
tab-center-icon-off：选中时的需要关闭的icon，默认"ion-android-cancel" 
tab-center-icon-size：tab图标大小，默认48px
tab-center-icon-color: 图标颜色，默认图标颜色
*
*可以通过on-select来选中标签，具体查看tab文档
*/
angular.module('app')
    .directive('tabCenterIcon',['$compile','$timeout',function($compile,$timeout) {
    return {
        restrict: 'A', 
        replace: false,
        link: function(scope, element, attrs) {
            var $class = 'a.'+attrs.class;
            var iocnfontsize = attrs.tabCenterIconSize || 48;
            var iconfontcolor = attrs.tabCenterIconColor || null;
            var icon_on = attrs.tabCenterIconOn || 'ion-android-add-circle';
            var icon_off = attrs.tabCenterIconOff || 'ion-android-cancel';
            if(iconfontcolor) {
            style = "height:"+iocnfontsize+"px"+";font-size:"+iocnfontsize+"px"+";color:"+iconfontcolor;
            }else {
            style = "height:"+iocnfontsize+"px"+";font-size:"+iocnfontsize+"px";
            }
            var template = '<i class="icon '+icon_on+'" style='+style+'></i>';
            var html = $compile(template)(scope);    
            $timeout(function() {
                //tab标签使用时需要设置css
                angular.element(document.querySelector($class)).append(html);  
            },10);
                    
        }
    };

    }]);