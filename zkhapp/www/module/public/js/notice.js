angular.module('app')
    .controller('publicNoticeCtrl', function($scope, publicNoticeService, PAGE){
        // 初始化加载
        publicNoticeService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            PAGE.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
    })
    .service('publicNoticeService', function(PAGE){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, 'app/cms/list', true, {categoryId: 201});
        };
    })