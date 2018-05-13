angular.module('app')
    .controller('science', function($scope, scienceService, PAGE){
        // 初始化加载
        scienceService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            PAGE.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
    })
    .service('scienceService', function(PAGE, ACTION){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, ACTION.public.list, true, {categoryId: 103});
        };
    });