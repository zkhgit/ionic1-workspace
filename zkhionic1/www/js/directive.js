
angular.module('directive',[])
    // 正在加载
    .directive("tomHideView",function(){
        return{
            restrict: 'E',
            replace: true,
            template: '<ion-content align="center">'+
            '<div>'+
            '<img src="img/loading.gif">'+
            '</div>'+
            '</ion-content>'
        };
    })
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
            scope: {listNull: '@isFlag'},
            restrict: 'E',
            replace: true,
            // template: '<div class="tom_not_list" ng-style="{\'padding-top\': paddingTop}" ng-if="!listNull">'+
            //                 '<img width="36%" src="img/zwjl.png">'+
            //           '</div>'
            template: '<div id="listNull" class="tom_not_list" ng-class="{\'dis_none\':listNull==\'true\'?true:false}" >'+
                            '<img width="36%" src="img/notnews.png">'+
                            '<div class="text-center">亲，目前还没有任何消息哦</div>'+
                      '</div>',
            controller: function($scope, $rootScope, $document){
                $scope.$watch('listNull',function(newValue){
                    $("#listNull").css('display','none');
                    setTimeout(function() {
                        if($rootScope.httpStop==null && newValue=='false'){
                            $("#listNull").css('display','');
                        }
                    }, 1000);
                }); 
            }
        };
    });
    