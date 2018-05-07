
angular.module('directive',[])
    // 返回顶部
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
    // 数据列表加载动画
    .directive("tomDataListLoading",function(){
        return{
            scope: false,
            restrict: 'E',
            replace: true,
            template: '<div class="tom-data-list-loading" ng-style="{\'padding-top\':paddingTop}">'+
                            '<img class="tom-data-list-infoimg" width="36%" ng-src="{{dataListLoading==\'0\'?\'img/zwjl.png\':\'img/error.png\'}}">'+
                            '<ion-spinner class="tom-data-list-loading-ion" icon="bubbles"></ion-spinner>'+
                      '</div>',
            controller: function($scope){
                // null：加载成功并隐藏加载状态，-1：出错了 ，0：无数据，1：加载中，2：加载成功并隐藏加载状态，否则：展示出错了
                $scope.$watch('dataListLoading',function(newValue){
                    $(".tom-data-list-loading").css('display','');
                    $(".tom-data-list-infoimg").css('display','none');
                    $(".tom-data-list-loading-ion").css('display','none');
                    if(newValue == null || newValue=='undefined' || newValue === 2){
                        $(".tom-data-list-loading").css('display','none');
                    }else if(newValue === -1){
                        $(".tom-data-list-infoimg").css('display','');
                    }else if(newValue === 0){
                        $(".tom-data-list-infoimg").css('display','');
                    }else if(newValue === 1){
                        $(".tom-data-list-loading-ion").css('display','');
                    }else{
                        $(".tom-data-list-infoimg").css('display','');
                    }
                });
            }
        };
    });
    