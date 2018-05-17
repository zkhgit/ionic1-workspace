/**
*itemClickRipple指令
*实现列表中的item点击产生波浪涟漪效果
*用法：
<ion-list>
  <ion-item item-click-ripple>
    <img src="../img/mike.png" badge="12">
    <h2>{{item.id}}</h2><p>Nine Inch Nails</p>
    <span class="item-ripple"></span>
  </ion-item>
</ion-list>
*在ion-item中添加item-click-ripple指令，同时设置<span class="item-ripple"></span>
*必要css样式[

    // item点击产生涟漪水波效果的样式
    .item-ripple {
        display: block; 
        position: absolute;
        background: hsla(0, 0%, 65%, 0.66);
        border-radius: 90%;
        transform: scale(0); 
    }
    .item-ripple.animate {
        animation: itemripple 0.50s linear;
    }

    @-webkit-keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(1.5);
        }
    }

    @keyframes itemripple {
        100% {opacity: 0; transform: scale(1.5);}
    }

]
*/
angular.module('app')
    .directive('itemClickRipple',['$ionicGesture','$timeout',function($ionicGesture,$timeout) {
        return {
        scope : false,
        restrict: 'A',
        replace: false,
        link : function(scope, element, attrs, controller) {
            $ionicGesture.on("click", function(e) {
                var itemripple = angular.element(element[0].querySelector("span.item-ripple"));
                // 判断是否存在<span class='item-ripple'></span>
                if(!angular.isDefined(itemripple) || itemripple.length == 0 ) {
                        itemripple = angular.element("<span class='item-ripple'></span>");
                        element.append(itemripple);
                }

                itemripple.removeClass("animate");

                var d = Math.max(element[0].offsetHeight, element[0].offsetWidth);
                // 先设置width和height，不要混合top和left一起设置
                itemripple.css({
                width: d +'px',
                height: d +'px',
                });

                // 获取中心点位置
                var x = e.offsetX - itemripple[0].offsetWidth / 2;
                var y = e.offsetY - itemripple[0].offsetHeight / 2;
                // 设置相对item的绝对位置
                itemripple.css({
                top : y +'px',
                left : x +'px'
                }).addClass('animate');

                // 500秒后移除该类
                $timeout(function() {
                itemripple.removeClass("animate");
                },500)

            }, element);
        }
        };
    }]);