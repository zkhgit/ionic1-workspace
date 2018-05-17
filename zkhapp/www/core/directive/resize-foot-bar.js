/*
*resizeFootBar指令
*自动适应textarea输入框的高度，监听taResize事件
*依赖同文件夹下的elastic.js文件
*在头部要引入elastic.js文件即可，里面是monospaced.elastic模块，但不需要在app的angular.module('starter', ['ionic',...])引入;

用法：
<ion-footer-bar keyboardshow  resize-foot-bar class="bar item-input-inset">
  		<span>评论</span>
  		<label class="item-input-wrapper ">
        	<textarea placeholder="说点什么" style="width:100%;background:#eee;resize:none;" rows='2' msd-elastic ng-model="foo"></textarea>
        </label>
        
    	<button class="button button-positive">发送</button>  
  	</ion-footer-bar>

可以参考https://github.com/bingcool/angular-elastic
resize-foot-bar 是定义的指令，rows='2' msd-elastic ng-model="foo"设置
*/
angular.module('app')
    .directive('resizeFootBar', [function(){
        // Runs during compile
        return {
        scope: false,
        restrict: 'A',
        replace: false,
        link: function(scope, element, attrs, controller) {
                //绑定taResize事件
                scope.$on("taResize", function(e,ta) {
                    if (!ta) return;
                    var taHeight = ta[0].offsetHeight;
                    var newFooterHeight = taHeight + 10;
                    newFooterHeight = (newFooterHeight > 44 ) ? newFooterHeight : 44;
    
                    //调整ion-footer-bar高度
                    element[0].style.height = newFooterHeight + 'px';
                
                });
            }
        };
    }]);