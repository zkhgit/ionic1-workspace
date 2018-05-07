
angular.module('directive',[])
    // 返回顶部
    .directive("tomBackTop",function(){
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
    //当列表中没有数据时展示的内容--暂无数据
    .directive("tomNotList",function(){
        return{
            scope: false,
            restrict: 'E',
            replace: true,
            template: '<div class="tom_not_list" ng-style="{\'padding-top\':myPaddingTop}">'+
                            '<img class="notListImg" width="36%" ng-src="{{isShowNotList==\'0\'?\'img/zwjl.png\':\'img/error.png\'}}">'+
                            '<ion-spinner class="notListLoading" icon="bubbles"></ion-spinner>'+
                      '</div>',
            controller: function($scope){
                // isShowNotList, -2：返回上一级页面时的临时参数，-1：不展示，0：展示没有数据，1：加载中，2：展示出错了，否则：展示出错了
                $scope.$watch('isShowNotList',function(newValue){
                    $(".tom_not_list").css('display','none');
                    $(".notListImg").css('display','none');
                    $(".notListLoading").css('display','none');
                    if(newValue == null || newValue=='undefined' || newValue === -1 || newValue === -2){
                    }else if(newValue === 0){
                        $(".tom_not_list").css('display','');
                        $(".notListImg").css('display','');
                    }else if(newValue === 1){
                        $(".tom_not_list").css('display','');
                        $(".notListLoading").css('display','');
                    }else{
                        $(".tom_not_list").css('display','');
                        $(".notListImg").css('display','');
                    }
                });
            }
        };
    });
    