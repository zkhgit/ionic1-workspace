angular.module('app')
    .controller('noticeController', function($scope, noticeService, PAGE){
        // 初始化加载
        noticeService.loading($scope);
        // 下拉刷新
        $scope.doRefresh = function(){
            PAGE.doRefresh($scope);
        };
        // 上拉加载
        $scope.loadMore = function(){
            PAGE.loadMore($scope);
        };
    })
    .service('noticeService', function(PAGE){
        this.loading = function(scope){
            // 获取列表
            PAGE.isRefresh(scope, 'app/cms/list', true, {categoryId: 201});
        };
    })